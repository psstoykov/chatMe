import { useEffect, useState } from "react";
import "./Message.css";
import { useParams } from "react-router-dom";
import { addMessage, getMessages, getUserWithId } from "../../services/data";
import { useAuthContext } from "../../contexts/authContext";

import Chat from "../chat/Chat";

function Message() {
    const { uid } = useParams(); //ID of receiving party
    const user = useAuthContext();
    const ownerId = user.uid; //ID of currently logged in user
    const [participant, setParticipant] = useState(null);
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);
    const triggerFunc = () => {
        getMessages(ownerId, uid).then((res) => {
            setChat(res);
            setTimeout(() => {
                triggerFunc();
            }, 2000);
        });
    };
    useEffect(() => {
        triggerFunc();
        getUserWithId(uid).then((user) => {
            if (user) {
                setParticipant(user.username);
            }
        });
    }, [ownerId, uid, user]);

    const handleChange = (event) => {
        setInput(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const message = input.trim();
        if (!message) {
            setInput("");
            return;
        }
        const data = {
            message: message,
            createdAt: Date.now(), //add timestamp
            ownerId: ownerId,
        };

        addMessage(ownerId, uid, data);

        getMessages(ownerId, uid).then((res) => {
            setChat(res);
        });

        setInput("");
    };
    if (chat.length == 0) {
        return (
            <>
                <form className="msg-form" onSubmit={handleSubmit}>
                    <h2 className="msg-title">Texting with {participant}</h2>
                    <input
                        type="text"
                        name="input"
                        onChange={handleChange}
                        placeholder="new comment"
                        value={input}
                    />

                    <button className="send-msg-btn" type="submit">
                        Send
                    </button>
                </form>

                <ul className="msg-list">
                    <li className="no-message">No messages yet</li>
                </ul>
            </>
        );
    } else {
        return (
            <>
                <form className="msg-form" onSubmit={handleSubmit}>
                    <h2 className="msg-title">Texting with {participant}</h2>
                    <input
                        type="text"
                        name="input"
                        onChange={handleChange}
                        placeholder="new comment"
                        value={input}
                    />

                    <button className="send-msg-btn" type="submit">
                        Send
                    </button>
                </form>

                <ul className="msg-list">
                    {chat.map((res) => (
                        <Chat
                            friendId={uid}
                            docId={res.docId}
                            key={res.createdAt}
                            sender={res.ownerId}
                            message={res.message}
                            createdAt={res.createdAt}
                        />
                    ))}
                </ul>
            </>
        );
    }
}
export default Message;
