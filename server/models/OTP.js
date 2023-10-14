const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            requried: true
        },
        otp: {
            type: Number,
            requried: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 60 * 5 //this will automatically deleted after 5 minutes
        }
    }
)


//function to send email
const sendVerificationEmail = async(email, otp) => {

    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            otpTemplate(otp)
        )
        console.log("Email sent successfully: ", mailResponse);

    }catch(error){
        console.log("Error while sending email: ", error);
        throw error;
    }
}


OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});


module.exports = mongoose.model("OTP", OTPSchema);