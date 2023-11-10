import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';

const DoctorCard = ( {doctor} ) => {

    const [avgRating, setAverageRating] = useState(0);

    useEffect( () => {
        const count = GetAvgRating(doctor.ratingAndReview);
        setAverageRating(count);
    }, [])


  return (
    <div>
        <Link to={`/doctor/book-appointment/${doctor._id}`}>
        <div className='flex gap-2'>
            <p>
                {doctor.user.firstName}
            </p>
            <p>
                {doctor.user.lastName}
            </p>
            <p>
                {avgRating}
            </p>
        </div>
        </Link>
    </div>
  )
}

export default DoctorCard