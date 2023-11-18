const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const appointmentAcceptedTemplate = require("../templates/appointmentAcceptedTempelate");
const appointmentRejectedTemplate = require("../templates/appointmentRejectedTempelate");
const appointmentBookingTemplate = require("../templates/appointmentRequestTempelate");
const mailSender = require("../utils/mailSender");

//by patient
exports.bookAppointmentRequest = async(req, res) => {
    try {
        
        const userId = req.user.id;

        const { doctorUserId, date, time } = req.body;

        const userDetails = await userModel.findById(userId);
        const doctorDetails = await userModel.findById( {_id: doctorUserId }) ;

        const url = `http://localhost:3000/`;

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


//for doctor
exports.getAllAppointmentRequest = async(req, res) => {
    try {
        const userId = req.user.id;

        const response = await appointmentModel.find({doctorUserId: userId})

        return res.status(200).json({
            success: true,
            message: "All appointment request found",
            data: response
        })
    } catch (error) {
        console.log("Error while fetching appointments: ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.updateAppointmentStatus = async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { status } = req.body;
  
      // Validate if status is either 'accepted' or 'rejected'
      if (!['accepted', 'pending'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be 'accepted' or 'rejected'.",
        });
      }
  
      const response = await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }
      );
  
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      const userDetail =await userModel.findById(response.userId);
      const doctorDetail =await userModel.findById(response.doctorUserId);

        try{
            const mailResponse = await mailSender(
                userDetail.email,
                "Appointment Request Accepted",
                appointmentAcceptedTemplate(doctorDetail, response.date, response.time)
            )
            console.log("Email sent successfully: ", mailResponse);

        }catch(error){
            console.log("Error while sending email: ", error);
        }
  
      return res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        data: response,
      });
    } catch (error) {
      console.log("Error while updating appointment status: ", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};
exports.deleteAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.params;
  
      const response = await appointmentModel.findByIdAndDelete(appointmentId);
  
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      const userDetail =await userModel.findById(response.userId);
      const doctorDetail =await userModel.findById(response.doctorUserId);

        try{
            const mailResponse = await mailSender(
                userDetail.email,
                "Appointment Request Accepted",
                appointmentRejectedTemplate(doctorDetail)
            )
            console.log("Email sent successfully: ", mailResponse);

        }catch(error){
            console.log("Error while sending email: ", error);
        }
      
  
      return res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      console.log("Error while deleting appointment: ", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};