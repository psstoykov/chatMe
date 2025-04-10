import { Link } from "react-router-dom";
import "./FollowerStats.css";
import { useAuthContext } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { getFollowStats } from "../../services/data";

const FollowerStats = () => {
    const user = useAuthContext();
    const uid = user.uid;

    const [followersCount, setFollowersCount] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);

    useEffect(() => {
        getFollowStats(uid, "followers").then((doc) => {
            setFollowersCount(doc.length);
        });
        getFollowStats(uid, "following").then((doc) => {
            setFollowingCount(doc.length);
        });
    }, [uid]);
    return (
        <div className="followers-page">
            <Link to={"/myPage/followers"} className="stats-followers">
                <p>{followersCount}</p>
                <p>Followers</p>
            </Link>
            <Link to={"/myPage/following"} className="stats-following">
                <p>{followingCount}</p>
                <p>Following</p>
            </Link>
        </div>
    );
};

export default FollowerStats;
