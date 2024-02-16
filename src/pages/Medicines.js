import React from 'react'
import { useState } from 'react'
import { apiConnector } from '../services/apiconnector';
import { medicineEndpoints } from '../services/apis';
import { useEffect } from 'react';

import {ClipLoader} from 'react-spinners'
import MedicineCard from '../components/Core/Medicine/MedicineCard';
import Navbar from '../components/Common/Navbar';

const Medicines = () => {

  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState(null);

  const fetchMedicineData = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", medicineEndpoints.GET_ALL_MEDICINES);

      // console.log(response.data.data)

      setMedicines(response.data.data)

    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchMedicineData();
  }, [])

  return (
    <div >
      <div className='mt-10 '>
        {
          loading ? (<div className='w-screen flex h-[555px] justify-center items-center'>
            <ClipLoader size={50} />
          </div>) : (
            <div >
              {
                medicines.map((medicine) => (
                  <MedicineCard key={medicine._id} medicine={medicine} />
                ))
              }            
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Medicines