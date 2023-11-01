import React, { useState ,useEffect } from 'react'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { ClipLoader } from 'react-spinners';

const Category = () => {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true); //adding a loader is neccesary as it stops rendering of divs until data is fetched

    const fetchCategories = async() => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("result from categories api: ", result);
            console.log("result.data.data", result.data.data);
            setCategory(result.data.data);
        } catch (error) {
            console.log("Cannot fetch categories");
            console.log("error: ", error);
        }
        setLoading(false);
    }

    useEffect( () => {

        fetchCategories();

    }, [])
   
  return (
    <div>
        {
            loading ? (
                <div className=' flex justify-center h-full w-full items-center'>
                    <ClipLoader size={50} />
                </div>                    
            ):(
                <img src={category[0].medicines[0].images[0]} alt=''/>
            )
        }
    </div>
  )
}

export default Category