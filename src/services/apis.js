// require("dotenv").config()

const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/medicine/showAllCategory"
}


export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESET_PASSWORD_TOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password"
}


export const doctorendpoints = {
    GET_ONE_DOCTOR_DETAIL_API: BASE_URL + "/doctor/getDoctorDetail",
    GET_ALL_DOCTOR_DETAIL_API: BASE_URL + "/doctor/getAllDoctorDetail"
}


export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile"
}


export const bookingEndpoints = {
    BOOK_APPOINTMENT_REQUEST: BASE_URL + "/booking/bookAppointmentRequest"
}