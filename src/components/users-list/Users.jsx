import { useState } from "react";
import "./Users.css";
import { useEffect } from "react";
import { getAllUsers } from "../../services/data";
import { Link } from "react-router-dom";

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
        });
    }, []);

    return (
        <>
            <ul className="users-list">
                {users.map((user) => (
                    <li key={user.email}>
                        {user.username}
                        <Link to={"/message/" + user.uid} className="msg-btn">
                            Send a message
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
