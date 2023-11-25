import React, { useEffect, useState } from 'react';
import { apiConnector } from '../services/apiconnector';
import { bookingEndpoints, doctorendpoints } from '../services/apis';
import Navbar from '../components/Common/Navbar';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const moment = require('moment');

const BookingPage = () => {
  const [loading, setLoading] = useState(true);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const params = useParams();

  var doctorUserId;
  var image;

  if (doctorDetail) {
    doctorUserId = doctorDetail.data.user._id;
  }

  const fetchDoctorDetail = async () => {
    const doctorId = params.doctorId;
    setLoading(true);
    try {
      const response = await apiConnector("POST", doctorendpoints.GET_ONE_DOCTOR_DETAIL_API, {
        doctorId
      });
      if (response) {
        setDoctorDetail(response.data);
        image = response.data.data.user?.image[0]
      }
    } catch (error) {
      console.log("Cannot fetch doctor detail");
      console.log("error: ", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDoctorDetail();
  }, [])

  const handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.name === 'date'
        ? moment(event.target.value, 'YYYY-MM-DD').format('DD/MM/YY')
        : event.target.name === 'time'
          ? moment(event.target.value, 'HH:mm').format('HH:mm')
          : event.target.value
    }));
  }
  

  const handleBooking = async () => {
    try {
      if (!formData.date || !formData.time) {
        return alert("Date & Time Required");
      }
      setLoading(true);

      const bodyData = {
        doctorUserId: doctorUserId,
        date: formData.date,
        time: formData.time,
      }

      const res = await apiConnector("POST", bookingEndpoints.BOOK_APPOINTMENT_REQUEST, bodyData);

      setLoading(false);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col'>
      <Navbar />
      {loading ? (
        <div className='flex justify-center h-[500px] w-full items-center'>
          <ClipLoader size={50} />
        </div>
      ) : (
        <div className="flex min-w-[500px] justify-center mt-16">
          <div className='flex flex-col items-center border p-4 py-6 rounded-[2rem] shadow-md bg-[#f3f8ff] min-w-[600px]'>

            <img src={image}/>
            <h1 className='text-3xl'>Booking Page</h1>
            <h4 className='mt-10 text-lg '>
              Dr.{doctorDetail.data.user.firstName} {doctorDetail.data.user.lastName}
            </h4>
            <h4 className='text-lg'>
              Fees : {doctorDetail.data.fee}
            </h4>
            {/* <h4>
              Timings : {doctorDetail?.timings && doctorDetail?.timings[0]} -{" "}
              {doctorDetail?.timings && doctorDetail?.timings[1]}{" "}
            </h4> */}
            <form onSubmit={handleBooking} className="flex flex-col w-60 ">
              <label>
                <p className='text-lg font-bold'>Date</p>
                <input
                  type='date'
                  name='date'
                  value={moment(formData.date, 'DD/MM/YY').format('YYYY-MM-DD')}
                  onChange={handleOnChange}
                  className='px-10 py-2 rounded-full shadow-md w-full'
                />
              </label>
              <label>
                <p className='text-lg font-bold mt-4'>Time</p>
                <input
                  type='time'
                  name='time'
                  value={formData.time}
                  onChange={handleOnChange}
                  className=' px-10 py-2 rounded-full shadow-md w-full'
                />
              </label>

              <button type='submit' className='bg-[#3d65ff] text-lg text-slate-200 font-bold mt-6 rounded-full px-[38px] py-[15px] cursor-pointer hover:-translate-y-1 ease-linear duration-200'>
                Book Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingPage;
