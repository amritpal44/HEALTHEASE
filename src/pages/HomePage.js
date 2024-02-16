import React, { useState } from 'react'
//import homebuildings2 from "../assests/images/istockphoto-1289383957-170667a.webp"
// import './HomePage.css'
import { useEffect } from 'react'
import PrimaryButton from '../components/Common/PrimaryButton'
import SecondaryButton from '../components/Common/SecondaryButton'

import homebuildings from "../assests/images/home-buildings.jpg"
// import threedoctors from "../assests/images/threedoctors.png"
import nursehelpperson from "../assests/images/nursehelpperson.png"
import residentcare from "../assests/images/residentcare.png"
import qualitysupport from "../assests/images/qualitysupport.png"
import nursestaff from "../assests/images/nursestaff.png"

import globe from "../assests/logo/globe.png"
import contactus from "../assests/logo/contactus.png"

import {FaArrowRight} from "react-icons/fa"
import Navbar from '../components/Common/Navbar'
// import { useForm } from 'react-hook-form'
// import { apiConnector } from '../services/apiconnector'
// import { contactusEndpoint } from '../services/apis'
// import toast from 'react-hot-toast'
import Footer from '../components/Common/Footer'
import { Link } from 'react-router-dom'

const HomePage = () => {

  const hiddenClass = "hidden-transition"
  const Delay1 = "hidden-transition-delay-1"
  const Delay2 = "hidden-transition-delay-2"

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } 
        // else {
        //   entry.target.classList.remove('show');
        // }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden-transition');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);


  return (
    <div className='relative '>

      {/* SECTION 1 */}
      {/* asix -z-10 karne se buttons kam nahi karege */}
      <div className='relative flex flex-wrap flex-col w-full justify-center items-center mb-24'> 

        <img className="absolute h-3/4 w-full object-cover rounded-xl sm:rounded-[4rem] -z-10  top-0 -translate-y-28" src={homebuildings} alt='home page background'/>

        {/* WELCOME DIV */}
        <div className={`mt-20 md:mt-36 w-full sm:w-[35rem] flex flex-col my-5 `}>

          <div className={`flex flex-col justify-center  text-center text-slate-100 m-2`}>

            <h1 className={`font-sans text-2xl font-bold  ${hiddenClass}`}>
              WELCOME TO HEALTHEASE
            </h1>

            <h1 className={` text-3xl md:text-6xl md:font-bold sm:pt-7 p-4 ${hiddenClass} ${Delay1}`}>
              Holistic wellness for optimal living
            </h1>

            <p className={`text-[16px] sm:text-[18px] pt-6 md:pt-4  ${hiddenClass} ${Delay1}`}>
              Our platform is your gateway to a healthier and more fulfilling life. Discover a comprehensive approach to wellness that encompasses your mind, body, and spirit.
            </p>

          </div>

          {/* TWO BUTTONS */}
          <div className={`flex md:flex-row flex-col gap-5 justify-around pt-10 text-slate-200 text-[18px] font-bold ${hiddenClass} ${Delay2} m-6`}>

            <PrimaryButton linkto={"/doctors"}>
              Book an appointment
            </PrimaryButton>

            <SecondaryButton linkto={"/medicines"}>
              Buy Medicines
            </SecondaryButton>

          </div>
        </div>

        {/* BOOKING DIV */}
        <div className='m-4 p-3 md:mt-36 max-w-full md:max-w-7xl px-[4vw] py-[50px] md:py-[100px] pb-[40px] rounded-full lg:rounded-[4rem] bg-[#f3f8ff] flex flex-col lg:flex-row justify-between md:justify-normal font-clarity-city gap-4 sm:gap-12'>
          <div className={`${hiddenClass} w-screen-xl sm:max-w-lg pb-5 mt-4 sm:mt-7 flex flex-col items-center lg:items-start justify-center md:justify-normal p-3`}>
            <h1 className='font-medium text-xl  text-blue-600 p-2 px-5'>BOOKING</h1>
            <h2 className='font-bold text-3xl md:text-5xl text-center lg:text-start px-4 p-3'>Let us take care of your health</h2>
            <p className='font-medium text-lg md:text-3lg p-1 text-slate-500 lg:text-start text-center'>Reach out to us via phone or email. Our team is ready to answer your questions and address your healthcare needs.</p>
          </div>

          <div className={`${hiddenClass} ${Delay1} p-3 flex items-center  flex-col justify-center md:justify-normal w-full`}>
            <img src={globe} alt='globe' className='w-[70px] sm:w-[100px] items-center'/>

            <div className='flex flex-col justify-center md:justify-normal items-center gap-2 mb-5 border-b border-slate-400 pb-4 max-w-full sm:max-w-lg'>
              <h1 className='font-medium text-[18px] sm:text-[28px]'>Visit us on</h1>
              <p className='font-medium text-[16px] sm:text-[18px] text-center lg:text-start'>6, NH-19, Sector 6, Faridabad, Haryana 121006</p>
              <div className='font-medium flex items-center gap-2 sm:gap-3 text-[16px] sm:text-[18px] text-blue-600 hover:text-red-600 duration-300 ease-out'>
                <a target="_blank" rel="noopener noreferrer" href='https://www.google.com/maps/place/J.C.+Bose+University+of+Science+and+Technology,+YMCA+(Formerly+YMCA+UST)/@28.3675186,77.3177024,17z/data=!4m6!3m5!1s0x390cdc71f6e9f557:0xeb301eec9ff18517!8m2!3d28.3674749!4d77.3158949!16s%2Fm%2F02vvttl?entry=ttu'>
                  Open on Google Maps
                </a>
                <FaArrowRight />
              </div>
            </div>

              <div className='font-medium text-[16px] sm:text-[18px] p-3 flex flex-col justify-center md:justify-normal items-center'>
                <p>Mon - Fri: 8:00am to 5:00pm</p>
                <p>Saturday: 9:00am to 3:30pm</p>
              </div>
          </div>

          <div className={`${hiddenClass} ${Delay2} p-3 flex flex-col justify-center md:justify-normal items-center`}>
            <img src={contactus} alt='contactus' className='w-[70px] sm:w-[100px] mb-5' />
            
            <div className='border-b border-slate-400 pb-4 flex flex-col justify-center md:justify-normal items-center'>
              <h1 className='font-medium text-[18px] sm:text-[28px]'>Contact us</h1>
              <p className='font-medium text-[16px] mt-2 sm:mt-5'>Phone number</p>
              <p className='font-medium text-[16px] sm:text-[18px]'>0129-2310160</p>
            </div>

            <div className='mt-2 sm:mt-5 p-3 flex flex-col justify-center md:justify-normal items-center'>
              <p className='font-medium text-[16px] sm:text-[18px] text-slate-500'>Email Address</p>
              <p className='font-semibold text-[16px] sm:text-[18px]'>healtheaseofficial@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      



      {/* SECTION 3 WHY CHOOSE US */}
      <div className='m-9 xl:m-auto max-w-7xl py-10 sm:py-[40px] rounded-[4rem] flex p-3 flex-col lg:flex-row justify-center items-center font-clarity-city gap-4 lg:gap-28 mt-8 sm:mt-16'>

        <div className={`${hiddenClass} ${Delay1} text-[16px] sm:text-[18px] font-medium lg:w-1/2`}>
          <h1 className='text-blue-500 font-bold text-[24px] sm:text-[28px]'>WHY CHOOSE US</h1>
          <p className='text-[36px] lg:text-[40px] font-semibold leading-tight'>The right care for your loved ones</p>

          <div className='flex flex-col mt-9'>

            <div className='flex flex-col gap-7 sm:flex-row sm:gap-10 border-b border-slate-400 pb-7'>
              <div className='flex gap-5 hover:translate-x-3 transition-all delay-100 duration-300'>
                <img src={residentcare} alt='residentcare' className='w-[50px] sm:w-[80px] object-cover' />
                <div>
                  <h1 className='text-[20px] sm:text-2xl font-semibold'>Resident care</h1>
                  <p className='text-[14px] lg:text-lg font-medium text-slate-500'>Your health and comfort are our top priorities at HealthEase.</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-7 sm:flex-row sm:gap-10 border-b border-slate-400 pb-7 mt-7'>
              <div className='flex gap-5 hover:translate-x-3 transition-all delay-100 duration-300'>
                <img src={qualitysupport} alt='qualitysupport' className='w-[50px] sm:w-[80px] object-cover' />
                <div>
                  <h1 className='text-[20px] sm:text-2xl font-semibold'>Quality support</h1>
                  <p className='text-[14px] sm:text-lg font-medium text-slate-500'>Reliable and quality support tailored to your needs.</p>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap flex-col gap-7 md:flex-row sm:gap-10 mt-7'>
              <div className='flex gap-5 hover:translate-x-3 transition-all delay-100 duration-300'>
                <img src={nursestaff} alt='nursestaff' className='w-[50px] sm:w-[80px] object-cover rounded-full' />
                <div>
                  <h1 className='text-[20px] sm:text-2xl font-semibold'>24/7 nurse staff</h1>
                  <p className='text-[14px] sm:text-lg font-medium text-slate-500'>Rely on our round-the-clock nurse staff, committed to providing attentive and compassionate care whenever you need it.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className={`${hiddenClass} ${Delay2} w-[300px] mt-4 lg:mt-0 lg:w-[450px]`}>
          <img src={nursehelpperson} alt='nurse helping person' className='' />
        </div>
      </div>

      <Footer/>

    </div>
  )
}

export default HomePage