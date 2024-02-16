import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryButton = ({children, linkto}) => {
  return (

    <Link to={linkto}>

        <div className='bg-[#3d65ff] m-3 rounded-full text-center  px-[15px] sm:px-7 py-3 sm:py-4 
        cursor-pointer hover:-translate-y-1 ease-linear duration-200'>
           
            {children}
            
        </div>

    </Link>
  )
}

export default PrimaryButton