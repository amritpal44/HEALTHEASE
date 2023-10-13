const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        medicine: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Medicine"
            }
        ]
    }
)

module.exports = mongoose.model("Vendor", vendorSchema);