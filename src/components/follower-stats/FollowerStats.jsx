import { Link } from "react-router-dom";
import "./FollowerStats.css";
import { useAuthContext } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import { getFollowStats } from "../../services/data";

const FollowerStats = () => {
    const user = useAuthContext();
    const uid = user.uid;

    const [followers, setFollowers] = useState(null);
    const [followersCount, setFollowersCount] = useState(null);
    const [following, setFollowing] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);

    useEffect(() => {
        getFollowStats(uid, "followers").then((doc) => {
            setFollowers(doc);
            setFollowersCount(doc.length);
        });
        getFollowStats(uid, "following").then((doc) => {
            setFollowing(doc);
            setFollowingCount(doc.length);
        });
    }, [uid]);
    return (
        <div className="followers-page">
            <Link className="stats-followers">
                <p>{followersCount}</p>
                <p>Followers</p>
            </Link>
            <Link className="stats-following">
                <p>{followingCount}</p>
                <p>Following</p>
            </Link>
        </div>
    );
};

export default FollowerStats;
