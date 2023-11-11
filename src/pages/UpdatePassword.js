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
    <div>
        {
            loading ? (
                <div>
                    <ClipLoader size={50} />
                </div>
            ) : (
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
                            Enter new Password
                        </h1>
                        <p className='mt-2'>
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={handleOnSubmit} className='font-semibold text-[17px] flex flex-col gap-4'>
                            
                            <label className="w-full">
                                <p className="mb-1 mt-9 font-semibold text-[17px] leading-[1.375rem]">
                                    Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                className='px-10 py-2 rounded-full shadow-md'
                                />
                            </label>

                            <label className="w-full">
                                <p className="mb-1 mt-9 font-semibold text-[17px] leading-[1.375rem]">
                                    Confirm Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                className='px-10 py-2 rounded-full shadow-md'
                                />
                            </label>
                            
                            <button type="submit" className='bg-[#3d65ff] mt-9 rounded-full px-[38px] py-[15px] cursor-pointer hover:-translate-y-1 ease-linear duration-200'>
                                Sumbit
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

export default UpdatePassword