const express = require("express");
const { bookAppointmentRequest, getAllAppointmentRequest, updateAppointmentStatus, deleteAppointment } = require("../controllers/bookingControllers");
const { auth, isPatient, isDoctor } = require("../middleware/auth");
const router = express.Router();


router.post("/bookAppointmentRequest", auth, isPatient, bookAppointmentRequest);
router.get("/getAllAppointmentRequest", auth, isDoctor, getAllAppointmentRequest);
router.put("/updateAppointmentStatus/:appointmentId", auth, isDoctor, updateAppointmentStatus);
router.delete("/deleteAppointment/:appointmentId", auth, isDoctor, deleteAppointment);


module.exports = router;