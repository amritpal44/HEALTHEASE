import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../Common/IconBtn"
import { updateProfile } from "../../../../services/operations/settingsAPI"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]


export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div >
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-slate-700 bg-[#f3f8ff] p-8 px-12">
          <h2 className="text-lg font-semibold">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>


          <div className="flex flex-col gap-5 lg:flex-row">
            {/* pincode */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="pincode" className="lable-style">
                Pin Code
              </label>
              <input
                type="number"
                name="pincode"
                id="pincode"
                placeholder="Enter Pin Code"
                className="form-style"
                {...register("pincode", { required: true })}
                defaultValue={user?.pincode}
              />
              {errors.pincode && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Pin Code.
                </span>
              )}
            </div>


            {/* address */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="address" className="lable-style">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your full Address"
                className="form-style"
                {...register("address", { required: true })}
                defaultValue={user?.address}
              />
              {errors.address && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Address.
                </span>
              )}
            </div>
          </div>

          {
            user.accountType === "Doctor" ? (
              <div>

                <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="fee" className="lable-style">
                      Fee
                    </label>
                    <input
                      type="Number"
                      name="fee"
                      id="fee"
                      placeholder="Enter Fee"
                      className="form-style"
                      {...register("fee", {
                        required: {
                          value: true,
                          message: "Please enter Fee.",
                        },
                      })}
                      defaultValue={user?.fee}
                    />
                    {errors.fee && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.fee.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="specialization" className="lable-style">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      id="specialization"
                      placeholder="Enter Bio Details"
                      className="form-style"
                      {...register("specialization", { required: true })}
                      defaultValue={user?.specialization}
                    />
                    {errors.specialization && (
                      <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Specialization.
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              
              user.accountType === "Patient" ? (
                <div>
                  
                </div>
              ): (
                <div>

                </div>
              )
              
            )
          }

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className="lable-style">
              About
            </label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              className="form-style"
              {...register("about", { required: true })}
              defaultValue={user?.about}
            />
            {errors.about && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your About.
              </span>
            )}
          </div>

        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-[#3d65ff] py-2 px-5 font-semibold"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </div>
  )
}
