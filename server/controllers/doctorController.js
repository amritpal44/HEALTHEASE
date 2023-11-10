const doctorModel = require("../models/doctorModel")
const userModel = require("../models/userModel")

//update profile
exports.updateDoctorFile = async(req, res) => {
    const {specialization, fee, age, image} = req.body;

    const userId = req.user.id;

    
}

//all doctor detail
exports.getAllDoctorDetail = async (req, res) => {

    try {  
        const doctorDetail = await doctorModel.find({})
        .populate({
            path: "user",
            select: "-password"
        })
        .exec()

        //doctorDetail.user.password = undefined;
    
        return res.status(200).json({
            success: true,
            message: "Doctors found",
            data: doctorDetail
        })
        
    } catch (error) {
        console.log("Error in get doctor detail:", error);
        return res.status(500).json({
            success: false,
            error: error,
            message: "Error in get doctor detail"
        })
    }   
}



//single doctor detail
exports.getDoctorDetail = async (req, res) => {

    try {
      const {doctorId} = req.body;
  
      console.log("req body:", doctorId);
     
      const doctorDetail = await doctorModel.findById(doctorId)
      .populate({
        path: "user",
        select: "-password"
      })
      .exec()
  
      if(!doctorDetail){
        return res.status(404).json({
          success: false,
          message: "Doctor not found"
        })
      }  
     
      return res.status(200).json({
        success: true,
        message: "Doctor found",
        data: doctorDetail
      })
       
    } catch (error) {
      console.log("Error in get doctor detail:", error);
      return res.status(500).json({
        success: false,
        error: error,
        message: "Error in get doctor detail"
      })
    }  
  }