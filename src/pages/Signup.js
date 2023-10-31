import React from 'react'
import logo from "../assests/logo/healthease.png"
import Tab from '../components/Common/Tab'

const Signup = () => {
    
    const tabData = [
        {
            id: 1,
            tabName: "Patient",
            type: "Patient"
        },
        {
            id: 2,
            tabName: "Doctor",
            type: "Doctor"
        }
    ]

  return (
    <div>
        <div className='justify-center'>
            <span>
                <img src={logo} alt='Healthease Logo'/>
                <p>HealthEase</p>
            </span>
        </div>

        <div className='px-[48px] py-[64px] bg-[#f3f8ff] '>

            <h1>
                Sign Up
            </h1>
            <p>
                Unlock a world of wellness and convenience by signing up with HealthEase. Together, we'll embark on a journey to a healthier, happier you.
            </p>
            
            <Tab tabData={tabData} />

            <form>
                
            </form>

        </div>
    </div>
  )
}

export default Signup