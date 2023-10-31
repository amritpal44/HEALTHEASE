import React from 'react'
//import homebuildings2 from "../assests/images/istockphoto-1289383957-170667a.webp"
import './HomePage.css'
import { useEffect } from 'react'
import PrimaryButton from '../components/Common/PrimaryButton'
import SecondaryButton from '../components/Common/SecondaryButton'

import homebuildings from "../assests/images/home-buildings-2.png"
import globe from "../assests/logo/globe.png"
import contactus from "../assests/logo/contactus.png"

import {FaArrowRight} from "react-icons/fa"
import Navbar from '../components/Common/Navbar'

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
        else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden-transition');
    hiddenElements.forEach((el) => observer.observe(el));

    // return () => {
    //   hiddenElements.forEach((el) => observer.unobserve(el));
    // };
  }, []);


  return (
    <div className=''>

      <Navbar/>

      {/* SECTION 1 */}
      <div className='relative flex flex-col w-[99.6%] justify-center items-center'>

        <img className="absolute h- -z-10 object-cover rounded-[4rem] top-0 -translate-y-28 " src={homebuildings} alt='home page background'/>
        
        {/* WELCOME DIV */}
        <div className= {`mt-36 w-[35rem] flex flex-col`}>

          <div className={`flex flex-col justify-center items-center text-center text-slate-100 `}>

            <h1 className={`font-sans text-2xl font-bold ${hiddenClass}`}>
              WELCOME TO HEALTHEASE
            </h1>

            <h1 className= {`text-[68px] font-bold pt-7 ${hiddenClass} ${Delay1}`}>
              Holistic wellness for optimal living
            </h1>

            <p className= {`text-[18px] text-sm ${hiddenClass} ${Delay1}`}>
              Our platform is your gateway to a healthier and more fulfilling life. Discover a comprehensive approach to wellness that encompasses your mind, body, and spirit.
            </p>

          </div>

          {/* TWO BUTTONS */}
          <div className={`flex justify-around pt-10 text-slate-200 text-[18px] font-bold ${hiddenClass} ${Delay2}`}>

            <PrimaryButton linkto={"/signup"}>
              Book an appointment
            </PrimaryButton>

            <SecondaryButton linkto={"/category"}>
              Our Specialities
            </SecondaryButton>

          </div>
        </div>


        {/* BOOKING DIV */}
        <div className='mx-[24px] mt-36 px-[4vw] py-[80px] rounded-[4rem] bg-[#f3f8ff] flex justify-between font-clarity-city '>
          <div className={`${hiddenClass}`}>
            <h1>BOOKING</h1>
            <h2>Let us take care of your health</h2>
            <p>Reach out to us via phone or email. Our team is ready to answer your questions and address your healthcare needs.</p>
          </div>

          <div className={`${hiddenClass} ${Delay1}`}>
            <img src={globe} alt='globe'/>

            <div>
              <h1>Visit us on</h1>
              <p>6, NH-19, Sector 6, Faridabad, Haryana 121006</p>
              <div>
                <a target="_blank" rel="noopener noreferrer" href='https://www.google.com/maps/place/J.C.+Bose+University+of+Science+and+Technology,+YMCA+(Formerly+YMCA+UST)/@28.3675186,77.3177024,17z/data=!4m6!3m5!1s0x390cdc71f6e9f557:0xeb301eec9ff18517!8m2!3d28.3674749!4d77.3158949!16s%2Fm%2F02vvttl?entry=ttu'>
                  Open on Google Maps
                </a>
                <FaArrowRight />
              </div>
            </div>

            <div>
              <p>Mon - Fri: 8:00am to 5:00pm</p>
              <p>Saturday: 9:00am to 3:30pm</p>
            </div>
          </div>

          <div className={`${hiddenClass} ${Delay2}`}>
            <img src={contactus} alt='contactus' />
            
            <div>
              <h1>Contact us</h1>
              <p>Phone number</p>
              <p>0129-2310160</p>
            </div>

            <div>
              <p>Email Address</p>
              <p>healtheaseofficial@gmail.com</p>
            </div>

          </div>

        </div>
      </div>



      {/* SECTION 2 ABOUT SECTION */}
      <div>

      </div>
    </div>
  )
}

export default HomePage