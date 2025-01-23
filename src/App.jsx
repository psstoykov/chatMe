import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { AuthContextProvider } from "./contexts/authContext";

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute>
                                <Register />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute>
                                <Login />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </div>
        </AuthContextProvider>
    );
}

export default App;
