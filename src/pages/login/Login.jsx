import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Box, Center, Input } from "@chakra-ui/react";

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    const [loginCheck, setLoginCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function emailChange(value) {
        setEmail(value);
        console.log(value);
    }
    function passwordChange(value) {
        setPassword(value);
        console.log(value);
    }

    function clickLoginButton(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredental) => {
                const user = userCredental.user;
                // 로그인 성공 시에 실행될 코드
                console.log(user);
                sessionStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                // 로그인 실패

            });
    }

    return (
        <Box
            w={"100%"}
            h={"max-content"}
            bgColor={"rose"}
        >
            <Center
                paddingTop="10em"
                w={"fit-content"}
                h={"fit-content"}
            >
                <Box
                    w={"fit-content"}
                    h={"fit-content"}
                >
                    <Input variant={"outline"} placeholder="" />
                </Box>
            </Center>
        </Box>
    );
};

export default Login;