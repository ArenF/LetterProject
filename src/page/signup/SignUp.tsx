import { Avatar, Box, Button, Card, CardBody, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Progress, Show, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, flexbox, useSteps } from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "src/component/DnD/Dropzone";
import { RegistState } from "src/reducer/regist";


const steps = [
    { title: "First", description: "Input" },
    { title: "Second", description: "Write" },
    { title: "Third", description: "Check" },
];

type LoginBodyType = {
    children: ReactNode
}

const usePager = () => {

    const page = useSelector<any, number>((state) => state.regist.page);
    const dispatch = useDispatch();

    const { activeStep, setActiveStep } = useSteps({
        index: page,
        count: steps.length,
    });

    function changePage(newPage:number):void {
        setActiveStep(newPage);
        dispatch({
            type: "changePage",
            page: newPage,
        });
    }

    return {page, changePage};
}

const LoginBody = ({children}:LoginBodyType):JSX.Element => (
    <Stack
        h="35em"
        direction="column"
        padding={4}
        align="stretch"
        display="flex"
        justifyContent="center" 
        spacing={16}
    >
        {children}
    </Stack>
);

const InputLastCheckAll = ():JSX.Element => {
    const registData = useSelector<any, RegistState>((state) => state.regist);
    const dispatch = useDispatch();
    
    return (
        <LoginBody>
            <FormControl>
                <FormLabel>회원가입 하시겠습니까?</FormLabel>
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        
                    }}
                >회원가입</Button>
            </FormControl>
        </LoginBody>
    );
};

const InputNameAndPhoto = (nextPage:() => void):JSX.Element => {
    const registData = useSelector<any, RegistState>((state) => state.regist);
    const dispatch = useDispatch();

    return (
        <LoginBody>
            <Box
                position="relative" 
                w="100%" 
                h="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Dropzone
                    onDrop={(file:File) => {
                        const url = URL.createObjectURL(file);

                        const fileReader = new FileReader();
                        fileReader.onload = () => {
                            const srcData = fileReader.result;
                            const base = `base64:${srcData}`;
                            dispatch({
                                type:"inputPhoto",
                                photo: base,
                            })
                        };
                        fileReader.readAsDataURL(file);

                        console.log(file);
                        if (file === undefined || file === null) {
                            dispatch({
                                type:"inputPhoto",
                                photo: '',
                            })
                        } else {
                            dispatch({
                                type:"inputPhoto",
                                photo: url,
                            });
                        }
                    }}
                >
                    <Avatar
                        src={registData.photo === '' ? null : registData.photo}
                        size="2xl"
                        _hover={{
                            background: '#424874',
                            transition: "all 0.5s ease"
                        }}
                    />
                </Dropzone>
            </Box>
            <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input 
                    placeholder="Enter the fullname"
                    value={registData.name}
                    onChange={(event) => {
                        const name = event.target.value;
                        dispatch({
                            type:"inputName",
                            name: name,
                        })
                    }}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                onClick={() => nextPage()}
            >
                Next
            </Button>
        </LoginBody>
    );
};

const InputLogin = (nextPage:() => void):JSX.Element => {
    const [passwordShow, setPasswordShow] = useState(false);

    const dispatch = useDispatch(); 
    // combineReducers를 설정하면 object 형태로 reducer의 state 데이터가 저장됨
    const state = useSelector<any, RegistState>((state) => state.regist);
    // state.login 을 통해 loginState 데이터를 불러옴
    const email = state.email;
    const password = state.password;

    const emailRegex = '^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$';
    const regex = new RegExp(emailRegex);

    const emailErrorChecker = email === '' || !regex.test(email);
    const passwordErrorChecker = password === '';

    return (
        <LoginBody>
            <FormControl isInvalid={emailErrorChecker}>
                <FormLabel>Enter the Email</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(e) => {
                        const em = e.target.value;
                        dispatch({
                            type: "inputEmail",
                            email: em,
                        });
                    }}
                />
                {!emailErrorChecker ? (
                    <FormHelperText>
                        사용 가능한 이메일입니다.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>이메일 형식이 알맞지 않습니다.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={passwordErrorChecker}>
                <FormLabel>Enter the Password</FormLabel>
                <InputGroup size='md'>
                    <Input 
                        pr='4.5rem'
                        type={passwordShow ? 'text' : 'password'}
                        placeholder="Enter the password"
                        value={password}
                        onChange={(e) => {
                            dispatch({
                                type: "inputPassword",
                                password: e.target.value,
                            })
                        }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button 
                            h='1.75rem' 
                            size='sm' 
                            onClick={() => setPasswordShow(!passwordShow)}
                        >
                            {passwordShow ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {!passwordErrorChecker ? (
                    <FormHelperText>
                        사용 가능한 비밀번호입니다.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>
                        입력한 형식이 알맞지 않습니다.
                    </FormErrorMessage>
                )}
            </FormControl>

            <Button
                colorScheme="blue"
                onClick={() => {nextPage()}}
            >
                Next
            </Button>
        </LoginBody>
    );
};

type PageArgument = {
    pages:Array<JSX.Element>,
    count:number,
};

const LoginPage = ({ pages, count }: PageArgument):JSX.Element => (
    <Box w='auto' h='auto'>
        {pages[count]}
    </Box>
);

const LoginStep = () => {
    const {page, changePage} = usePager();

    return (
        <Box position="relative">
            <Stepper size="md" index={page} gap='0'>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator margin={0} gap='0'>
                            <StepStatus 
                                complete={<StepIcon/>}
                                active={<StepNumber/>}
                            />
                        </StepIndicator>
                        <Box flexShrink={0}>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            <LoginPage 
                pages={[
                    (InputLogin(() => {changePage(1)})),
                    (InputNameAndPhoto(() => {changePage(2)})),
                    (InputLastCheckAll())
                ]}
                count={page}
            />
        </Box>
    )
}

const SignUp = ():JSX.Element => {

    return (
        <Box
            w="100vw"
            h="100vh"
            bgGradient={"linear(to-tr, gray.50, cyan.500)"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop="6em"
        >
            <Card
                bgImage="/writing_sample.jpg"
                w="72em"
                h="48em"
                bgSize={"cover"}
                align={"stretch"}
            >
                <CardBody
                    position="relative"
                    w="50%"
                    h="100%"
                    bg="white"
                    padding={"5em 2em"}
                >
                    <LoginStep />

                </CardBody>
            </Card>
        </Box>
    );
};

export default SignUp;