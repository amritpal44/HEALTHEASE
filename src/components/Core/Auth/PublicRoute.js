
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function PublicRoute ({children}) {
    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (token !== null) {
          navigate("/");
        }
      }, [token, navigate]);
    
      if (token === null) {
        return children;
      } else {
        // No need to navigate here anymore
        return null;
      }
}

export default PublicRoute;