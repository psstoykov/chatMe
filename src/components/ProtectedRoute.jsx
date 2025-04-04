import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
    const user = useAuthContext();

    return user == null ? children : <Navigate to="/"></Navigate>;
};
