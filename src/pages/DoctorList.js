import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector'
import { doctorendpoints } from '../services/apis'
import { ClipLoader } from 'react-spinners';
import DoctorCard from '../components/Core/Doctor/DoctorCard';
import Navbar from '../components/Common/Navbar';
import GetAvgRating from '../utils/avgRating';

const DoctorList = () => {

    const [loading, setLoading] = useState(true);
    const [doctorsDetail, setDoctorsDetail] = useState();

    const fetchAllDoctorDetail = async (req, res) => {
        
        try {
            setLoading(true);
            const result = await apiConnector("GET", doctorendpoints.GET_ALL_DOCTOR_DETAIL_API);
            // console.log("result: ", result)
            setDoctorsDetail(result.data.data);
            setLoading(false);
            
        } catch (error) {
            console.log("Cannot fetch doctors detail");
            console.log("error: ", error);
        }
    }

    useEffect( () => {
        fetchAllDoctorDetail();
    }, [])


  return (
    <div className='flex flex-col'>
        <div className='flex gap-10 mt-16 justify-center'>
            {
                loading ? (
                    <div className=' flex flex-wrap justify-center h-full w-full items-center max-w-[1000px]'>
                        <ClipLoader size={50} />
                    </div> 
                ):doctorsDetail ? (
                    <div className='flex gap-10 flex-wrap max-w-[1000px]'>
                        {
                            doctorsDetail.map((doctor, index) => (
                                <div key={index}>
                                    <DoctorCard doctor={doctor} count={GetAvgRating(doctor.ratingAndReview)}/>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                <div>No doctors data available.</div>
                )
            }
        </div>
    </div>
  )
}

export default DoctorList