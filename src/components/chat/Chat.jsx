import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { getUserWithId } from "../../services/data";
import "./Chat.css";

const Chat = ({ sender, message, createdAt }) => {
    const user = useAuthContext();
    const userId = user.uid;
    const [senderName, setSenderName] = useState("");
    const [chat, setChat] = useState(message);
    const [time, setTime] = useState(Date.now());
    useEffect(() => {
        const date = new Date(createdAt);
        setTime(date);
        const senderName = getUserWithId(sender);
        senderName.then((res) => {
            setSenderName(res.username);
        });
    }, []);

    if (sender == userId) {
        return (
            <>
                <li className="owner-chat-theme">{message}</li>
            </>
        );
    } else {
        return (
            <>
                <li className="friend-chat-team">{message}</li>
            </>
        );
    }
};

export default Chat;
