import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector'
import { doctorendpoints } from '../services/apis'
import { ClipLoader } from 'react-spinners';
import DoctorCard from '../components/Core/Doctor/DoctorCard';
import Navbar from '../components/Common/Navbar';

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
    <div>
        {/* <Navbar/> */}
        {
            loading ? (
                <div className=' flex justify-center h-full w-full items-center'>
                    <ClipLoader size={50} />
                </div> 
            ):doctorsDetail ? (
                doctorsDetail.map((doctor, index) => (
                    <div key={index}>
                        <DoctorCard doctor={doctor}/>
                    </div>
                ))
            ) : (
            <div>No doctors data available.</div>
            )
        }
    </div>
  )
}

export default DoctorList