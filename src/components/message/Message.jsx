import { useState } from "react";
import "./Message.css";
import { useParams } from "react-router-dom";
import { addMessage, getUserWithId } from "../../services/data";
import { useAuthContext } from "../../contexts/authContext";
import { serverTimestamp } from "firebase/firestore";
function Message() {
    const { uid } = useParams(); //ID of receiving party
    const user = useAuthContext();
    const ownerId = user.uid; //ID of currently logged in user
    const [participant, setParticipant] = useState(null);
    const [input, setInput] = useState("");
    getUserWithId(uid).then((user) => {
        setParticipant(user.username);
    });
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!input) {
            return;
        }
        const payload = {
            message: input,
            createdAt: serverTimestamp(), //add timestamp
            ownerId: ownerId,
        };
        addMessage(ownerId, uid, payload);
        setInput("");
    };
    return (
        <>
            <h2 className="msg-title">Texting with {participant}</h2>
            <div className="current-chat"></div>
            <div className="new-message">
                <form onSubmit={handleSubmit}>
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
            </div>
        </>
    );
}

export default Message;
