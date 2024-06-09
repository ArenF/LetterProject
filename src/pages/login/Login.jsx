import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Box, Card, CardBody, HStack, VStack, Heading, Button, Input, InputGroup, InputRightElement, Text, Image, Link as ChakraLink } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    
    // 로그인 실패 체크
    const [loginFailed, setLoginFailed] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // show 는 password를 보여줄 지 안 보여줄 지 정하는 값이다.
    const [show, setShow] = useState(false);

    // correct는 email Input에서 email 정규표현식 규칙을 지켰을 때 true가 되는 값이다.
    const [correct, setCorrect] = useState(false);

    // 이메일 입력한 값을 정규표현식으로 비교해서 이메일 규칙으로 작성했는가를 확인한다.
    function emailCheck(value) {
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        setCorrect(email_regex.test(value));
    }

    // 로그인 버튼을 눌렀을 때
    function submitLogin() {
        
        // 이메일 정규식이 제대로 입력되지 않았을 때
        if (!correct) {
            setLoginFailed(true);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoginFailed(false);
                const user = userCredential.user;
                console.log(user);
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                setLoginFailed(true);
            });
    }

    return (
        <Box
            w={"100vw"}
            h={"100vh"}
            bgGradient='linear(to-tr, pink.200, gray.50)'
        >
            <Card
                bg={"white"}
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                overflow='hidden'
                variant='elevated'
                shadow='lg'
                direction={{base: 'column', sm:'row'}}
            >
                <CardBody>
                    <HStack
                        direction='row'
                        spacing={0}
                    >
                        <VStack
                            align='stretch'
                            spacing={loginFailed ? 19.5 : 20}
                            w="20em"
                            paddingY={"2rem"}
                        >
                            <Heading size={"3xl"} textAlign='center' >로그인</Heading>
                            <VStack spacing={5}>
                                {
                                    loginFailed ?
                                    <Text
                                        paddingX='60px'
                                        size={'md'}
                                        textAlign='center'

                                    >로그인에 실패하였습니다. 다시 시도 해주십시오.</Text>
                                    : ''
                                }
                                <InputGroup size="md">
                                    <Input 
                                        pr='4.5rem'
                                        size="md"
                                        variant="outline"
                                        placeholder="Enter email"
                                        isInvalid={loginFailed}
                                        errorBorderColor="crimson"
                                        onChange={(event) => { 
                                            if (loginFailed) setLoginFailed(false);
                                            setEmail(event.target.value);
                                            emailCheck(event.target.value);
                                         }}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        { correct ? <CheckIcon color='green.500' /> : <CloseIcon color='red.500' /> }
                                    </InputRightElement>
                                </InputGroup>
                                <InputGroup size="md">
                                    <Input 
                                        pr='4.5rem' 
                                        type={show ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        isInvalid={loginFailed}
                                        errorBorderColor="crimson"
                                        onChange={(event) => {
                                            if (loginFailed) setLoginFailed(false);
                                            setPassword(event.target.value);
                                        }}
                                    />
                                    
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={() => {setShow(!show)}}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <ChakraLink as={RouterLink} w='100%' to="/signup">
                                    <Text color='red' w='100%' textAlign='right' fontSize='xs'>
                                        비밀번호를 잊으셨나요?
                                    </Text>
                                </ChakraLink>
                            </VStack>

                            <Button colorScheme="purple" onClick={() => { submitLogin(); }}>로그인</Button>
                        </VStack>
                    </HStack>
                </CardBody>

                <Image
                  objectFit='cover'
                  maxW={{ base: '100%', sm: '24rem' }}
                  src='images/writing-letter-image.jpeg'
                  alt='Caffe Latte'
                />
            </Card>
        </Box>
    );
};

export default Login;