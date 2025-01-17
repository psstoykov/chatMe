import "./Header.css";
import Navigation from "../nav/Navigation";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
function Header() {
    const auth = getAuth();
    const [user, setUser] = useState("guest");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user.displayName);
        }
    });
    return (
        <header>
            <h1 className="title">
                <Link to="/">
                    <p className="red">C</p>
                    <p className="blue">h</p>
                    <p>a</p>
                    <p className="yellow">t</p>
                    <p className="red">M</p>
                    <p className="yellow">e</p>
                </Link>
            </h1>
            <h2 className="welcome-msg">Welcome, {user}</h2>
            <Navigation />
        </header>
    );
}
export default Header;
