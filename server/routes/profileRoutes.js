const express = require("express");
const { auth } = require("../middleware/auth");
const { updateDisplayPicture, updateProfile } = require("../controllers/profile");
const router = express.Router();


router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.put("/updateProfile", auth, updateProfile);


module.exports = router;