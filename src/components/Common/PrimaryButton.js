import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryButton = ({children, linkto}) => {
  return (

    <Link to={linkto}>

        <div className='bg-[#3d65ff] rounded-full px-[38px] py-[20px] cursor-pointer hover:-translate-y-1 ease-linear duration-200'>
           
            {children}
            
        </div>

    </Link>
  )
}

export default PrimaryButton