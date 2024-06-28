import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "src/reducer";
import { useMemo } from "react";
import { loginReducer } from "src/reducer/login";

const initializeStore = () => {
    const store = configureStore({ reducer:rootReducer });
    return store;
};

export function useStore() {
    const store = useMemo(() => initializeStore(), []);
    return store;
};