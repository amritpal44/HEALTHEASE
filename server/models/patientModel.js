const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
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
        appointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Appointment"
            }
        ],
        prescriptions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Prescription"
            }
        ],
        medicalHistory: 
        {
            type: String,
            //required: true
        }
    }
)

module.exports = mongoose.model("Patient", patientSchema);