// require("dotenv").config()

const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/medicine/showAllCategory"
}


export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login"
}


export const doctorendpoints = {
    GET_ONE_DOCTOR_DETAIL_API: BASE_URL + "/doctor/getDoctorDetail",
    GET_ALL_DOCTOR_DETAIL_API: BASE_URL + "/doctor/getAllDoctorDetail"
}