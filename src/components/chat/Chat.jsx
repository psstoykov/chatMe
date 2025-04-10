import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import "./Chat.css";

const Chat = ({ sender, message, createdAt }) => {
    //TODO fix infinite loop
    const user = useAuthContext();
    const userId = user.uid;

    const [senderId, setSenderId] = useState(null);
    const [chat, setChat] = useState("");
    const [date, setDate] = useState(null);

    useEffect(() => {
        setSenderId(sender);
        setChat(message);
        setDate(new Date(createdAt));
    }, [message]);

    if (!chat) {
        return;
    }
    if (senderId == userId) {
        return (
            <>
                <li className="owner-chat-theme">
                    {chat}
                    <p className="date-stamp">{date.toString()}</p>
                </li>
            </>
        );
    }
    return (
        <>
            <li className="friend-chat-theme">
                {chat}
                <p className="date-stamp">{date.toString()}</p>
            </li>
        </>
    );
};

export default Chat;
