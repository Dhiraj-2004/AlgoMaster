const Amcat = require('../models/amcatModel');

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
