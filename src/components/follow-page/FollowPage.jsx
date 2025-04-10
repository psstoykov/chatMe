import { useParams } from "react-router-dom";
import "./FollowPage.css";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { getFollowStats, getUserWithId } from "../../services/data";

const FollowPage = () => {
    const { followType } = useParams();
    const user = useAuthContext();
    const uid = user.uid;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getFollowStats(uid, followType).then((doc) => {
            setUsers(doc);
        });
    }, []);
    console.log(users);
    return <></>;
};

export default FollowPage;
