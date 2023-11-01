import React, { useState } from 'react'
import logo from "../assests/logo/healthease.png"
import Tab from '../components/Common/Tab'
import { ACCOUNT_TYPE } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from "../slices/authSlice"
import { sendOtp } from '../services/operations/authAPI'

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: ""
    })

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PATIENT);
    // console.log(accountType);

    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {firstName, lastName, email, contactNumber, password, confirmPassword} = formData;


    const handleOnChange = (event) => {
        setFormData( (prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        // console.log("formData: ", formData);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            toast.error("Password donot match");
            console.log("password donot match");
            return
        }

        const signupData = {
            ...formData,
            accountType
        }
        
        //setting signupdata to state, will use it after otp validation
        dispatch(setSignupData(signupData));
        //console.log("signupfrom: ", signupData);


        //send otp to user email and navigate user to verify otp page
        dispatch(sendOtp(email, navigate));


        //RESET DATA
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.PATIENT)
        
        //until now db entry is not created
    }

    // const {signupData} = useSelector( (state) => state.auth );
    // console.log("signupData: ", signupData);

    
    const tabData = [
        {
            id: 1,
            tabName: "Patient",
            type: "Patient"
        },
        {
            id: 2,
            tabName: "Doctor",
            type: "Doctor"
        }
    ]

  return (
    <div className='flex flex-col justify-center pt-6'>
        <div>
            <Link to={"/"}>
                <div className='flex items-center font-normal text-5xl gap-1 justify-center'>
                    <img src={logo} alt='healthease logo' width={40}/>
                    <h1>ealthEase</h1>
                </div>
            </Link>
        </div>

        <div className='px-[48px] py-[64px] bg-[#f3f8ff] max-w-2xl mt-12 rounded-3xl' >

            <h1 className='text-[28px] font-bold'>
                Sign Up
            </h1>
            <p>
                Unlock a world of wellness and convenience by signing up with HealthEase. Together, we'll embark on a journey to a healthier, happier you.
            </p>
            
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

            <form  onSubmit={handleOnSubmit} className='font-semibold text-[17px] flex flex-col gap-4' >
                <div className='flex gap-4 '>
                    <label>
                        <p>First Name</p>
                        <input type='text'  name='firstName' value={firstName}  required onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input type='text' name='lastName' value={lastName}  required onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
                    </label>
                </div>

                <div className=''>
                    <label>
                        <p>Email Address</p>
                        <input type='email' name='email' value={email}  required onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
                    </label>
                </div>
                
                <div>
                    <label>
                        <p>Contact Number</p>
                        <input type='number'  name='contactNumber' value={contactNumber}  required onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
                    </label>
                </div>

                <div className='flex gap-4 '>
                    <label>
                        <p>Create Password</p>
                        <input type={"password"}  name='password' value={password}  required onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
                    </label>
                    <label>
                        <p>Confirm Password</p>
                        <input type={"password"} name='confirmPassword' value={confirmPassword}  required onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
                    </label>
                </div>


                <button type='submit' className='bg-[#3d65ff] rounded-full text-slate-200 font-medium text-xl px-[38px] py-[20px] cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4'>
                    Create Account
                </button>
            </form>

        </div>
    </div>
  )
}

export default Signup