import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
    <div className='flex justify-center'>
        <div className='w-[600px] mt-6'>
            <h1 className="mb-14 text-3xl font-medium ">
                My Profile
            </h1>

            <div className="flex items-center justify-between rounded-md border-[1px] border-slate-700 bg-[#f3f8ff] p-8 px-12">
                <div className="flex items-center gap-x-4">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover"
                    />
                    <div className="space-y-1">
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

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-slate-700 bg-[#f3f8ff]  p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold">About</p>
                    <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }} >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <p className={`${ user?.additionalDetails?.about ? "" : "text-slate-400" } text-sm font-medium`} >
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                </p>
            </div>

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-slate-700 bg-[#f3f8ff] p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold ">
                        Personal Details
                    </p>
                    <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }} >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>

                <div className="flex max-w-[900px] justify-between">
                    <div className="flex flex-col gap-y-5">
                        <div>
                        <p className="mb-2 text-sm text-slate-600">First Name</p>
                        <p className="text-l font-medium ">
                            {user?.firstName}
                        </p>
                        </div>
                        <div>
                        <p className="mb-2 text-sm text-slate-600">Email</p>
                        <p className="text-l font-medium ">
                            {user?.email}
                        </p>
                        </div>
                        <div>
                        <p className="mb-2 text-l text-slate-600">Gender</p>
                        <p className="text-sm font-medium ">
                            {user?.additionalDetails?.gender ?? "Add Gender"}
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-l text-slate-600">Last Name</p>
                            <p className="text-sm font-medium ">
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-l text-slate-600">Phone Number</p>
                            <p className="text-sm font-medium ">
                                {user?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-l text-slate-600">Date Of Birth</p>
                            <p className="text-sm font-medium ">
                                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                                "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MyProfile