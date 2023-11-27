import React from 'react'
import logo from "../../assests/logo/healthease.png"
import { Link, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'

import { ACCOUNT_TYPE } from '../../utils/constants'

import {AiOutlineShoppingCart} from "react-icons/ai"
import { FaBell } from "react-icons/fa";

import ProfileDropdown from '../Core/Auth/ProfileDropdown'
import { ScrollLink } from 'react-scroll'

const Navbar = () => {

  //fetching slice data using useSelector hook
  const {token} = useSelector( (state) => state.auth );
  const {user} = useSelector( (state) => state.profile );
  const {totalItems} = useSelector( (state) => state.cart );

  const location = useLocation();


  return (
    <div id='#navbar' className='w-screen bg-black font-clarity-city flex justify-evenly p-3'>
      
      <Link to={"/"}>
        <div className='flex items-center text-slate-200 text-5xl gap-1'>
          <img src={logo} alt='healthease logo' width={40}/>
          <h1>ealthEase</h1>
        </div>
      </Link>


      {/* LINKS */}
      <div className='flex gap-8 text-slate-200 text-xl items-center'> 
        {/* {
          NavbarLinks.map( (link, index) => (
              <Link to={link?.path} key={index}>
                <div> <a href={link?.scrollto}> {link?.title} </a></div>
              </Link>
            )
          )
        } */}

        {
          location.pathname === "/" ? (
            NavbarLinks.map( (link, index) => (
                
                  <div key={index}>
                    <a href={link?.scrollto}>
                      {link?.title} 
                    </a>
                  </div>
                
              )
            )
          ) : (
            NavbarLinks.map( (link, index) => (
                <Link to={link?.path} key={index}>
                  <div> {link?.title} </div>
                </Link>
              )
            )
          )
        }


        {
          user && user?.accountType === ACCOUNT_TYPE.PATIENT && (
            <Link to={"/cart"} className='relative'>
              <AiOutlineShoppingCart />
              {
                totalItems >= 0 && (
                  <span className='absolute -translate-y-9 translate-x-5'>
                    {totalItems}
                  </span>
                )
              }
            </Link>
          )
        }

        {
          user && user?.accountType === ACCOUNT_TYPE.DOCTOR && (
            <Link to={"/appointment-request"} className='relative text-yellow-400'>
              <FaBell />
              {
                user.appointmentCount > 0 && (
                  <span className='absolute -translate-y-9 translate-x-5 text-sm text-white '>
                    {user.appointmentCount}
                  </span>
                )
              }
            </Link>
          )
        }
      </div>

      <div className='flex gap-4'>
      
        {token === null && (
          <Link to="/login">
            <button className=" bg-[#3d65ff] text-slate-200 text-lg font-medium rounded-full px-[22px] py-[7px] text-richblack-100 hover:-translate-y-[2px] ease-linear duration-200">
              Log in
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button className="bg-transparent font-medium  text-slate-200 border border-slate-200 rounded-full px-[22px] py-[7px] cursor-pointer hover:-translate-y-[2px] hover:bg-slate-200 hover:text-slate-950 ease-linear duration-200">
              Sign up
            </button>
          </Link>
        )}
        {token !== null && (
          <ProfileDropdown/>
        )}
      </div>
    </div>
  )
}

export default Navbar