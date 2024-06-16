import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import MailPage from "./pages/mail/MailPage";
import SendPage from "./pages/send/SendPage";
import NavBar from "./components/navbar/NavBar";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/profile/Profile";

const App = () => {
    return(
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/mail" element={<MailPage/>} />
                <Route path="/send" element={<SendPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;