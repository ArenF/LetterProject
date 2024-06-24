import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import NavBar from "src/component/NavBar";

const App = ():JSX.Element => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;