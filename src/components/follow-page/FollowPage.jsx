import { Link, useParams } from "react-router-dom";
import "./FollowPage.css";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { getFollowStats } from "../../services/data";

const FollowPage = () => {
    const { followType } = useParams();
    const user = useAuthContext();
    const uid = user.uid;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getFollowStats(uid, followType).then((users) => {
            users.sort((a, b) => a.username.localeCompare(b.username)); //sort alpabetically
            const filteredArray = users.filter((a) => a.uid !== uid); //filter self account out

            setUsers(filteredArray);
        });
    }, []);

    if (users.length == 0) {
        return (
            <>
                <h1 className="user-list-title">List of {followType}</h1>
                <div className="users-list">
                    <div className="user-list-field">The list is empty</div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h1 className="user-list-title">List of {followType}</h1>
                <div className="users-list">
                    {users.map((user) => (
                        <div className="user-list-field" key={user.createdAt}>
                            <Link
                                to={"/message/" + user.uid}
                                className="msg-btn"
                            >
                                {user.username}
                            </Link>
                        </div>
                    ))}
                </div>
            </>
        );
    }
};

export default FollowPage;
