import { useState } from "react";
import { changePassword } from "../../services/auth";
import "./myPage.css";
import AccountStatus from "../account-status/Account-status";

export default function MyPage() {
    const initialValues = {
        password: "",
        repass: "",
    };
    const [inputs, setInputs] = useState(initialValues);
    const [errors, setErrors] = useState(null);

    const submitPassword = (e) => {
        e.preventDefault();
        setErrors(null);
        if (!inputs.password) {
            return setErrors("No password found");
        }
        if (inputs.password !== inputs.repass) {
            return setErrors("passwords must match");
        }
        if (inputs.password.length < 6) {
            return setErrors("Password must be at least 6 characters long");
        }
        changePassword(inputs.password);

        setInputs(initialValues);
    };

    const handlePassword = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    return (
        <>
            <div className="user-container">
                <div className="account-settings">
                    <form className="user-form" onSubmit={submitPassword}>
                        {errors && (
                            <h4 className="errors-newPassword">{errors}</h4>
                        )}
                        <input
                            type="password"
                            name="password"
                            onChange={handlePassword}
                            placeholder="new password"
                            value={inputs.password}
                        />
                        <input
                            type="password"
                            name="repass"
                            onChange={handlePassword}
                            placeholder="repeat password"
                            value={inputs.repass}
                        />
                        <button className="form-btn" type="submit">
                            change password
                        </button>
                    </form>
                </div>
                <AccountStatus />
            </div>
        </>
    );
}
