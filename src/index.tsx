import React from "react";
import { createRoot } from "react-dom/client";
import App from "./page/App";
// firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    ChakraProvider,
    extendTheme
} from "@chakra-ui/react";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = createRoot(document.getElementById("root") as Element);

const theme = extendTheme({
});

root.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
);