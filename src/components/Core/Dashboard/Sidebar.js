import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
// import { ClipLoader } from 'react-spinners'

import { VscSignOut } from "react-icons/vsc"
import { logout } from '../../../services/operations/authAPI'

import {FaBars} from "react-icons/fa"

const Sidebar = () => {

    // const [loading, setLoading] = useState(true);

    const {loading, user} = useSelector((state) => state.profile);

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const fetchUser = async() => {

    //     setLoading(true)
    //     const data = await JSON.parse(localStorage.getItem("user"))
    //     setUser(data);
    //     setLoading(false);
    // }

    // useEffect( () => {
    //     fetchUser();
    // }, [])

    const sideBarHandler = () => {
        if(isOpen){
            setIsOpen(false);
        }
        else{
            setIsOpen(true);
        }
    }


  return (

    loading ? (
        <div>
            {/* <ClipLoader size={50} /> */}
        </div>
    ) : (
        <div className={`flex flex-col ${isOpen ? "min-w-[200px]" : "min-w-[40px]"} transition-all duration-200 border-r-[1px] border-r-slate-700 pt-10 p-1 sm:p-2 sm:pt-10 text-slate-200 h-full backdrop-blur-md bg-transparent`}>

            <div onClick={() => sideBarHandler()} className={` ${isOpen ? "text-yellow-600" : "text-white"} pl-2 mb-3 `}>
                <FaBars/>
            </div>
            <div className='flex flex-col gap-2'>

                {
                    sidebarLinks.map( (link, index) => {
                        if(link.type && user.accountType !== link.type) return null;
                        return(
                            <SidebarLink link={link} iconName={link.icon} key={link.id} isOpen={isOpen}/>
                        )
                    })
                }

            </div>

            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-slate-700" />

            <div className='flex flex-col gap-[6px]'>
                <SidebarLink link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear" isOpen={isOpen} />
                <div onClick={() => { dispatch(logout(navigate)) }} className="flex w-full items-center font-medium text-l  gap-x-2 py-[8px] px-2  hover:bg-red-900 hover:text-slate-50 rounded-md cursor-pointer">
                    <VscSignOut className="text-lg" />
                    {
                        isOpen && (
                            <p>Logout</p>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
  )
}

export default Sidebar