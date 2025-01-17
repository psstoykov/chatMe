import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
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
        return <h2>Loading...</h2>;
    }
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute user={!user}>
                            <Register />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <ProtectedRoute user={!user}>
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        </div>
    );
}

export default App;
