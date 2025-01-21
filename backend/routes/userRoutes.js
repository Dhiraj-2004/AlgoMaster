const express=require("express");


const{
    loginUser,
    signUser,
    forgotPassword,
    verifyOTPAndChangePassword,
    resetPassword,
    insertUsernames,
    updateUsernames,
    getCodechefUsername,
    getCodeforcesUsername,
    getLeetcodeUsername,
}=require("../controllers/userController");

const {protect}=require("../middlewares/authMiddleware");
const router=express.Router();

router.post("/login",loginUser);
router.post("/signup",signUser);
router.post("/insertuser",protect,insertUsernames);
router.post("/forgotPass", forgotPassword);
router.post("/changePassword", verifyOTPAndChangePassword);

router.put("/resetPass",resetPassword);
router.put('/updateUser', protect, updateUsernames);

router.get('/chefuser', protect, getCodechefUsername);
router.get('/forcesuser', protect, getCodeforcesUsername);
router.get('/leetuser', protect, getLeetcodeUsername);

module.exports=router;
