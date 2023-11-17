import React from 'react';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';

const DoctorCard = ({ doctor, count }) => {
  const avgRating = count;

  return (
    <div>
      <Link to={`/doctor/book-appointment/${doctor._id}`}>
        <div className='flex flex-col items-center border p-4 py-6 rounded-md shadow-md bg-[#f3f8ff] min-w-[230px]'>
          <img
            src={doctor.user.image ? doctor.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${doctor.user.firstName} ${doctor.user.lastName}`}
            alt={`${doctor.user.firstName} ${doctor.user.lastName}`}
            className='w-20 h-20 rounded-full mb-2 object-cover'
          />
          <p className='text-lg font-bold'>
            {doctor.user.firstName} {doctor.user.lastName}
          </p>
          <p className='text-sm '>{doctor.specialization}</p>
          <p className='text-sm '>{doctor.about}</p>
          <p className='text-sm '>Fee: {doctor.fee}/-</p>
          <p className='text-sm '>Average Rating: {avgRating}</p>
        </div>
      </Link>
    </div>
  );
};

export default DoctorCard;
