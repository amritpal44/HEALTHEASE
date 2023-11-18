
import { setLoading, setToken } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";



// export const sendOtp = async (email, navigate, dispatch) => {
//     // const dispatch = useDispatch();
//     dispatch(setLoading(true));
//     const toastId = toast.loading("Loading...");

//     try {
        
//         const response = await apiConnector("POST", endpoints.SENDOTP_API, {
//             email
//         });
//         console.log("SENDOTP API RESPONSE............", response);

//         if (!response.data.success) {
//             throw new Error(response.data.message)
//         }

//         toast.success("OTP Sent Successfully");
//         navigate("/verify-email");

//     } catch (error) {
//         console.log("SENDOTP API ERROR............", error)
//         toast.error("Could Not Send OTP")
//     }

//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
// }



export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", endpoints.SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}


export function signup(firstName, lastName, email, contactNumber, password, confirmPassword, accountType, otp, navigate){

  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, {
        firstName,
        lastName,
        email, 
        contactNumber, 
        password,
        confirmPassword,
        otp,
        accountType
      })

      console.log("SIGNUP API RESPONSE........", response);

      if(!response.data.success){
        throw new Error(response);
      }

      toast.success("Signup Successfull");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error(error?.response?.data?.message)
      navigate("/signup")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }

}


export function login(email, password, navigate){


  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      
      const response = await apiConnector("POST", endpoints.LOGIN_API, {
        email,
        password
      })

      if(!response.data.success){
        throw new Error(response);
      }

      dispatch(setToken(response.data.token))
      
      const userImage = response.data?.user?.image
      ? response.data.user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      
      dispatch(setUser({...response.data.user, image: userImage}));

      // localStorage.setItem("user", JSON.stringify({...response.data.user, image: userImage}))
      
      localStorage.setItem("token", JSON.stringify(response.data.token));


      // //*************************************************************************************************** */
      // if(response.data.user.accountType === "Doctor"){
      //   try {
      //     const response = await apiConnector("GET", bookingEndpoints.GET_ALL_APPOINTMENT_REQUEST);
    
      //     if(response){
      //       console.log("response.data.length()", response.data.length);
      //       dispatch(setAppointmentCount(response.data.length()));
      //       localStorage.setItem("appointmentCount", JSON.stringify(response.data.length));
      //     }
      //     else{
      //       console.log("didn't get appointmetn list");
      //     }
    
      //   } catch (error) {
      //     console.log("Cannot fetch appointment List");
      //     console.log("error: ", error);
      //   }
      // }

      // //*************************************************************************************************** */



      
      navigate("/");
      toast.success("Login Successful");
      
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false))
  }
}


export function getResetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", endpoints.RESET_PASSWORD_TOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function setResetPassword(password, confirmPassword, token, navigate){
  return async(dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", endpoints.RESET_PASSWORD_API, {
        password, 
        confirmPassword,
        token
      })

      if(response.data.success){
        toast.success("Password has been reset successfully");
      }else{
        throw new Error(response.data.message)
      }

      navigate("/login");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error: ", error);
      toast.error("Unable to reset password. Try again");
    }
    
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


export function logout(navigate) {

  return (dispatch) => {

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // dispatch(setToken(null));
    // dispatch(setUser(null));
    //cart data reset pending
    
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/");
    window.location.reload();

  }
}