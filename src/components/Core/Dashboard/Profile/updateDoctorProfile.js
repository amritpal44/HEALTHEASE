
import React, { useState } from 'react'

const updateDoctorProfile = () => {


    const [formData, setFormData] = useState({
        specialization: "",
        fee: "",
        
    })

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
                Update Profile
            </h1>
        </div>

        <form>

        </form>
    </div>
  )
}

export default updateDoctorProfile