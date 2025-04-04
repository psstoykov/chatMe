import "./Header.css";
import Navigation from "../nav/Navigation";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { useState } from "react";
import { useEffect } from "react";

function Header() {
    const [username, setUsername] = useState("guest");
    const user = useAuthContext();
    //TODO fix dynamic update username

    useEffect(() => {
        user ? setUsername(user.displayName) : setUsername("guest");
    }, [user]);

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

            <h2 className="welcome-msg">
                Hello, <span className="welcome-name">{username}</span>{" "}
            </h2>
            <Navigation />
        </header>
    );
}
export default Header;
