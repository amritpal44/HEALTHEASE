import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../services/apiconnector';
import { medicineEndpoints } from '../services/apis';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const UploadMedicine = () => {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState();
  const [files, setFiles] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

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


  const handleFileChange = (e) => {
    setFiles(e.target.files);
  }
  
  
  const onSubmit = async (data) => {
    //console.log(data);
    
    //const images = data.images;
    //console.log("images: ", images);
    setImageLoading(true);
    
    const formData = new FormData();
    //files ki array banane se data req.files mae nahi ja raha, freq.body mae ja raha hae

    const images = files;
    for(var i = 0; i < images.length; i++){
      formData.append(`image${i}`, images[i]);
    }

    //delete data.images;

    data.imagesSize = images.length;

    formData.append("data", JSON.stringify(data));
    
    try {
      const response = await apiConnector("POST", medicineEndpoints.CREATE_MEDICINE, formData, {
        Authorization: `Bearer ${token}`
      })
      //console.log("response: ", response);

      if(response?.data?.success === true){
        toast.success("Medicine Uploaded Successfully")
      }

      setImageLoading(false);
    } catch (error) {
      console.log("error while creating medicine in frontend")
      console.log("error", error)
      toast.error("not able to create medicine");
      setImageLoading(false);
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
              <div className='flex flex-col'>
                <div>
                  <input 
                    name='images'
                    type='file'
                    multiple
                    required
                    onChange={handleFileChange}
                    //{...register("images" , {required: true})}
                  />       
                  { errors.images && <span className="text-red-700 text-sm">This field is required</span>}
                </div>
                <div className='flex flex-col'>
                  <h1>Preview</h1>
                  <div className='flex'>
                    {files && (() => {
                      const imageElements = [];
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        imageElements.push(
                          <div key={i} >
                            <img src={URL.createObjectURL(file)} className='object-contain w-32 h-32' alt='Preview'/>
                          </div>
                        );
                      }
                      return imageElements;
                    })()}
                  </div>

                </div>
              </div>
  
              <button
                disabled={imageLoading}
                type="submit"
                className={`bg-[#3d65ff] rounded-lg text-slate-200 sm:rounded-lg font-bold text-xl sm:text-2xl  sm:px-[18px] py-[12px] sm:py-[17px] cursor-pointer hover:-translate-y-1 ease-linear duration-200 mt-4
                  ${
                    imageLoading ? 'opacity-60 cursor-not-allowed' : ''
                  }
                `}
              >
                {
                  !imageLoading && (
                    <p>Submit</p>
                  )
                }
                {
                  imageLoading && (
                    <p>Loading...</p>
                  )
                }
              </button>
            </form>
          </div>
        )
      }
    </>
  )
}

export default UploadMedicine