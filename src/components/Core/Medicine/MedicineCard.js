import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../slices/cartSlice';
import { BuyMedicine } from '../../../services/operations/medicineAPI';
import { useNavigate } from 'react-router-dom';

const MedicineCard = ({ medicine }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % medicine.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? medicine.images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    if(!user){
      navigate("/login");
      return alert("Need to Login First");
    }
    dispatch(addToCart(medicine))
  }

  const handleBuyMedicine = () => {
    BuyMedicine(token, [medicine._id], user, navigate, dispatch);
  };

  return (
    <div className='max-w-[90%] mx-auto rounded overflow-hidden shadow-lg my-8 sm:flex-col'>
     <div className='flex flex-col sm:flex-row items-center'>
      <img
        src={medicine.images[currentImageIndex]}
        alt={medicine.name}
        className='object-contain w-full sm:w-1/2 h-44 bg-transparent mb-4 sm:mb-0'
      />
       <div className='w-full sm:w-1/2 px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{medicine.name}</div>
        <p className='text-gray-700 text-base'>{medicine.description}</p>
        <p className='text-gray-700 text-base'>
          <strong >Price:</strong> ₹{medicine.price}
        </p>
        <p className='text-gray-700 text-base'>
          <strong>Stock:</strong> {medicine.stock}
        </p>
        <div className='mt-4'>
          <p className='text-sm'>
            <strong>Category:</strong> {medicine.category[0].name}
          </p>
          <p className='text-sm'>
            <strong>Vendor:</strong> {medicine.vendor[0].user.firstName} {medicine.vendor[0].user.lastName}
          </p>
        </div>
        {medicine.images.length > 1 && (
          <div className='flex flex-col sm:flex-row mt-4'>
            <button
              onClick={handlePrevImage}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mr-2'
            >
              Previous
            </button>
            <button
              onClick={handleNextImage}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Next
            </button>
          </div>
        )}
  
        <div className='flex flex-col sm:flex-row gap-2 md:gap-5 mt-3'>
          <button onClick={handleAddToCart} className='bg-[#3d65ff] text-slate-200 font-semibold text-lg rounded px-7 
          py-1 cursor-pointer hover:-translate-y-1 ease-linear duration-200 m-1 '>Add to Cart</button>
          <button className='text-lg cursor-pointer hover:-translate-y-1 hover:text-slate-950 ease-linear duration-200
           bg-yellow-500 font-semibold m-1 py-1 md:py-2 px-7 md:px-8 rounded'>Buy Now</button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default MedicineCard;
