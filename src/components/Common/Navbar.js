import React from 'react'
import logo from "../../assests/logo/healthease.png"
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'

const Navbar = () => {

  //fetching slice data using useSelector hook
  const {token} = useSelector( (state) => state.auth );
  const {user} = useSelector( (state) => state.profile );
  const {totalItems} = useSelector( (state) => state.totalItems );



  return (
    <div className='w-full bg-transparent font-clarity-city flex justify-evenly mt-3'>
      
      <Link to={"/"}>
        <div className='flex items-center text-slate-200 text-5xl gap-1'>
          <img src={logo} alt='healthease logo' width={40}/>
          <h1>ealthEase</h1>
        </div>
      </Link>

      <div className='flex gap-8 text-slate-200 text-xl items-center'> 
        {
          NavbarLinks.map( (link, index) => (
              <Link to={link?.path} key={index}>
                <div> {link?.title} </div>
              </Link>
            )
          )
        }

        <Link to={"/cart"}>
          Cart
        </Link>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Navbar