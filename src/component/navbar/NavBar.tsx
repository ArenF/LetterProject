import { Box, Heading, Stack, Text, Link as ChakraLink, Avatar } from "@chakra-ui/react";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { LoginState } from "src/reducer/login";
import { ProfileData, getProfile } from "src/firestore/profileDB";

const MiniProfile = ():JSX.Element => {
    const auth = getAuth();
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    const loginData = useSelector<any, LoginState>((reducer) => reducer.login);
    const [text, setText] = useState("SIGNUP");
    const [image, setImage] = useState('');

    useEffect(() => {
        if (user === null) {
            onAuthStateChanged(auth, (user) => {
                console.log(user);
                setUser(user);
            })
        }
    }, [user]);

    useEffect(() => {

        // 로그인이 되었으나 로그인된 데이터가 있지 않을 때
        if (user !== null && !loginData.loggedIn) {
            
            getProfile(user.uid)
            .then((result:ProfileData) => {
                dispatch({
                    type: "signin",
                    uid: user.uid,
                    name: result.name,
                    photoUrl: URL.createObjectURL(result.photo),
                });
            })
            .catch((error) => {
                console.error(error);
                dispatch({
                    type: "signout"
                })
            })
        }

        // 로그인 되었을 때
        if (user !== null) {
            setText(loginData.name);
            setImage(loginData.photoUrl);
        }

        // 로그인이 되지 않았을 때
        if (user === null) {
            setText("SIGNUP");
            setImage('');
        }
        
    }, [loginData, user]);

    return (
        <Stack
            direction="row"
            align="center"
            spacing={4}
        >
            <Linker 
                name={text}
                to={user === null ? "/signup" : "/profile"}
            />
            <Avatar 
                src={image}
            />
        </Stack>
    );
};

type LinkerType = {
    name:string,
    to:string,
}
 
const Linker = ({
    name, to
}:LinkerType):JSX.Element => {
    
    return (
        <Box
            gap={2}
        >
            <ChakraLink 
                as={RouterLink}
                to={to}
            >
                <Text
                    fontWeight="bold"
                    size="lg"
                >
                    {name}
                </Text>
            </ChakraLink>
        </Box>
    );
};

const NavBar = ():JSX.Element => {

    const width = "100vw";
    const height = "6em";

    const LinkList = [
        {
            name: "메일함",
            to: "/mail",
        },
        {
            name: "만들기",
            to: "/send",
        }, 
    ];

    const loggedIn = useSelector<any, Boolean>((state) => state.login.loggedIn);

    return (
        <Stack
            position="fixed"
            w={width}
            h={height}
            direction="row"
            bgColor="whitesmoke"
            gap={0}
        >
            <Stack
                position="relative"
                w="50vw"
                h={height}
                direction="row"
                align="center"
                padding="2em"
            >
                <Heading size={"md"}>LETTERLIKE</Heading>
            </Stack>
            <Stack
                position="relative"
                w="50vw"
                h={height}
                direction="row-reverse"
                align="center"
                padding='2em'
                rowGap={3}
                spacing={12}
            >
                <MiniProfile />
                <Stack
                    direction="row"
                    spacing={6}
                >
                    {LinkList.map((value, index) => (
                        <Linker 
                            key={index}
                            name={value.name}
                            to={value.to}
                        />
                    ))}
                    <Linker 
                        name={loggedIn ? "로그아웃" : "로그인"}
                        to={loggedIn ? "/logout" : "/login"}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default NavBar;