import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import {removeFromCart} from "../../../../slices/cartSlice"

export default function RenderCartMedicines() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col mt-3">
      {cart.map((medicine, indx) => (
        <div
          key={medicine._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={medicine?.images[0]}
              alt={medicine?.name}
              className="h-[148px] w-[220px] rounded-lg object-contain "
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {medicine?.name}
              </p>
              <p className="text-sm text-richblack-300">
                {medicine?.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">4.5</span>
                <ReactStars
                  count={5}
                  value={medicine?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">
                  {medicine?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(medicine._id))}
              className="flex items-center gap-x-1 font-bold rounded  py-[7px] px-[12px] border-2 hover:text-red-600 bg-red-600 text-slate-200 hover:border-black hover:border-2 hover:bg-white"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium">
              ₹ {medicine?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
