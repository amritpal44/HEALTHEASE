const express = require("express");
const { login, signup, sendotp, changePassword } = require("../controllers/authControllers");
const { auth, isPatient, isDoctor, isAdmin, isVendor } = require("../middleware/auth");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");
const router = express.Router();



router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
//router.post("/changepassword", changePassword);



// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);


module.exports = router;