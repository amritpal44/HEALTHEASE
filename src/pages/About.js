import React, { useEffect } from 'react'
import threedoctors from "../assests/images/threedoctors.png"
import Navbar from '../components/Common/Navbar'

const About = () => {

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

    <div className='h-screen'>

      <Navbar/>


      <div id='aboutus' className='mx-auto max-w-7xl  py-[50px] rounded-[4rem] flex justify-center items-center font-clarity-city gap-36'>

        <div className={`${hiddenClass} ${Delay2} w-[80rem]`}>
          <img src={threedoctors} alt='Doctors'/>
        </div>

        <div className= {`${hiddenClass} ${Delay1} text-[18px] font-medium mt-16`}>
          <h1 className='text-blue-500 font-bold text-[28px]'>ABOUT US</h1>
          <p className='text-[50px] font-semibold leading-tight'>Our caring doctors are here for you</p>
          <p className='text-slate-500 mt-5'>
            Our mission is to create a platform that not only meets but exceeds expectations, offering users a seamless and engaging experience. Join us in this endeavor, where every line of code is a step towards redefining possibilities in the digital landscape
          </p>

          <div className='flex gap-10 mt-5'>
            <div className='flex flex-col'>
              <div className='text-[68px] flex font-bold'>
                <p>10</p>
                <p className='text-blue-600'>K</p>
              </div>
              <div className='text-slate-500'>
                Happy Clients
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='text-[68px] flex font-extrabold'>
                <p>100</p>
                <p className='text-blue-600 font-black text-[80px] -translate-y-2'>+</p>
              </div>
              <div className='text-slate-500 -translate-y-4'>
                Team Members
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default About