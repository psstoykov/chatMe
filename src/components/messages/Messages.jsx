import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { getMyMessages } from "../../services/data";
import "./Messages.css";

function Messages() {
    const user = useAuthContext();
    const uid = user.uid;

    const [messages, setMessages] = useState(null);

    useEffect(() => {
        const query = getMyMessages(uid);
        query.then((messages) => {
            setMessages(messages);
        });
    }, [uid]);

    return (
        <>
            <h1>My Messages</h1>
            <div className="msg-container"></div>
        </>
    );
}

export default Messages;
