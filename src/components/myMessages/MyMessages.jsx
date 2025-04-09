import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import "./MyMessages.css";
import { getMyMessagesIds } from "../../services/data";

const MyMessages = () => {
    const user = useAuthContext();

    const [messages, setMessages] = useState(null);

    useEffect(() => {
        getMyMessagesIds(user.uid).then((doc) => {
            setMessages(doc);
        });
    }, [user]);

    return (
        <>
            <h1>My Messages</h1>
        </>
    );
};

export default MyMessages;
