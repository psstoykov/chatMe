import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
    return (
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
}
export default Navigation;
