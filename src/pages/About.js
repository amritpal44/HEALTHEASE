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
    <>
  <Navbar />
    <div className='h-screen'>
  <div id='aboutus' className='mx-auto max-w-7xl py-10 sm:py-20 rounded-[4rem] flex flex-col sm:flex-row justify-center items-center font-clarity-city gap-4 sm:gap-36'>
    <div className={`${hiddenClass} ${Delay2} w-full sm:w-[80rem] h-[300px] sm:h-auto overflow-hidden`}>
      <img src={threedoctors} alt='Doctors' className='w-full h-full object-cover p-4' />
    </div>

    <div className={`${hiddenClass} ${Delay1} text-[16px] sm:text-[18px] font-medium mt-6 sm:mt-0 sm:ml-8 p-5 flex flex-col justify-center items-center`}>
      <h1 className='text-blue-500 font-bold text-2xl sm:text-4xl leading-tight'>ABOUT US</h1>
      <p className='text-3xl sm:text-5xl font-semibold leading-tight mt-3 sm:mt-5'>
        Our caring doctors are here for you
      </p>
      <p className='text-slate-500 text-sm sm:text-base mt-5'>
        Our mission is to create a platform that not only meets but exceeds expectations, offering users a seamless and engaging experience. Join us in this endeavor, where every line of code is a step towards redefining possibilities in the digital landscape
      </p>

      <div className='flex flex-col sm:flex-row gap-4 sm:mt-8'>
        <div className='flex flex-col items-center'>
          <div className='text-4xl sm:text-6xl flex font-bold items-center'>
            <p className='mr-1'>10</p>
            <p className='text-blue-600'>K</p>
          </div>
          <div className='text-slate-500 text-sm sm:text-base'>
            Happy Clients
          </div>
        </div>

        <div className='flex flex-col items-center  gap-4 sm:mt-8'>
          <div className='text-4xl sm:text-6xl flex font-extrabold items-center'>
            <p className='mr-1'>100</p>
            <p className='text-blue-600 font-black text-5xl sm:text-8xl rounded-lg -translate-y-2'>+</p>
          </div>
          <div className='text-slate-500 text-sm sm:text-base -translate-y-4'>
            Team Members
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default About