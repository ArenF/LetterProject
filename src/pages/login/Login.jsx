import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
        <div className="w-full h-full grid place-items-center">
            <div id="login" className="bg-indigo-50 rounded shadow flex flex-col justify-between p-3">       
                <form className="text-indigo-500" action="" method="post">
                    <fieldset className="border-4 border-dotted border-indigo-500 p-5">
                        <legend className="px-2 italic -mx-2">Welcome again!</legend>
                        <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="email">Mail </label>     
                        <input className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" type="email" onChange={e => emailChange(e.target.value)} required=""/>   
                        <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="password">Password  </label>
                        <input className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500" type="password" onChange={e => passwordChange(e.target.value)} required=""/>
                        <a href="#" className="block text-right text-xs text-indigo-500 text-right mb-4">Forgot Password?</a>
                        <button onClick={e => clickLoginButton(e)} className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400">Log In</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;