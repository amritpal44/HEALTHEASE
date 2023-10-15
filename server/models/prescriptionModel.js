const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        medicines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Medicine",
            }
        ],
        dosage: [
            {
                type: String,
                required: true
            }
        ],
        issueDate: {
            type: Date,
            required: true
        },
        notes: {
            type: String
        }
    }
)

module.exports = mongoose.model("Prescription", prescriptionSchema);