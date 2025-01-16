import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import Home from "./components/home/Home";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
