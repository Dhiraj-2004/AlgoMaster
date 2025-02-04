const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const zod = require("zod");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { AsyncLocalStorage } = require("async_hooks");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// login
const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
});


exports.loginUser = async (req, res) => {
    try {
        const { success } = loginBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                msg: "Invalid input data",
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "User not Exist",
                email: email
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                msg: "Invalid Password"
            });
        }
        const token = generateToken(user.id);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "server error",
            error: error.message
        });
    }
};


// signup

const singupBody = zod.object({
    name: zod.string(),
    roll: zod.string(),
    college: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
    year: zod.string().nonempty(),
});

exports.signUser = async (req, res) => {
    try {
        const parsed = singupBody.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input data",
                errors: parsed.error.issues,
            });
        }

        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            return res.status(400).json({
                msg: "User already exists",
            });
        }

        const { name, roll, email, password, college, year } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            roll,
            email,
            college,
            year,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.status(200).json({
            msg: "Account created",
            _id: newUser.id,
            name: newUser.name,
            roll: newUser.roll,
            email: newUser.email,
            year: newUser.year,
            token,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message,
        });
    }
};
const syncIndexes = async () => {
    try {
        await User.syncIndexes();
    } catch (error) {
        console.error("Error synchronizing indexes:", error);
    }
};
syncIndexes();

// all Users

exports.getAllUsers = async (req, res) => {
    try {
        const platform = req.query.platform;
        const query = { [`usernames.${platform}`]: { $exists: true, $ne: null } };
        const users = await User.find(query, 'name roll year usernames ranks');
        res.status(200).json({
            msg: "Data retrieved successfully",
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
};

// getRank

exports.userRank = async (req, res) => {
    const { rank, platformUser, username } = req.body;

    const rankFieldMap = {
        leetcodeUser: "ranks.leetcodeRank",
        codechefUser: "ranks.codechefRank",
        codeforcesUser: "ranks.codeforcesRank",
    };

    const rankField = rankFieldMap[platformUser];

    try {
        const user = await User.findOne({
            [`usernames.${platformUser}`]: username,
        });

        if (!user) {
            return res.status(404).json({
                msg: "User or platform username not found",
            });
        }
        const updatedUser = await User.findOneAndUpdate(
            { [`usernames.${platformUser}`]: username },
            { [rankField]: rank },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).json({
                msg: "Failed to update rank",
            });
        }

        res.status(200).json({
            msg: "Rank updated successfully",
            updatedUser,
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            msg: "Server error",
            error: error.message,
        });
    }
};





exports.getUserRank = async (req, res) => {
    const { username, college } = req.params;
    try {
        const user = await User.findOne({
            $or: [
                { "usernames.codechefUser": username },
                { "usernames.codeforcesUser": username },
                { "usernames.leetcodeUser": username }
            ],
            college: college
        });

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }
        const userInCollege = await User.find({ college: user.college }).select(
            "name ranks usernames"
        ).exec();

        const sortedCodeforcesRanks = userInCollege
            .map((u) => u.ranks.codeforcesRank)
            .sort((a, b) => b - a);
        const sortedCodechefRanks = userInCollege
            .map((u) => u.ranks.codechefRank)
            .sort((a, b) => b - a);
        const sortedleetcodeRanks = userInCollege
            .map((u) => u.ranks.leetcodeRank)
            .sort((a, b) => b - a);

        const platformRank = {
            codeforcesRank: sortedCodeforcesRanks.indexOf(user.ranks.codeforcesRank) + 1,
            codechefRank: sortedCodechefRanks.indexOf(user.ranks.codechefRank) + 1,
            leetcodeRank: sortedleetcodeRanks.indexOf(user.ranks.leetcodeRank) + 1,
        };
        const sortedData = {
            codeforces: sortedCodeforcesRanks,
            codechef: sortedCodechefRanks,
            leetcode: sortedleetcodeRanks
        };

        return res.status(200).json({
            msg: "Rank data fetched successfully",
            userInfo: {
                name: user.name,
                roll: user.roll,
                year: user.year,
                usernames: user.usernames
            },
            userRank: platformRank,
            totalUsers: userInCollege.length,
            sortedData: sortedData
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error,
        });
    }
};




// forgot pass

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        user.otp = otp;
        user.otpExpiration = Date.now() + 10 * 60 * 1000;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            to: user.email,
            subject: "Password Reset OPT",
            text: `Your OTP to reset your password is: ${otp}. It is valid for 10 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    msg: "Error sending otp mail",
                    error
                });
            }
            res.status(200).json({
                msg: "otp send to your mail"
            });
        })
    }
    catch (error) {
        res.status(500).json({
            msg: "server error",
            error: error.message
        });
    }
}

exports.verifyOTPAndChangePassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                msg: "user not found"
            });
        }
        if (Date.now() > user.otpExpiration) {
            return res.status(400).json({
                msg: "otp has expired"
            });
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                msg: "Invalid otp"
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiration = undefined;
        const newUser = await user.save();
        res.status(200).json({
            msg: "password changed successfully",
            newUser
        });

    }
    catch (error) {
        res.status(500).json({
            msg: 'Error resetting password',
            error: error.message
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.resetToken !== resetToken) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.resetToken = null;
        await user.save();
        res.status(200).json({
            msg: "Password updated successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "server error",
            error: error.message
        });
    }
}


// profiles

exports.insertUsernames = async (req, res) => {
    const { leetcodeUser, codechefUser, codeforcesUser } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    'usernames.leetcodeUser': leetcodeUser,
                    'usernames.codechefUser': codechefUser,
                    'usernames.codeforcesUser': codeforcesUser,
                },
            },
            { new: true }
        );
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateUsernames = async (req, res) => {
    const { leetcodeUser, codechefUser, codeforcesUser, roll } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    'usernames.leetcodeUser': leetcodeUser,
                    'usernames.codechefUser': codechefUser,
                    'usernames.codeforcesUser': codeforcesUser,
                    'roll': roll
                },
            },
            { new: true }
        );
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.getUserData = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const user = await User.findById(req.user.id);
        if (user) {
            res.json({
                name: user.name,
                email: user.email,
                college: user.college,
                usernames: user.usernames,
            });
        } else {
            res.status(404).json({
                msg: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error,
        });
    }
};

exports.getCodechefUsername = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.json({
            codechefUser: user.usernames.codechefUser
        });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}

exports.getCodeforcesUsername = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.json({
            codeforcesUser: user.usernames.codeforcesUser
        });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.getLeetcodeUsername = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.json({ leetcodeUser: user.usernames.leetcodeUser });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
