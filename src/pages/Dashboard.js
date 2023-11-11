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
    <div className='flex w-screen h-screen'>
        <Sidebar/>
        <div>
            <Outlet/>
        </div>

    </div>
  )
}

export default Dashboard