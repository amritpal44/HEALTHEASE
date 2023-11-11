import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assests/logo/healthease.png"
import { useDispatch } from 'react-redux'
import { login } from '../services/operations/authAPI'
import { BiArrowBack } from "react-icons/bi"

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (event) => {
    // console.log("formData", formData);
    setFormData( (prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value 
    }))
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password, navigate)); 
  }

  const {email, password} = formData;

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

      <div className='px-[48px] py-[64px] bg-[#f3f8ff] max-w-2xl mt-12 rounded-3xl'>
        <h1 className='text-[28px] font-bold'>
            Sign Up
        </h1>
        <p>
          Unlock a world of wellness and convenience by signing up with HealthEase. Together, we'll embark on a journey to a healthier, happier you.
        </p>

        <form onSubmit={handleOnSubmit} className='font-semibold mt-7 text-[17px] flex flex-col gap-4'>
          <div>
            <label>
              <p>Email</p>
              <input type='email' name='email' value={email} onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
            </label>
          </div>

          <div>
            <label>
              <p>Password</p>
              <input type='password' name='password' value={password} onChange={handleOnChange} className='px-10 py-2 rounded-full shadow-md'></input>
            </label>
          </div>


          <button type='submit' className='bg-[#3d65ff] rounded-full text-slate-200 font-medium text-xl px-[38px] py-[20px] cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4'>
            Sign in
          </button>
        </form>
        <div className="mt-4 flex items-center justify-between">
            <Link to="/reset-password">
              <p className="flex items-center gap-x-2">
                  <BiArrowBack /> Reset Password
              </p>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Login