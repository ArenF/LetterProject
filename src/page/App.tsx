import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import NavBar from "src/component/NavBar";
import { Provider } from "react-redux";
import { useStore } from "src/store/useStore";

const App = ():JSX.Element => {
    const store = useStore();
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Main/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;