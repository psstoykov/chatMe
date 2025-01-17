import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { login } from "../../services/auth";

function Login() {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };
    const [inputs, setInputs] = useState(initialValues);
    const [isSigInActive, setIsSignInActive] = useState(true);
    const [errors, setErrors] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        setErrors(null);
        event.preventDefault();
        if (!inputs.email || !inputs.password) {
            return setErrors("All fields are required");
        }

        const result = await login(inputs.email, inputs.password);
        console.log(result);
        setIsSignInActive(false);
        setInputs(initialValues);
        navigate("/");
    };
    return (
        <div className="login-form">
            {errors && <h4 className="errors">{errors}</h4>}
            {/* TODO expand the error handling */}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="email@domain.com"
                    value={inputs.email}
                />

                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="password"
                    value={inputs.password}
                />

                <button className="login-button" type="submit">
                    Login
                </button>
            </form>
            <div className="guest-links">
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;
