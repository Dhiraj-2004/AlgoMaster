const express = require("express");


const {
    loginUser,
    signUser,
    forgotPassword,
    userRank,
    verifyOTPAndChangePassword,
    resetPassword,
    insertUsernames,
    updateUsernames,
    getAllUsers,
    getUserRank,
    getUserData,
    getCodechefUsername,
    getCodeforcesUsername,
    getLeetcodeUsername,
} = require("../controllers/userController");

const{leetCode}=require("../controllers/leetCodeQraphQl");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signUser);
router.post("/insertuser", protect, insertUsernames);
router.post("/forgotPass", forgotPassword);
router.post("/changePassword", verifyOTPAndChangePassword);

router.put("/resetPass", resetPassword);
router.put("/rank",protect,userRank);
router.put('/updateUser', protect, updateUsernames);

router.get('/',getAllUsers);
router.get('/leetcode/:username',leetCode);
router.get('/userdata',protect,getUserData);
router.get('/chefuser', protect, getCodechefUsername);
router.get('/forcesuser', protect, getCodeforcesUsername);
router.get('/leetuser', protect, getLeetcodeUsername);
router.get("/college-rank/:username/:college",protect,getUserRank);

module.exports = router;
