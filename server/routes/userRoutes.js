const express = require("express");
const { login, signup, sendotp, changePassword } = require("../controllers/authControllers");
const { auth, isPatient, isDoctor, isAdmin, isVendor } = require("../middleware/auth");
const router = express.Router();



router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp",auth, sendotp);
//router.post("/changepassword", changePassword);


module.exports = router;