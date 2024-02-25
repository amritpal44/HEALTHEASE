import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"

import logo from '../assests/logo/healthease.png'
import { setResetPassword } from '../services/operations/authAPI';



const UpdatePassword = () => {

    const {loading} = useSelector( (state) => state.auth );
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const location = useLocation();//location will store the current url

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const {password, confirmPassword} = formData;

    const handleOnChange = (event) => {
        setFormData( (prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleOnSubmit = (event) => {

        event.preventDefault();

        //extract token from location string
        const token = location.pathname.split('/').at(-1);

        dispatch(setResetPassword(password, confirmPassword, token, navigate))
    }

  return (
    <div className='flex justify-center w-full h-full bg-[#0d192b]'>
        {
            loading ? (
                <div>
                    <ClipLoader size={50} />
                </div>
            ) : (
                <div className='flex flex-col mx-auto sm:pt-6 sm:w-[550px] w-full px-5 pb-4'>
                    {/* <div>
                        <Link to={"/"}>
                            <div className='flex items-center font-normal text-5xl gap-1 justify-center'>
                                <img src={logo} alt='healthease logo' width={40}/>
                                <h1>ealthEase</h1>
                            </div>
                        </Link>
                    </div> */}
                    <div className='px-6 sm:px-[48px] py-[64px] pb-[40px] bg-[#f3f8ff] max-w-2xl mt-12 rounded-3xl'>
                        <h1 className='text-2xl sm:text-[28px] font-bold'>
                            Enter new Password
                        </h1>
                        <p className=' mt-5 sm:mt-2'>
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={handleOnSubmit} className='font-semibold text-[17px] flex flex-col gap-4'>
                            
                            <label className="w-full">
                                <p className="mb-1 mt-9 font-semibold sm:text-[17px] leading-[1.375rem]">
                                    Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                className='px-2 sm:px-5 py-2 rounded-lg shadow-md'
                                />
                            </label>

                            <label className="w-full">
                                <p className="mb-1 mt-4 font-semibold sm:text-[17px] leading-[1.375rem]">
                                    Confirm Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                className='px-2 sm:px-5 py-2 rounded-lg shadow-md'
                                />
                            </label>
                            
                            <button type="submit" className='bg-[#3d65ff] rounded-full text-slate-200 font-medium text-lg px-6 py-3 cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4'>
                                Sumbit
                            </button>
                        </form>
                        <div className="mt-5 flex items-center justify-between">
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

export default UpdatePassword