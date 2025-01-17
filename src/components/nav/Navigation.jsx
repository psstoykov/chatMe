import { Link } from "react-router-dom";
import "./Navigation.css";
import { logout } from "../../services/auth";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

function Navigation() {
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsFetching(false);
                return;
            }
            setUser(null);
            setIsFetching(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    if (user) {
        return (
            <nav>
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
