import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector'
import { bookingEndpoints } from '../services/apis'
import Navbar from '../components/Common/Navbar';
import { ClipLoader } from 'react-spinners';
import DoctorAppointmentRequestCard from '../components/Core/Doctor/DoctorAppointmentRequestCard';

const Notification = () => {

  const [appointmentList, setAppointmentList] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAppointmentData = async(req, res) => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", bookingEndpoints.GET_ALL_APPOINTMENT_REQUEST);

      if(response){
        setAppointmentList(response.data.data);
        // console.log(response.data.data);
      }
      else{
        console.log("didn't get appointmetn list");
      }

      setLoading(false);

    } catch (error) {
      console.log("Cannot fetch appointment List");
      console.log("error: ", error);
      setLoading(false);
    }
  }

  useEffect( () => {
    fetchAppointmentData();
  }, [])


  return (
    <div className='flex flex-col'>
      <Navbar/>

      <div className='flex gap-10 mt-16 justify-center'>
        { loading ? (
          <div className=' flex flex-wrap justify-center h-full w-full items-center max-w-[1000px]'>
            <ClipLoader size={50}/>
          </div>
        ) : (
          <div className='flex gap-10 flex-wrap max-w-[1000px]'>
            {
              appointmentList.map( (appointment, index) => (
                <div key={index}>
                  <DoctorAppointmentRequestCard 
                    appointment={appointment} 
                    onAccept={() => fetchAppointmentData()} // Refresh the list after accepting
                    onReject={() => fetchAppointmentData()} 
                  />
                </div>
              ))
            }
          </div>
        )}

      </div>
    </div>
  )
}

export default Notification