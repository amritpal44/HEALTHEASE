const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const appointmentBookingTemplate = require("../templates/appointmentRequestTempelate");
const mailSender = require("../utils/mailSender");

//by patient
exports.bookAppointmentRequest = async(req, res) => {
    try {
        
        const userId = req.user.id;

        const { doctorUserId, date, time } = req.body;

        const userDetails = await userModel.findById(userId);
        const doctorDetails = await userModel.findById( {_id: doctorUserId }) ;

        const url = `http://localhost:3000/booking-notification`;

        await mailSender(
            doctorDetails.email,
            "New Appointment Request",
            appointmentBookingTemplate(userDetails, date, time, url)
        )

        await appointmentModel.create({
            userId: userId,
            doctorUserId: doctorUserId,
            date: date,
            time: time,
        })

        return res.status(200).json({
            success: true,
            message: "New appointment request has been made."
        })

    } catch (error) {
        console.log("Error while creating appointment request: ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}