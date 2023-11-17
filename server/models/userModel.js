const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        contactNumber: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            requried: true,
        },
        accountType: {
            type: String,
            enum: ["Admin", "Patient", "Doctor", "Vendor"],
            required: true
        },
        token: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        image:{
            type: String
        },
        notification: {
            type: Array,
            default: []
        },
        seenotification: {
            type: Array,
            default: []
        }
        // additionalDetails: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Profile"
        // } 
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);