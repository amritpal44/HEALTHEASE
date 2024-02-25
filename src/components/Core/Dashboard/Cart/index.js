import { useSelector } from "react-redux"

import RenderTotalAmount from "./RenderTotalAmount"
import { ClipLoader } from "react-spinners"
import RenderCartMedicines from "./RenderCartMedicines"
import Navbar from "../../../Common/Navbar"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
//   const { paymentLoading } = useSelector((state) => state.medicine)

//   if (paymentLoading)
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <ClipLoader size={50} />
//       </div>
//     )

  return (
    <>
      {/* <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1> */}
      {/* <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p> */}
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartMedicines />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-red-500">
          Your cart is empty
        </p>
      )}
    </>
  )
}
