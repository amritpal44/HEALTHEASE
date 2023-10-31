import React, { useState ,useEffect } from 'react'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';

const Category = () => {

    const [category, setCategory] = useState([]);

    const fetchCategories = async() => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("result from categories api: ", result);
            console.log("result.data.data", result.data.data);
            setCategory(result.data.data);
        } catch (error) {
            console.log("Cannot fetch categories");
            console.log("error: ", error);
        }
    }

    useEffect( () => {

        fetchCategories();

    }, [])


  return (
    <div>
        category
    </div>
  )
}

export default Category