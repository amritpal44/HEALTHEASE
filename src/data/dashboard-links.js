import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Doctors",
    path: "doctors",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-medicines",
    type: ACCOUNT_TYPE.VENDOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-medicine",
    type: ACCOUNT_TYPE.VENDOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Appointment Requests",
    path: "/dashboard/appointment-request",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscMortarBoard",
  },
  {
    id: 7,
    name: "Cart",
    path: "/cart",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscArchive",
  },
]
