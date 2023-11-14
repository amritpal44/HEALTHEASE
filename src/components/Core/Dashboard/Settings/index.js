import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
// import DeleteAccount from "./DeleteAccount"
// import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    
    <div className="flex flex-col pt-6 w-[600px] mb-7">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      
      <ChangeProfilePicture />

      <EditProfile/>
      
    </div>
  )
}