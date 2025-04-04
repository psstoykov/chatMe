import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

export const AuthRoute = ({ children }) => {
    const user = useAuthContext();

    return user == null ? <Navigate to="/"></Navigate> : children;
};
