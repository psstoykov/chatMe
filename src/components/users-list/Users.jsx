import { useState } from "react";
import "./Users.css";
import { useEffect } from "react";
import { getAllUsers } from "../../services/data";
import { Link } from "react-router-dom";

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((users) => {
            users.sort((a, b) => a.username.localeCompare(b.username));
            setUsers(users);
        });
    }, []);

    return (
        <>
            <div className="users-list">
                {users.map((user) => (
                    <Link
                        key={user.email}
                        to={"/message/" + user.uid}
                        className="msg-btn"
                    >
                        {user.username}
                    </Link>
                ))}
            </div>
        </>
    );
}
