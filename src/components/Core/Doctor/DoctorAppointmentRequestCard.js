import React, { useState } from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { bookingEndpoints } from '../../../services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../slices/profileSlice';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const DoctorAppointmentRequestCard = ({ appointment, onAccept, onReject }) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {user} = useSelector( (state) => state.profile);

  const handleAccept = async () => {
    setLoading(true);
    try {
      // Make API call to update appointment status to "accepted"
      
      await apiConnector("PUT", `${bookingEndpoints.UPDATE_APPOINTMENT_STATUS}/${appointment._id}`, { status: 'accepted' });
      const updatedCount = user.appointmentCount - 1;
      dispatch(setUser({...user, appointmentCount: updatedCount}))//updating user state to update navbar

      toast.success("Appointment Accepted Successfully")

      onAccept();
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
    setLoading(false);
  };

  const handleReject = async () => {
    try {
      setLoading(true);
      // Make API call to delete the appointment
      await apiConnector("DELETE", `${bookingEndpoints.DELETE_APPOINTMENT}/${appointment._id}`);
      const updatedCount = user.appointmentCount - 1;
      dispatch(setUser({...user, appointmentCount: updatedCount})) //updating user state to update navbar
      toast.success("Appointment Rejected Successfully")
      onReject();
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center border p-4 py-6 rounded-md shadow-md bg-[#f3f8ff] min-h-[200px] min-w-[200px]'>
      {
        loading ? (
          <div>
            <ClipLoader size={50}/>
          </div>
        ):(

        <div >
          <p><span className='font-bold '> Date:  </span>  {appointment.date}</p>
          <p><span className='font-bold '>Time:  </span>  {appointment.time}</p>
          <p><span className='font-bold '>Status:  </span>   {appointment.status}</p>
          <div className='mt-4 flex gap-2'>
            <button onClick={handleAccept} className='bg-[#3d65ff] rounded-md px-[28px] py-[8px] cursor-pointer hover:-translate-y-1 ease-linear duration-200'>Accept</button>
            <button onClick={handleReject} className="flex w-full border-2 border-black items-center justify-center font-medium text-l  gap-x-2 py-[8px] px-[28px]  hover:bg-red-700 hover:text-slate-50 rounded-md cursor-pointer">Reject</button>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default DoctorAppointmentRequestCard;
