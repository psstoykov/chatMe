import "./Header.css";
import Navigation from "../nav/Navigation";
import { Link } from "react-router-dom";

function Header() {
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

            <Navigation />
        </header>
    );
}
export default Header;
