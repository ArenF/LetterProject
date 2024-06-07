import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import MailPage from "./pages/mail/MailPage";
import SendPage from "./pages/send/SendPage";
import NavBar from "./components/navbar/NavBar";

const App = () => {
    return(
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/mail" element={<MailPage/>} />
                <Route path="/send" element={<SendPage/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;