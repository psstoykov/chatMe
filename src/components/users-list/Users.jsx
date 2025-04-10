import { useState } from "react";
import "./Users.css";
import { useEffect } from "react";
import { getAllUsers } from "../../services/data";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import Follow from "../follow/Follow";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const user = useAuthContext();
    const uid = user.uid;

    useEffect(() => {
        getAllUsers().then((users) => {
            users.sort((a, b) => a.username.localeCompare(b.username)); //sort alpabetically
            const filteredArray = users.filter((a) => a.uid !== uid); //filter self account out

            setUsers(filteredArray);
        });
    }, [uid]);

    return (
        <>
            <h1 className="user-list-title">List of Users</h1>
            <div className="users-list">
                {users.map((user) => (
                    <div className="user-list-field" key={user.email}>
                        <Link to={"/message/" + user.uid} className="msg-btn">
                            {user.username}
                        </Link>
                        <Follow friendId={user.uid} uid={uid} />
                    </div>
                ))}
            </div>
        </>
    );
}
