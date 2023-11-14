const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        about: {
            type: String
        },
        gender: {
            type: String,
        },
        dateOfBirth: {
            type: String,
        },
        fee:{
            type: Number
        },
        patient: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        specialization: {
            type: String,
            //required: true
        },
        appointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Appointment"
            }
        ],
        ratingAndReview: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReview",
            }
        ]        
    }
)

module.exports = mongoose.model("Doctor", doctorSchema);