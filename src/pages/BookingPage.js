import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector'
import { doctorendpoints} from '../services/apis'
import Navbar from '../components/Common/Navbar';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const BookingPage = () => {

    const [loading, setLoading] = useState(true);
    const [doctorDetail, setDoctorDetail] = useState(null);



    const params = useParams();

    const fetchDoctorDetail = async() => {

        const doctorId = params.doctorId;      
        
        setLoading(true);
        try {
          const response = await apiConnector("POST", doctorendpoints.GET_ONE_DOCTOR_DETAIL_API, {
            doctorId
          })

          if(response){
              setDoctorDetail(response.data);
          }
          
        } catch (error) {
            console.log("Cannot fetch doctor detail");
            console.log("error: ", error);
        }
        setLoading(false);
    }

    useEffect( () => {
        fetchDoctorDetail()
    }, [])
    

  return (
    <div className='flex flex-col'>
        <Navbar/>
        {
            loading ? 
            (  
                <div className=' flex justify-center h-[500px] w-full items-center'>
                    <ClipLoader size={50} />
                </div> 
            ) : (
                <div>
                    <div>
                        <h1>{doctorDetail.data.user.firstName} {doctorDetail.data.user.lastName}</h1>  
                    </div>
                </div>
            )
        }
    
    </div>
  )
}

export default BookingPage