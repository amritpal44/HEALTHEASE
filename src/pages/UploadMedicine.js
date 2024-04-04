import React, { useEffect, useState } from 'react'
import Navbar from '../components/Common/Navbar'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../services/apiconnector';
import { medicineEndpoints } from '../services/apis';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const UploadMedicine = () => {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();
  const {token} = useSelector((state) => state.auth)
  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchCategories = async() => {
    setLoading(true);
    // const toastId = toast.loading("Loading...");
    try {
      const rawResponse = await apiConnector("GET", medicineEndpoints.SHOW_ALL_CATEGORY);
      const response = rawResponse.data;
      // console.log(response);
      if(response){
        setCategories(response.data);
      }
      // toast.success("")
    } catch (error) {
      console.log("Cannot fetch Categories");
      toast.error("Cannot fetch categories");
    };
    setLoading(false);
    // toast.dismiss(toastId);
  }

  useEffect( () => {
    fetchCategories()
  }, [])

  
  const onSubmit = async (data) => {
    console.log(data);
    
    const images = data.images;
    console.log("images: ", images);

    delete data.images;

    const formData = new FormData();
    formData.append("images", images[0]);

    formData.append("data", JSON.stringify(data));

    try {
      const response = await apiConnector("POST", medicineEndpoints.CREATE_MEDICINE, formData, {
        Authorization: `Bearer ${token}`
      })
      console.log(response);

      if(response?.data?.success == true){
        toast.success("Medicine Uploaded Successfully")
      }
    } catch (error) {
      console.log("error while creating medicine")
      console.log("error", error)
    }
  }

  return (
    <>
      {
        loading ? (
          <div className='flex justify-center h-[500px] w-full items-center'>
            <ClipLoader size={50} />
          </div>
        ) : (
          <div className='w-full h-full flex justify-center mt-12'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col font-clarity-city w-3/4'>
              {/* name */}
              <div className='flex flex-col'>
                <input
                  name='name' 
                  type='text' 
                  className='border border-black rounded-lg px-4 py-2'
                  placeholder='enter name of medicine' 
                  {...register("name", {required: true})}
                />
                { errors.name && <span className="text-red-700 text-sm">This field is required</span>}
              </div>

              {/* //description */}
              <div className='flex flex-col'>
                <input
                  name='description' 
                  type='text' 
                  className='border border-black rounded-lg px-4 py-2'
                  placeholder='enter description of medicine' 
                  {...register("description", {required: true})}
                />
                { errors.description && <span className="text-red-700 text-sm">This field is required</span>}
              </div>

              {/* category */}
              <div>
                <select name='category' className='border border-black rounded-lg px-4 py-2' placeholder='choose category' 
                  {...register("category", {required: true})}
                >
                  {
                    categories.map( (category, index) => (
                      <option key={index} value={categories?.name}>{category?.name}</option>
                    ))
                  }
                </select>
                { errors.category && <span className="text-red-700 text-sm">This field is required</span>}
              </div>
  
              {/* price */}
              <div className='flex flex-col'>
                <input
                  name='price' 
                  type='number' 
                  className='border border-black rounded-lg px-4 py-2'
                  placeholder='enter price of medicine' 
                  {...register("price", {required: true})}
                />
                { errors.price && <span className="text-red-700 text-sm">This field is required</span>}
              </div>

              {/* stock */}
              <div className='flex flex-col'>
                <input
                  name='stock' 
                  type='number' 
                  className='border border-black rounded-lg px-4 py-2'
                  placeholder='enter available stock of medicine' 
                  {...register("stock", {required: true})}
                />
                { errors.stock && <span className="text-red-700 text-sm">This field is required</span>}
              </div>

              {/* images */}
              <div>
                <input 
                  name='images'
                  type='file'
                  {...register("images" , {required: true})}
                />       
                { errors.images && <span className="text-red-700 text-sm">This field is required</span>}
              </div>
  
              <button
                disabled={loading}
                type="submit"
                className={`bg-[#3d65ff] rounded-lg text-slate-200 sm:rounded-lg font-bold text-xl sm:text-2xl  sm:px-[18px] py-[12px] sm:py-[17px] cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4
                  ${
                    loading ? 'opacity-30 cursor-not-allowed' : ''
                  }
                `}
              >
                Submit
              </button>
            </form>
          </div>
        )
      }
    </>
  )
}

export default UploadMedicine