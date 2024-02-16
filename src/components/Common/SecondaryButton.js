import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryButton = ({children, linkto}) => {
  return (

    <Link to={linkto}>

        <div className='bg-transparent font-medium rounded-full border border-slate-200 px-[30px] py-[15px] text-center md:px-[38px] md:py-[20px] cursor-pointer hover:-translate-y-1 hover:bg-slate-200 hover:text-slate-950 ease-linear duration-200'>
        
            {children}
        
        </div>

    </Link>
  )
}

export default SecondaryButton