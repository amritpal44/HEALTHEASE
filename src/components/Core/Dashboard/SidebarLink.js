import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName, isOpen}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

  return (
    <div>
        <NavLink to={link.path}>
            {/* <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-white ${matchRoute(link.path)? "opacity-100" : "opacity-0"}`}>

            </span> */}
            <div className={` flex items-center gap-x-2 ${matchRoute(link.path) ? "bg-[#3970ae]" : ""}  font-medium rounded-md py-1 pl-2` }>
                <Icon className="text-lg"/>
                {
                    isOpen && (
                        <span>{link.name}</span>
                    )
                }
            </div>

        </NavLink>
    </div>
  )
}

export default SidebarLink