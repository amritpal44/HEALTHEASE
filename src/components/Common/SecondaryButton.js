import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryButton = ({children, linkto}) => {
  return (

    <Link to={linkto}>

        <div className='bg-transparent m-3 font-medium rounded-full border text-center border-slate-200 
        px-[15px] sm:px-[38px] py-2 sm:py-4 cursor-pointer hover:-translate-y-1
         hover:bg-slate-200 hover:text-slate-950 ease-linear duration-200'>
        
            {children}
        
        </div>

    </Link>
  )
}

export default SecondaryButton