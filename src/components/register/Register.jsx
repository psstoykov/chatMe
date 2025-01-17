import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

function Register() {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        username: "",
        password: "",
        repass: "",
    };
    const [inputs, setInputs] = useState(initialValues);
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [errors, setErrors] = useState(null);
    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        setErrors(null);
        event.preventDefault();
        if (
            !inputs.email ||
            !inputs.username ||
            !inputs.password ||
            !inputs.repass
        ) {
            return setErrors("All fields are required");
        }
        if (inputs.username.length < 3) {
            return setErrors("username must be at least 3 characters long");
        }
        if (inputs.password !== inputs.repass) {
            return setErrors("passwords must match");
        }
        if (inputs.password.length < 6) {
            return setErrors("password must be at least 6 characters long");
        }

        register(inputs.email, inputs.password, inputs.username);
        setIsSignUpActive(false);
        setInputs(initialValues);
        navigate("/");
    };

    return (
        <div className="register-form">
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
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="username"
                    value={inputs.username}
                />

                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="password"
                    value={inputs.password}
                />

                <input
                    type="password"
                    name="repass"
                    onChange={handleChange}
                    placeholder="repeat password"
                    value={inputs.repass}
                />

                <button className="register-button" type="submit">
                    Register
                </button>
            </form>
            <div className="guest-links">
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Register;
