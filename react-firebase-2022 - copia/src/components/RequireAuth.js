import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { BrowserRouter, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";


const RequireAuth = ({ children }) => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return navigate('/login')
    }

    return children;
}
export default RequireAuth;