
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function PublicRoute ({children}) {
    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();

    if(token == null){
        return children
    }else{
        navigate("/");
    }
}

export default PublicRoute;