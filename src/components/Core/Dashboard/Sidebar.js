import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { ClipLoader } from 'react-spinners'

import { VscSignOut } from "react-icons/vsc"
import { logout } from '../../../services/operations/authAPI'

const Sidebar = () => {

    // const [loading, setLoading] = useState(true);

    const {loading, user} = useSelector((state) => state.profile);

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


  return (

    loading ? (
        <div>
            {/* <ClipLoader size={50} /> */}
        </div>
    ) : (
        <div className='flex flex-col min-w-[200px] border-r-[1px] border-r-slate-700 py-10'>

            <div className='flex flex-col gap-2'>

                {
                    sidebarLinks.map( (link, index) => {
                        if(link.type && user.accountType !== link.type) return null;
                        return(
                            <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                        )
                    })
                }

            </div>

            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-slate-700" />

            <div className='flex flex-col gap-[6px]'>
                <SidebarLink link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear" />
                <div onClick={() => { dispatch(logout(navigate)) }} className="flex w-full items-center font-medium text-l  gap-x-2 py-[8px] px-2  hover:bg-red-700 hover:text-slate-50 rounded-md cursor-pointer">
                    <VscSignOut className="text-lg" />
                    Logout
                </div>
            </div>
        </div>
    )
  )
}

export default Sidebar