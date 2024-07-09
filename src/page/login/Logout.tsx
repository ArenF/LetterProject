import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = ():JSX.Element => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth();

    useEffect(() => {
        signOut(auth);
        dispatch({
            type: "signout"
        });
        navigate('/');
    }, []);
    
    return (
        <div></div>
    );
};

export default Logout;