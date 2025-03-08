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
const signupBody = zod.object({
    username: zod.string().nonempty(),
    name: zod.string(),
    roll: zod.string(),
    registeredID: zod.string(),
    department: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
    year: zod.string().nonempty(),
});

exports.checkUsername = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ msg: "Username is required" });
        }
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: "Username already taken" });
        }

        res.status(200).json({ msg: "Username is available" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};


exports.signUser = async (req, res) => {
    try {
        const parsed = signupBody.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input data",
                errors: parsed.error.issues,
            });
        }

        const { username, name, roll, registeredID, email, password, department, year } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User with this email already exists" });
        }
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ msg: "Username already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            name,
            roll,
            registeredID,
            email,
            department,
            year,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.status(201).json({
            msg: "Account created",
            _id: newUser.id,
            username: newUser.username,
            name: newUser.name,
            roll: newUser.roll,
            registeredID: newUser.registeredID,
            department: newUser.department,
            email: newUser.email,
            year: newUser.year,
            token,
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
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
        const users = await User.find(query, 'name roll year usernames ranks username registeredID department');
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
exports.saveUserRank = async (req, res) => {
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
    const { username } = req.params;
    try {
        const user = await User.findOne({
            $or: [
                { "usernames.codechefUser": username },
                { "usernames.codeforcesUser": username },
                { "usernames.leetcodeUser": username }
            ]
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const allUsers = await User.find().select("name ranks usernames department college").exec();

        const usersInDepartment = allUsers.filter(u => u.department === user.department);
        const usersInCollege = allUsers.filter(u => u.college === user.college);

        const calculateRank = (users, key) => {
            const sortedRanks = users
                .map(u => u.ranks[key])
                .filter(rank => rank !== undefined)
                .sort((a, b) => b - a);

            return {
                rank: sortedRanks.indexOf(user.ranks[key]) + 1,
                sortedRanks
            };
        };

        // Overall Rank Calculation
        const overallRanks = {
            codeforces: calculateRank(allUsers, "codeforcesRank"),
            codechef: calculateRank(allUsers, "codechefRank"),
            leetcode: calculateRank(allUsers, "leetcodeRank")
        };

        // Department Rank Calculation
        const departmentRanks = {
            codeforces: calculateRank(usersInDepartment, "codeforcesRank"),
            codechef: calculateRank(usersInDepartment, "codechefRank"),
            leetcode: calculateRank(usersInDepartment, "leetcodeRank")
        };

        // College Rank Calculation
        const collegeRanks = {
            codeforces: calculateRank(usersInCollege, "codeforcesRank"),
            codechef: calculateRank(usersInCollege, "codechefRank"),
            leetcode: calculateRank(usersInCollege, "leetcodeRank")
        };

        // Store calculated ranks
        user.collegeRank = {
            codeforcesRank: collegeRanks.codeforces.rank,
            codechefRank: collegeRanks.codechef.rank,
            leetcodeRank: collegeRanks.leetcode.rank
        };

        user.departmentRank = {
            codeforcesRank: departmentRanks.codeforces.rank,
            codechefRank: departmentRanks.codechef.rank,
            leetcodeRank: departmentRanks.leetcode.rank
        };

        await user.save();

        return res.status(200).json({
            msg: "Rank data fetched and stored successfully",
            userRank: {
                overall: {
                    codeforces: overallRanks.codeforces.rank,
                    codechef: overallRanks.codechef.rank,
                    leetcode: overallRanks.leetcode.rank
                },
                department: {
                    codeforces: departmentRanks.codeforces.rank,
                    codechef: departmentRanks.codechef.rank,
                    leetcode: departmentRanks.leetcode.rank
                },
            },
            totalUsers: {
                overall: allUsers.length,
                departmentUsers: {
                    codeforces: usersInDepartment.filter(u => u.ranks.codeforcesRank !== undefined).length,
                    codechef: usersInDepartment.filter(u => u.ranks.codechefRank !== undefined).length,
                    leetcode: usersInDepartment.filter(u => u.ranks.leetcodeRank !== undefined).length
                },
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};



// save username
exports.insertUsernames = async (req, res) => {
    const { leetcodeUser, codechefUser, codeforcesUser, year, amcatkey } = req.body
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
exports.updateUsernames = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const { leetcodeUser, codechefUser, codeforcesUser, year, roll, amcatkey, department } = req.body;
        const updateFields = {};

        if (leetcodeUser) updateFields["usernames.leetcodeUser"] = leetcodeUser;
        if (codechefUser) updateFields["usernames.codechefUser"] = codechefUser;
        if (codeforcesUser) updateFields["usernames.codeforcesUser"] = codeforcesUser;
        if (year) updateFields["year"] = year;
        if(roll) updateFields["roll"]=roll
        if(department) updateFields["department"]=department
        if (amcatkey) updateFields["amcatkey"] = amcatkey;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updateFields);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
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
                username: user.username,
                name: user.name,
                email: user.email,
                department: user.department,
                usernames: user.usernames,
                year : user.year,
                roll: user.roll,
                registeredID: user.registeredID,
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


// userProfile data show 
exports.userProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password -otp -otpExpiration");

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Fetch Amcat data if amcatKey exists
        let amcatData = null;
        if (user.amcatkey) {
            amcatData = await Amcat.findOne({ amcatID: user.amcatkey });
        }

        const totalUsers = {
            codechef: await User.countDocuments({ "usernames.codechefUser": { $exists: true } }),
            codeforces: await User.countDocuments({ "usernames.codeforcesUser": { $exists: true } }),
            leetcode: await User.countDocuments({ "usernames.leetcodeUser": { $exists: true } }),
        };

        const departmentUsers = {
            codechef: await User.countDocuments({ department: user.department, "usernames.codechefUser": { $exists: true } }),
            codeforces: await User.countDocuments({ department: user.department, "usernames.codeforcesUser": { $exists: true } }),
            leetcode: await User.countDocuments({ department: user.department, "usernames.leetcodeUser": { $exists: true } }),
        };

        return res.status(200).json({
            msg: "User found",
            user: {
                username: user.username,
                name: user.name,
                email: user.email,
                roll: user.roll,
                registeredID: user.registeredID,
                department: user.department,
                year: user.year,

                usernames: {
                    codechef: user.usernames?.codechefUser || "N/A",
                    codeforces: user.usernames?.codeforcesUser || "N/A",
                    leetcode: user.usernames?.leetcodeUser || "N/A",
                    amcatKey: user.amcatkey || "N/A",
                },

                ranks: {
                    codechef: user.ranks?.codechefRank || "N/A",
                    codeforces: user.ranks?.codeforcesRank || "N/A",
                    leetcode: user.ranks?.leetcodeRank || "N/A",
                },

                collegeRank: {
                    codechef: user.collegeRank?.codechefRank || "N/A",
                    codeforces: user.collegeRank?.codeforcesRank || "N/A",
                    leetcode: user.collegeRank?.leetcodeRank || "N/A",
                },

                departmentRank: {
                    codechef: user.departmentRank?.codechefRank || "N/A",
                    codeforces: user.departmentRank?.codeforcesRank || "N/A",
                    leetcode: user.departmentRank?.leetcodeRank || "N/A",
                },
                totalUsers, 
                departmentUsers,

            },
            amcatData: amcatData || "No Amcat data found"
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};


// get user name for platform id

exports.getUserName=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select("usernames");
        if(!user){
            return res.status(404).json({
                msg:"User not found"
            });
        }
        res.json({ 
            username: user.usernames 
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}