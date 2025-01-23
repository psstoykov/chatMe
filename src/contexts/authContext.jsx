import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useContext } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

                setIsFetching(false);
                return;
            }

            setUser(null);
            setIsFetching(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    if (isFetching) {
        return <h1>Loading...</h1>;
    }

    return (
        <AuthContext.Provider value={user}>
            {props.children}
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    const userData = useContext(AuthContext);
    if (userData) {
        return userData;
    }
    return null;
}
