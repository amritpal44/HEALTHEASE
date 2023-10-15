const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        age: {
            type: Number,
            //required: true
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