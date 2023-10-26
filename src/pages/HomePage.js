import React from 'react'
import homebuildings from "../assests/images/home-buildings.jpg"
//import homebuildings2 from "../assests/images/istockphoto-1289383957-170667a.webp"
import { Link } from 'react-router-dom'
import './HomePage.css'
import { useEffect } from 'react'


const HomePage = () => {

  const hiddenClass = "hidden-transiton"

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

    const hiddenElements = document.querySelectorAll('.hidden-transiton');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);


  return (
    <div className='w-screen'>
      {/* SECTION 1 */}
      <div className='relative flex flex-col w-[99.6%] justify-center items-center'>

        <img className="absolute -z-10 object-cover rounded-[4rem] top-0 -translate-y-20" src={homebuildings} alt='home page background'/>
        
        {/* WELCOME DIV */}
        <div className= {`pt-36 w-[35rem] flex flex-col ${hiddenClass}`}>

          <div className='flex flex-col justify-center items-center text-center text-slate-100'>

            <h1 className='font-sans text-2xl font-bold'>
              WELCOME TO HEALTHEASE
            </h1>

            <h1 className='text-[68px] font-bold pt-7'>
              Holistic wellness for optimal living
            </h1>

            <p className='text-[18px] text-sm'>
              Our platform is your gateway to a healthier and more fulfilling life. Discover a comprehensive approach to wellness that encompasses your mind, body, and spirit.
            </p>

          </div>

          {/* TWO BUTTONS */}
          <div className='flex justify-around pt-10 text-slate-200 text-[18px] font-bold'>

            <Link to={"/signup"}>
              <div className='bg-[#3d65ff] rounded-full px-[38px] py-[24px] cursor-pointer hover:-translate-y-1 ease-linear duration-200'>
                <button>
                  Book an appointment
                </button>
              </div>
            </Link>

            <Link to={"/specialization"}>
              <div className='bg-transparent font-medium rounded-full border border-slate-200 px-[38px] py-[24px] cursor-pointer hover:-translate-y-1 hover:bg-slate-200 hover:text-slate-950 ease-linear duration-200'>
                <button>
                  Our specialities
                </button>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage