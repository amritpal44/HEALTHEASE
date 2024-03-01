import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
// import DeleteAccount from "./DeleteAccount"
// import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    
    <div className="flex flex-col pt-6 md:w-[500px] lg:w-[600px] mb-7 mx-auto">
      <h1 className="mb-14 text-blue-500 font-clarity-city font-bold text-3xl">
        Edit Profile
      </h1>
      
      <ChangeProfilePicture />

      <EditProfile/>
      
    </div>
  )
}