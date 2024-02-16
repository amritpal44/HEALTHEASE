import React, { useEffect, useState } from 'react'
import Navbar from '../components/Common/Navbar'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../services/apiconnector'
import toast from 'react-hot-toast'
import globe from "../assests/logo/globe.png"
import contactus from "../assests/logo/contactus.png"
import { contactusEndpoint } from '../services/apis'

const Contact = () => {

  const hiddenClass = "hidden-transition"
  const Delay1 = "hidden-transition-delay-1"
  const Delay2 = "hidden-transition-delay-2"

  //for initial loading transition
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



  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      if(res?.data?.success === true){
        toast.success("Email sent successfully");
      }
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])


  return (

    <div id='contactus' className='mx-auto w-full bg-[#0d192b] px-[20px] font-clarity-city h-full overflow-y-scroll'>
      <div className='max-w-7xl mx-7 flex flex-col lg:flex-row lg:mx-auto gap-5'>
        <div className= {`${hiddenClass} ${Delay1} mt-14 flex flex-col lg:w-4/6`}>
          <h1 className='text-blue-500 font-bold text-[28px]'>CONTACT US</h1>
          <p className=' text-[25px] lg:text-[50px] font-semibold leading-tight text-slate-200 mt-8'>Get in touch</p>
          <p className='text-slate-500 mt-5 text-[18px]'>
            Have questions or need assistance? Get in touch, and our friendly team at HealthEase Hub will be happy to help you.
          </p>

          <div className='flex gap-8 mt-10'>
            <img src={contactus} alt='contact us' className='w-[70px] sm:w-[100px] mb-5 object-contain'/>
            <div className='flex flex-col sm:flex-row sm:gap-8'>
              <div className='text-slate-200 items-center'>
                <p className='font-medium text-[14px] sm:text-[18px] mt-5'>Phone number</p>
                <p className='font-medium text-[14px] sm:text-[18px] '>0129-2310160</p>
              </div>
              <div className='mt-5 text-slate-200'>
                <p className='font-medium text-[14px] sm:text-[18px] '>Email Address</p>
                <p className='font-semibold text-[14px] sm:text-[18px]'>healtheaseofficial@gmail.com</p>
              </div>
            </div>
          </div>

          <div className='flex gap-8 mt-5'>
            <img src={globe} alt='globe' className='w-[70px] sm:w-[100px] mb-5 object-contain'/>
            <div className='mt-5 text-slate-200'>
              <h1 className='font-medium text-[14px] sm:text-[20px] '>Visit us on</h1>
              <p className='font-medium text-[14px] sm:text-[18px]'>6, NH-19, Sector 6, Faridabad, Haryana 121006</p>
            </div>
          </div>
        </div>

        <div className={`${hiddenClass} ${Delay2} rounded-3xl py-8 lg:p-14 flex gap-3 flex-col w-full lg:w-[900px] max-w-2xl mx-auto`}>
          <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}
          >
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter first name"
                  className="form-style sm:text-xl rounded-lg  w-full px-3 lg:px-[18px] py-[10px] lg:py-[12px] bg-slate-100"
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your name.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter last name"
                  className="form-style sm:text-xl rounded-lg  w-full px-3 lg:px-[18px] py-[10px] lg:py-[12px] bg-slate-100"
                  {...register("lastname")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                className="form-style sm:text-xl rounded-lg  w-full px-3 lg:px-[18px] py-[10px] lg:py-[12px] bg-slate-100"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Email address.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                className="form-style sm:text-xl rounded-lg w-full px-3 lg:px-[18px] py-[10px] lg:py-[12px] bg-slate-100"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />             
                
              {errors.phoneNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.phoneNo.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                placeholder="Enter your message here"
                className="form-style sm:text-xl rounded-lg w-full px-3 lg:px-[18px] py-[10px] lg:py-[12px] bg-slate-100"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Message.
                </span>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`bg-[#3d65ff] rounded-lg text-slate-200 sm:rounded-lg font-bold text-xl sm:text-2xl  sm:px-[18px] py-[12px] sm:py-[17px] cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4
                ${
                  loading ? 'opacity-30 cursor-not-allowed' : ''
                }
              `}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      
    </div>

  )
}

export default Contact