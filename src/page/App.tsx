import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import NavBar from "src/component/navbar/NavBar";
import { Provider } from "react-redux";
import { useStore } from "src/store/useStore";
import SignUp from "./signup/SignUp";
import Login from "./login/Login";

const App = ():JSX.Element => {
    const store = useStore();
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/signup" element={<SignUp/>} />
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;