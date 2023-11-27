const doctorModel = require("../models/doctorModel")
const patientModel = require("../models/patientModel")
const userModel = require("../models/userModel")
const { uploadImageToCloudinary } = require("../utils/uploadImageToCloudinary")


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await userModel.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
} 



exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      gender = "",
      fee = 0,
      specialization = "",
      about = "",
      address = "",
      pincode = 0
    } = req.body
    const id = req.user.id

    // Find the profile by id
    var userDetails = await userModel.findById(id);

    var profile;
    var updatedProfileDetails;

    if(userDetails.accountType === "Patient" || userDetails.accountType === "Admin"){
      profile = await patientModel.findOne({user: id});
      // Update the profile fields for PATIENT
      profile.dateOfBirth = dateOfBirth;
      profile.gender = gender;
      profile.about = about;
      // userDetails.address = address;
      // userDetails.pincode = pincode;

      // Save the updated profile
      await profile.save()
      // await userDetails.save()

      updatedProfileDetails = await patientModel.findOne({user: id});

    }
    else if(userDetails.accountType === "Doctor"){
      profile = await doctorModel.findOne({user: id});
      profile.fee = fee;
      profile.specialization = specialization;
      profile.dateOfBirth = dateOfBirth;
      profile.about = about;
      profile.gender = gender;
      // userDetails.address = address;
      // userDetails.pincode = pincode;

      // Save the updated profile
      await profile.save()
      // await userDetails.save()

      updatedProfileDetails = await doctorModel.findOne({user: id});
    }


    const user = await userModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
      address,
      pincode
    })
    await user.save()


    // Find the updated user details
    const updatedUserDetails = await userModel.findById(id)

    const combinedDetails = {
      ...updatedUserDetails.toObject(),
      ...updatedProfileDetails.toObject()
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails: combinedDetails,
    })
  } catch (error) {
    console.log("donnot able to update profile detail: ", error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}