import React, { useState } from 'react'
import logo from "../assests/logo/healthease.png"
import Tab from '../components/Common/Tab'
import { ACCOUNT_TYPE } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
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
    <div className='w-full h-full flex flex-col items-center pt-6 bg-[#0d192b] overflow-y-scroll pb-4 sm:pb-7'>

      {/* <div>
        <Link to={"/"}>
          <div className='flex items-center font-normal text-3xl sm:text-5xl gap-1 justify-center'>
            <img src={logo} alt='healthease logo' width={30} className='mr-2 sm:mr-3' />
            <h1 className='text-xl sm:text-2xl'>HealthEase</h1>
          </div>
        </Link>
      </div> */}

      <div className='p-6 mx-4 bg-[#f3f8ff] gap-2 max-w-xl mt-4 rounded-3xl'>

        <h1 className='text-2xl sm:text-4xl font-bold p-2'>
          Sign Up
        </h1>
        <p className='text-sm sm:text-base p-1'>
          Unlock a world of wellness and convenience by signing up with HealthEase. Together, we'll embark on a journey to a healthier, happier you.
        </p>

        {/* Adjust Tab Component for responsiveness */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

        <form onSubmit={handleOnSubmit} className='font-semibold text-sm sm:text-base flex flex-col gap-4 p-1'>
          <div className='flex flex-col sm:flex-row gap-4 '>
            <label className='flex-1'>
              <p>First Name</p>
              <input type='text' name='firstName' value={firstName} required onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
            <label className='flex-1'>
              <p>Last Name</p>
              <input type='text' name='lastName' value={lastName} required onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
          </div>

          <div className=''>
            <label>
              <p>Email Address</p>
              <input type='email' name='email' value={email} required onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
          </div>

          <div>
            <label>
              <p>Contact Number</p>
              <input type='number' name='contactNumber' value={contactNumber} required onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 '>
            <label className='flex-1'>
              <p>Create Password</p>
              <input type='password' name='password' value={password} required onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
            <label className='flex-1'>
              <p>Confirm Password</p>
              <input type='password' name='confirmPassword' value={confirmPassword} required onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
          </div>

          <button type='submit' className='bg-[#3d65ff] rounded-full text-slate-200 font-medium text-lg px-6 py-3 cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4'>
            Create Account
          </button>
        </form>

      </div>
    </div>

  )
}

export default Signup