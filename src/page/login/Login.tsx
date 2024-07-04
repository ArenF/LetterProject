import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Image, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileData, getProfile } from "src/firestore/profileDB";
import { LoginState } from "src/reducer/login";

const LoginBody = ():JSX.Element => {
    const [email, setEmail] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);

    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    
    const navigate = useNavigate();

    const loginData = useSelector<any, LoginState>((state) => state.login);
    const dispatch = useDispatch();
    
    return (
        <Stack
            direction="column"
            spacing={14}
            align="stretch"
        >
            <Box
                paddingTop="1em"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Heading size="2xl">
                    로그인
                </Heading>
            </Box>
            <FormControl isRequired isInvalid={!emailInvalid} >
                <FormLabel>이메일을 입력하세요.</FormLabel>
                <InputGroup>
                    <Input 
                        value={email}
                        onChange={(e) => {
                            const em = e.target.value;
                            const reg = new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

                            setEmailInvalid(reg.test(em));

                            setEmail(em);
                        }}
                    />
                    <InputRightElement>
                        { emailInvalid ? (
                            <CheckIcon color='green.500' />
                        ) : (
                            <CloseIcon color='red.500'/>
                        )}
                    </InputRightElement>
                </InputGroup>
                { emailInvalid ? (
                    <FormHelperText>해당 이메일은 사용가능합니다.</FormHelperText>
                ) : (
                    <FormErrorMessage>유효한 형식이 아닙니다.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={!passwordInvalid}>
                <FormLabel>비밀번호를 입력하세요.</FormLabel>
                <InputGroup>
                        <Input
                            type={passwordShow ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                const em = e.target.value;

                                setPasswordInvalid(em !== '');
                                setPassword(em);
                            }}
                        />
                        <InputRightElement>
                            <Button
                                size="sm"
                                w="1.82rem"
                                h='1.75rem'
                                onClick={() => setPasswordShow(!passwordShow)}
                            >
                                { !passwordShow ? (
                                    <Text size='md'>Hide</Text>
                                ) : (
                                    <Text size='md'>Show</Text>
                                ) }
                            </Button>
                        </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                isLoading={loading}
                loadingText='로그인 중...'
                colorScheme='blue'
                variant='outline'
                onClick={() => {
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        
                        getProfile(user.uid)
                        .then((result:ProfileData) => {
                            console.log(result);

                            dispatch({
                                type: 'signin',
                                uid: user.uid,
                                name: result.name,
                                photoUrl: URL.createObjectURL(result.photo),
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                        navigate('/');
                        
                    })
                    .catch((error) => {
                        console.log(error.code);
                        console.log(error.message);
                    })

                }}
            >
                로그인
            </Button>
        </Stack>
    );
};

const Login = ():JSX.Element => {
    return (
        <Box
            w='100vw'
            h='100vh'
            bgGradient={"linear(to-tr, #5AB2FF, #FFF9D0)"}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Card 
                bg="white"
                w="56em"
                h="36em"
                bgImage="writing_sample.jpg"
                bgSize="cover"
            >
                <CardBody
                    position="relative"
                    h="100%"
                    w="50%"
                    bg="white"
                    gap={4}
                >
                    <LoginBody />
                </CardBody>
            </Card>
        </Box>
    );
};

export default Login;