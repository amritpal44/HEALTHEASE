import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BuyMedicine } from "../../../../services/operations/medicineAPI";
import IconBtn from "../../../Common/IconBtn";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyMedicine = () => {
    const medicines = cart.map((medicine) => medicine._id);
    BuyMedicine(token, medicines, user, navigate, dispatch);
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-gray-300 bg-[#c4d7ff] p-6">
      <p className="mb-1 text-md font-medium ">Total:</p>
      <p className="mb-6 text-3xl font-medium">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyMedicine}
        customClasses="w-full font-lg justify-center bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded"
      />
    </div>
  );
}
