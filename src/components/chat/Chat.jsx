import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import "./Chat.css";
import { deleteMessage } from "../../services/data";

const Chat = ({ friendId, docId, sender, message, createdAt }) => {
    //TODO fix infinite loop
    const user = useAuthContext();
    const userId = user.uid;

    const [senderId, setSenderId] = useState(null);
    const [chat, setChat] = useState("");
    const [date, setDate] = useState(null);
    console.log(userId, sender, docId);
    const deleteMsg = () => {
        deleteMessage(userId, friendId, docId);
        setChat("");
    };
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
                <div className="owner-chat-theme">
                    {chat}
                    <p className="date-stamp">{date.toString()}</p>
                    <button className="delete-msg" onClick={deleteMsg}>
                        delete
                    </button>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="friend-chat-theme">
                {chat}
                <p className="date-stamp">{date.toString()}</p>
            </div>
        </>
    );
};

export default Chat;
