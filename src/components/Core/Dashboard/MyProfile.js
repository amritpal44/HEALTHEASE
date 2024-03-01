import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import IconBtn from "../../Common/IconBtn"
import { RiEditBoxLine } from "react-icons/ri"
import { formattedDate } from '../../../utils/dateFormatter';

const MyProfile = () => {

    // const [loading, setLoading] = useState(true);
    
    const userDetail = useSelector( (state) => state.profile);
    const user = userDetail.user;

    // const dispatch = useDispatch();
    const navigate = useNavigate();


  return (
    
    <div className='mx-3 md:w-[550px] lg:w-[650px] mt-6 z-10 sm:mx-auto'>

        {/* gradient vala background kam nahi kara */}
        {/* <div class="bg-gradient-to-t absolute from-[#0d192b] from-0% via-[#091a5b] via-30% to-[#0d192b] to-70%  w-[1900px] h-[400px] z-10  rotate-[30deg] translate-x-[10%] -translate-y-36 opacity-50" ></div> */}

        
        <h1 className="mb-14 text-blue-500 font-clarity-city font-bold text-3xl">
            {"MY  PROFILE"}
        </h1>

        {/* USER PHOTO */}
        <div className="flex items-center justify-between rounded-md border-[1px] border-slate-700 bg-transparent p-4 sm:p-8 sm:px-12">
            <div className="flex flex-col justify-center sm:flex-row items-center gap-4 text-slate-200">
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[60px] sm:w-[78px] rounded-full object-cover"
                />
                <div className="space-y-1 ">
                    <p className="text-lg font-semibold">
                    {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="text-sm">{user?.email}</p>
                </div>
            </div>
            <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }} >
                <RiEditBoxLine />
            </IconBtn>
        </div>

        {/* ABOUT SECTION */}
        <div className="my-10 flex flex-col  sm:gap-10 rounded-md border-[1px] border-slate-700 bg-transparent p-4  sm:p-8 sm:px-12">
            <div className="flex w-full items-center justify-between">
                <p className="text-xl font-semibold text-blue-500 font-clarity-city">ABOUT</p>
                <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }} >
                    <RiEditBoxLine />
                </IconBtn>
            </div>
            <p className={`${ user?.about ? "" : "text-slate-500" } text-sm font-medium text-slate-300`} >
                {user?.about ?? "Write Something About Yourself"}
            </p>
        </div>

        {/* PERSONAL DETAIL */}
        <div className="my-10 flex flex-col justify-between gap-y-10 rounded-md border-[1px] border-slate-700 bg-transparent  p-8  lg:px-12">
            <div className="flex w-full items-center justify-between pr-3">
                <p className="text-lg font-semibold text-blue-500 font-clarity-city">
                    PERSONAL DETAIL
                </p>
                <div className=' translate-x-6 sm:translate-x-0'>
                    <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }}>
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row max-w-[900px] justify-between w-full">
                <div className="flex flex-col gap-y-5 w-full sm:w-[45%]">
                    <div>
                        <p className="mb-2 text-sm text-slate-300 font-semibold">First Name</p>
                        <p className="text-md font-semibold text-slate-200">
                            {user?.firstName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm text-slate-300 font-semibold">Email</p>
                        <p className="text-md font-medium text-slate-200">
                            {user?.email}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-l text-slate-300 font-semibold">Gender</p>
                        <p className="text-md font-medium text-slate-200">
                            {user?.gender ?? "Add Gender"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-l text-slate-300 font-semibold">Pin Code</p>
                        <p className="text-md font-medium text-slate-200">
                            {user?.pincode ?? "Add Pin Code"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5 w-full sm:w-[45%]">
                    <div>
                        <p className="mb-2 text-l text-slate-300 font-semibold">Last Name</p>
                        <p className="text-md font-medium text-slate-200">
                            {user?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-l text-slate-300 font-semibold">Phone Number</p>
                        <p className="text-md font-medium text-slate-200">
                            {user?.contactNumber ?? "Add Contact Number"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-l text-slate-300 font-semibold">Date Of Birth</p>
                        <p className="text-md font-medium text-slate-200">
                            {formattedDate(user?.dateOfBirth) ??
                            "Add Date Of Birth"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-l text-slate-300 font-semibold">Address</p>
                        <p className="text-md font-medium text-slate-200">
                            {user?.address ?? "Add Address"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default MyProfile