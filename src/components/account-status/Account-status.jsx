import { useAuthContext } from "../../contexts/authContext";
import "./Account-status.css";
import { useNavigate } from "react-router-dom";
import { logout, removeUser } from "../../services/auth";

function AccountStatus() {
    const user = useAuthContext();
    const navigate = useNavigate();

    const timestamp = user.metadata.lastLoginAt;
    const lastLogin = new Date(Number(timestamp)).toDateString();

    const deleteAccount = () => {
        if (confirm("You can NOT undo this action. Are you sure?") == true) {
            removeUser();
            logout();
            navigate("/");
        }
    };
    return (
        <>
            <ul className="status-list">
                <li>Active since: {user.metadata.creationTime}</li>
                <li>Last Login: {lastLogin}</li>
                <button className="delete-account" onClick={deleteAccount}>
                    Delete Account
                </button>
            </ul>
        </>
    );
}

export default AccountStatus;
