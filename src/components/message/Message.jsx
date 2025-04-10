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
    const [payload, setPayload] = useState({});

    useEffect(() => {
        getMessages(ownerId, uid).then((res) => {
            setChat(res);
        });
        getUserWithId(uid).then((user) => {
            if (user) {
                setParticipant(user.username);
            }
        });
    }, [payload, ownerId]); //input

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

        setPayload(data);

        addMessage(ownerId, uid, data);
        setInput("");
    };

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

export default Message;
