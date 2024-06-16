import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        signOut(auth);
        navigate('/');
    }, []);

    return (
        <div></div>
    );
};

export default Logout;