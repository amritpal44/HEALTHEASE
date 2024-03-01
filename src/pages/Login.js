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
    <div className='flex flex-wrap h-screen sm:h-full flex-col pt-6 p-4 gap-2 w-full bg-[#0d192b]'>

      {/* <div>
        <Link to={"/"}>
          <div className='flex items-center  text-5xl gap-1 justify-center p-3'>
            <img src={logo} alt='healthease logo' width={35} className='mr-2 text-center' />
            <h1 className='text-2xl sm:text-5xl text-center'>HealthEase</h1>
          </div>
        </Link>
      </div> */}
    
      <div className='px-4 sm:px-8 py-8 sm:py-10 flex  flex-col flex-wrap bg-[#f3f8ff] max-w-xl sm:max-w-xl mt-8 rounded-3xl gap-2 mx-auto'>
        <h1 className='text-2xl sm:text-4xl font-bold p-2'>
          Log In
        </h1>
        <p className='text-sm sm:text-base p-2'>
          Unlock a world of wellness and convenience by signing up with HealthEase. Together, we'll embark on a journey to a healthier, happier you.
        </p>
    
        <form onSubmit={handleOnSubmit} className='font-semibold mt-4 text-sm sm:text-base flex flex-col gap-4 p-2'>
          <div>
            <label className='block'>
              <p>Email</p>
              <input type='email' name='email' value={email} onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
          </div>
    
          <div>
            <label className='block'>
              <p>Password</p>
              <input type='password' name='password' value={password} onChange={handleOnChange} className='w-full px-4 py-2 rounded-md shadow-md'></input>
            </label>
          </div>
    
          <button type='submit' className='bg-[#3d65ff] rounded-lg sm:rounded-full text-slate-200 font-medium text-lg p-4 
          cursor-pointer hover:-translate-y-1 ease-linear duration-200 m-2'>
            Sign in
          </button>
        </form>
    
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-between p-2">
          <Link to="/reset-password">
            <p className="text-sm sm:text-base flex items-center gap-x-2">
              <BiArrowBack /> Reset Password
            </p>
          </Link>
        </div>
      </div>
    </div>
  
  )
}

export default Login