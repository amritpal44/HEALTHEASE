import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import Sidebar from '../components/Core/Dashboard/Sidebar'

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
    <div className='flex w-screen'>
      
        <Sidebar />

        <div className='justify-center w-[80%]'>
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