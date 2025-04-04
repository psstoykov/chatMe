import { useEffect, useState } from "react";
import { changePassword, changeUsername } from "../../services/auth";
import "./myPage.css";
import { useAuthContext } from "../../contexts/authContext";
import AccountStatus from "../account-status/Account-status";

export default function MyPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitUsername = (e) => {
        e.preventDefault();
        if (username == "") {
            return;
        }
        changeUsername(username);
        setUsername("");
    };
    const submitPassword = (e) => {
        e.preventDefault();
        if (password == "") {
            return;
        }
        changePassword(password);
        setPassword("");
    };

    const handleUsername = (event) => {
        const value = event.target.value;
        setUsername(value);
    };
    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    return (
        <>
            <div className="user-container">
                <div className="account-settings">
                    <form className="user-form" onSubmit={submitUsername}>
                        <input
                            type="text"
                            name="username"
                            onChange={handleUsername}
                            placeholder="new username"
                            value={username}
                        />
                        <button className="form-btn" type="submit">
                            change username
                        </button>
                    </form>
                    <form className="user-form" onSubmit={submitPassword}>
                        <input
                            type="password"
                            name="password"
                            onChange={handlePassword}
                            placeholder="new password"
                            value={password}
                        />
                        <button className="form-btn" type="submit">
                            change password
                        </button>
                    </form>
                </div>
                <AccountStatus />
            </div>
            <div className="my-friends">
                <h2 className="friends-title">Friends List</h2>
                <ul>
                    <li>Friends list is empty</li>
                </ul>
            </div>
        </>
    );
}
