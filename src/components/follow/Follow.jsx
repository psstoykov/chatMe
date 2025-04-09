import { useEffect, useState } from "react";
import "./Follow.css";
import { followById, getFollowerById, unfollowById } from "../../services/data";

const Follow = ({ friendId, uid }) => {
    const [isFollower, setIsFollower] = useState(null);

    const submitFollow = () => {
        followById(uid, friendId);
        setIsFollower(true);
    };

    const submitUnfollow = () => {
        if (confirm("you are about to unfollow... are you sure?") == true) {
            unfollowById(uid, friendId);
            setIsFollower(false);
        }
    };
    useEffect(() => {
        getFollowerById(uid, friendId).then((res) => {
            setIsFollower(res);
        });
    }, [isFollower, uid, friendId]);

    if (isFollower) {
        return (
            <>
                <div className="following-btn">Following</div>
                <button className="unfollow-btn" onClick={submitUnfollow}>
                    Unfollow
                </button>
            </>
        );
    }
    if (!isFollower) {
        return (
            <button className="follow-btn" onClick={submitFollow}>
                Follow
            </button>
        );
    }
};

export default Follow;
