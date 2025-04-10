import { useParams } from "react-router-dom";
import "./FollowPage.css";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { getFollowStats } from "../../services/data";

const FollowPage = () => {
    const { followType } = useParams();
    const user = useAuthContext();
    const uid = user.uid;
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getFollowStats(uid, followType).then((doc) => {
            console.log(doc);
        });
    }, []);

    return (
        <>
            <h1>{followType}</h1>
        </>
    );
};

export default FollowPage;
