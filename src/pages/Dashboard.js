import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Sidebar from '../components/Core/Dashboard/Sidebar'
import Navbar from '../components/Common/Navbar'

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth)
    const {loading: profileLoading} = useSelector( (state) => state.profile)

    if(profileLoading || authLoading){
        return (
            <div>
                <ClipLoader size={50}/>
            </div>
        )
    }


  return (

    
    <div className='flex w-full h-full bg-[#0d192b] relative overflow-y-scroll '>
      
      <div className='h-full z-20 absolute '>
        <Sidebar />
      </div>

      <div className='flex justify-center w-full h-full ml-[38px] md:ml-[200px] '>
        <Outlet />
      </div>

    </div>

    
    // <div className="relative flex min-h-[calc(100vh-3.5rem)]">
    //   <Sidebar />
    //   <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
    //     <div className="mx-auto w-11/12 max-w-[1000px] py-10">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
  )
}

export default Dashboard