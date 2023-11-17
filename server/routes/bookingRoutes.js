const express = require("express");
const { bookAppointmentRequest } = require("../controllers/bookingControllers");
const { auth, isPatient } = require("../middleware/auth");
const router = express.Router();


router.post("/bookAppointmentRequest", auth, isPatient, bookAppointmentRequest);


module.exports = router;