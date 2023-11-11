import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function PrivateRoute ({children})  {
    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();

    useEffect( () => {

    }, [])
    
    if(token !== null){
        return children
    }else{
        toast.error("You need to login fisrt.");
        navigate("/login");
    }
}

export default PrivateRoute;