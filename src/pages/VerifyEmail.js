import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assests/logo/healthease.png'
import {BiArrowBack} from 'react-icons/bi';
import {RxCountdownTimer} from 'react-icons/rx'
import toast from 'react-hot-toast';
import { signup } from '../services/operations/authAPI';

const VerifyEmail = () => {

  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {loading, signupData} = useSelector( (state) => state.auth);

  const {firstName, lastName, email, contactNumber, password, confirmPassword, accountType} = signupData;


  useEffect( () => {
    //only allow access if signup data is filled
    
    if(!signupData){
      toast.error("Enter signup details.");
      navigate("/signup");
    }
    // console.log("signup data: ", signupData);
  })

  const handleOnSubmit = (event) => {
    event.preventDefault();
    
    console.log("otp at verify-email", otp);
    //calling api
    dispatch(
      signup(firstName, lastName, email, contactNumber, password, confirmPassword, accountType, otp, navigate)
    )
  }


  return (
    <div className='flex justify-center h-full w-full bg-[#0d192b]'>

      {
        loading ? (
          <div className=' flex justify-center h-full w-full items-center'>
              <ClipLoader size={50} />
          </div>  
        ) : (

          <div className='flex flex-col'>
            {/* <div>
              <Link to={"/"}>
                  <div className='flex items-center font-normal text-5xl gap-1 justify-center'>
                      <img src={logo} alt='healthease logo' width={40}/>
                      <h1>ealthEase</h1>
                  </div>
              </Link>
            </div> */}

            <form onSubmit={handleOnSubmit}>
              
              <div className='px-[48px] py-[64px] pb-10 bg-[#f3f8ff] max-w-2xl rounded-3xl'>
                <h1 className='text-[28px] font-bold'>
                  Verify Email
                </h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4">
                  A verification code has been sent to you. Enter the code below
                </p>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      className='text-3xl bg-slate-500 rounded-xl border-0 text-white focus:outline-none focus:ring focus:border-blue-500'
                      // style={{
                      //   // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      // }}
                    />
                  )}
                  containerStyle={{
                    justifyContent: "center",
                    gap: "0 6px",
                    paddingTop: "5px"
                  }}
                />

                <button type='submit' className='bg-[#3d65ff] rounded-full w-full text-slate-200 font-medium text-xl px-[38px] py-[20px] cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4'>
                  VerifyEmail
                </button>

                <div className="mt-8 flex items-center justify-between">
                  <Link to="/signup">
                    <p className="text-richblack-5 flex items-center gap-x-2">
                      <BiArrowBack /> Back To Signup
                    </p>
                  </Link>
                  <button
                    className="flex items-center gap-x-2"
                    // onClick={() => dispatch(sendOtp(signupData.email))}
                  >
                    <RxCountdownTimer />
                    Resend it
                  </button>
                </div>
              </div>

            </form>

          </div>          
        )
      }      
    </div>
  )
}

export default VerifyEmail