import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
    const initialValues = {
        email: "",
        username: "",
        password: "",
        repass: "",
    };
    const [inputs, setInputs] = useState(initialValues);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);
        setInputs(initialValues);
    };

    return (
        <div className="register-form">
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
