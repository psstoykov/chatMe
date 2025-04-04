import { useState } from "react";
import "./Users.css";
import { useEffect } from "react";
import { getAllUsers } from "../../services/data";

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
                    <li key={user.email}>{user.username}</li>
                ))}
            </ul>
        </>
    );
}
