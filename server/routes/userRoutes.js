const express = require("express");
const { login, signup, sendotp, changePassword } = require("../controllers/authControllers");
const router = express.Router();



router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
//router.post("/changepassword", changePassword);


module.exports = router;