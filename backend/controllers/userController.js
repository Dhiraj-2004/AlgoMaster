const User = require("../models/userModel");
const Amcat=require("../models/amcatModel")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const zod = require("zod");

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

// save user rank update
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


// get college rank
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



exports.updateUsernames = async (req, res) => {
    const { leetcodeUser, codechefUser, codeforcesUser, year, amcatkey } = req.body;
    console.log(amcatkey);
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    'usernames.leetcodeUser': leetcodeUser,
                    'usernames.codechefUser': codechefUser,
                    'usernames.codeforcesUser': codeforcesUser,
                    'year': year,
                    'amcatkey': amcatkey,
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

// profiles
exports.insertUsernames = async (req, res) => {
    const { leetcodeUser, codechefUser, codeforcesUser,amcatkey } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    'usernames.leetcodeUser': leetcodeUser,
                    'usernames.codechefUser': codechefUser,
                    'usernames.codeforcesUser': codeforcesUser,
                    'amcatkey': amcatkey,
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

// get all user data
exports.getUserData = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const user = await User.findById(req.user.id);
        if(!user) return res.status(400).json({msg:"User not found"});
        
        const amcatData=await Amcat.findOne({amcatID:user.amcatkey});

        if (user) {
            res.json({
                name: user.name,
                email: user.email,
                college: user.college,
                usernames: user.usernames,
                year : user.year,
                roll: user.roll,
                amcat: amcatData || "No Amcat data found",
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

