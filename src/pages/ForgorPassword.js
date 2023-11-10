import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"

import logo from '../assests/logo/healthease.png'

const ForgorPassword = () => {

    const {loading} = useSelector( (state) => state.auth);
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        
    }

  return (
    <div>
        {
            loading ? (
                <div>
                    <ClipLoader size={50}/>
                </div>
            ):(
                <div className='flex flex-col justify-center pt-6'>
                    <div>
                        <Link to={"/"}>
                            <div className='flex items-center font-normal text-5xl gap-1 justify-center'>
                                <img src={logo} alt='healthease logo' width={40}/>
                                <h1>ealthEase</h1>
                            </div>
                        </Link>
                    </div>
                    <div className='px-[48px] py-[64px] bg-[#f3f8ff] max-w-2xl mt-12 rounded-3xl'>
                        <h1 className='text-[28px] font-bold'>
                            {
                                !emailSent ? "Reset your password" : "Check your email"
                            }
                        </h1>
                        <p className='mt-2'>
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                            }
                        </p>
                        <form onSubmit={handleOnSubmit} className='font-semibold text-[17px] flex flex-col gap-4'>
                            {!emailSent && (
                            <label className="w-full">
                                <p className="mb-1 mt-9 font-semibold text-[17px] leading-[1.375rem]">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                className='px-10 py-2 rounded-full shadow-md'
                                />
                            </label>
                            )}
                            <button type="submit" className='bg-[#3d65ff] mt-9 rounded-full px-[38px] py-[15px] cursor-pointer hover:-translate-y-1 ease-linear duration-200'>
                                {!emailSent ? "Sumbit" : "Resend Email"}
                            </button>
                        </form>
                        <div className="mt-4 flex items-center justify-between">
                            <Link to="/login">
                            <p className="flex items-center gap-x-2">
                                <BiArrowBack /> Back To Login
                            </p>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgorPassword