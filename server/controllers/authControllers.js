const OTP = require("../models/OTP");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const vendorModel = require("../models/vendorModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const patientModel = require("../models/patientModel");

exports.signup = async (req, res) => {


    try {
        const{firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;

        //checking all fields entered or not
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp){
            return res.status(403).json({
                success: false,
                message: "All Fields not entered."
            })
        }

        //matching pass and confirm pass
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassord donot match."
            })
        }

        //check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            })
        }

        //validating most recent otp
        const dbOTP = await OTP.find({email}).sort({ createdAt: -1}).limit(1);

        console.log("dbotp: ", dbOTP[0].otp);
        console.log("otp: ", otp);

        if(dbOTP.length === 0){
            return res.status(400).json({
                success: false,
                message: "OTP is not generated for this email."
            })
        }
        else if(otp !== dbOTP[0].otp){
            return res.status(400).json({
                success: false,
                message: "OTP entered is not correct"
            })
        }


        //if otp valid then hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            image: ""
        });
        if(accountType === "Patient"){
            await patientModel.create({
                user: user._id
            })
        }
        else if(accountType === "Doctor"){
            await doctorModel.create({
                user: user._id
            })
        }
        else if(accountType === "Vendor"){
            await vendorModel.create({
                user: user._id
            })
        }


        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })

    } catch (error) {
        console.log("Error in signup controller: ", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        })
    }
}


exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields in login`,
            })
        }

        //find user
        const user = await userModel.findOne({email});
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
              success: false,
              message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }

        if(await bcrypt.compare(password, user.password)){
            //creating token
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    role: user.accountType
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "72h"
                }
            )

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User login success",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            })
        }

    } catch (error) {
        console.log("error in login controller: ", error);
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }
}



exports.sendotp = async (req, res) => {
    try {
        
        const{email} = req.body;

        const user = await userModel.findOne({email});

        //if user already present no need to send otp
        if(user){
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            })
        }

        var otp = await otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        const otpBody = await OTP.create({
            email,
            otp
        });

        console.log("otp body: ", otpBody);
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        })

    } catch (error) {
        console.log("Error in otp controller: ", error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}



exports.changePassword = async(req, res) => {

}