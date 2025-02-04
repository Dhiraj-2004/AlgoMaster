const Amcat = require('../models/amcatModel');

// Getting user data...
exports.getUserByAmcatID = async (req, res) => {
    try {
        const amcatID = req.query.amcatID;
        const user = await Amcat.findOne({ amcatID }, 'Name rollNo amcatID cppScore automata quant english logical elqScore');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            msg: "User data retrieved successfully",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }

};

//Getting user rank...

exports.getUserRankByScores = async (req, res) => {
    const { amcatID } = req.params;

    try {
        // Find the user by amcatID
        const user = await Amcat.findOne({ amcatID });

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        const allUsers = await Amcat.find().select("name rollNo amcatID elqScore automata");

        const sortedByElqScore = allUsers.sort((a, b) => b.elqScore - a.elqScore);
        const sortedByAutomataScore = allUsers.sort((a, b) => b.automata - a.automata);

        const elqRank = sortedByElqScore.findIndex(u => u.amcatID === user.amcatID) + 1;
        const automataRank = sortedByAutomataScore.findIndex(u => u.amcatID === user.amcatID) + 1;

        return res.status(200).json({
            msg: "Rank data fetched successfully",
            userInfo: {
                name: user.name,
                rollNo: user.rollNo,
                amcatID: user.amcatID,
                elqScore: user.elqScore,
                automata: user.automata
            },
            ranks: {
                elqRank,
                automataRank
            },
            totalUsers: allUsers.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error",
            error,
        });
    }
};

