import { Link } from "react-router-dom";
import "./Navigation.css";
import { logout } from "../../services/auth";
import { useAuthContext } from "../../contexts/authContext";

function Navigation() {
    const user = useAuthContext();
    if (user) {
        return (
            <nav>
                <Link to="/myprofile">My Profile</Link>
                <Link
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </Link>
            </nav>
        );
    } else {
        return (
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        );
    }
}
export default Navigation;
