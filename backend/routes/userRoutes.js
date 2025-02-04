const express = require("express");

const {
    loginUser,
    signUser,
    userRank,
    insertUsernames,
    updateUsernames,
    getAllUsers,
    getUserRank,
    getUserData,
} = require("../controllers/userController");

const {
    verifyOTPAndChangePassword,
    resetPassword,
    forgotPassword,
}=require("../controllers/userPassword");

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
router.get("/college-rank/:username/:college",protect,getUserRank);

module.exports = router;
