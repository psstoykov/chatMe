import { useAuthContext } from "../../contexts/authContext";
import "./Account-status.css";

function AccountStatus() {
    const user = useAuthContext();
    console.log(user);
    const timestamp = user.metadata.lastLoginAt;
    const lastLogin = new Date(Number(timestamp)).toDateString();
    const activeSince = user.metadata.creationTime;
    const date = new Date(activeSince);
    console.log(date.toDateString());
    return (
        <>
            <ul className="status-list">
                <li>Active since: {user.metadata.creationTime}</li>
                <li>Last Login: {lastLogin}</li>
            </ul>
        </>
    );
}

export default AccountStatus;
