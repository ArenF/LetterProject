import { Box, Button, Card, CardBody, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Progress, Show, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, flexbox, useSteps } from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginState, LoginActions } from "src/reducer/login";

const steps = [
    { title: "First", description: "Input" },
    { title: "Second", description: "Write" },
    { title: "Third", description: "Check" },
];

type LoginBodyType = {
    children: ReactNode
}

const LoginBody = ({children}:LoginBodyType):JSX.Element => (
    <Stack
        direction="column"
        padding={4}
        align="stretch"
        position="relative"
        display="flex"
    >
        {children}
    </Stack>
);

const InputNameAndPhoto = ():JSX.Element => {
    return (
        <LoginBody>
            <Input 

            />
        </LoginBody>
    );
};

const InputLogin = ():JSX.Element => {
    const [passwordShow, setPasswordShow] = useState(false);

    const dispatch = useDispatch(); 
    // combineReducers를 설정하면 object 형태로 reducer의 state 데이터가 저장됨
    const state = useSelector<any, LoginState>((state) => state.login);
    // state.login 을 통해 loginState 데이터를 불러옴
    const email = state.email;
    const password = state.password;

    useEffect(() => {
        console.log(email);
    }, [email]);

    const emailErrorChecker = email === '';
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
                            type: "emailInput",
                            email: em,
                        });

                    }}
                />
                {!emailErrorChecker ? (
                    <FormHelperText>
                        Enter the email
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is Required</FormErrorMessage>
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
                                type: "passwordInput",
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
                        Enter the password
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>
                        Password is Required
                    </FormErrorMessage>
                )}
            </FormControl>

            <Button
                colorScheme='blue'
                onClick={() => {

                }}
            >
                Next
            </Button>
        </LoginBody>
    );
};

const LoginStep = () => {
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    return (
        <Box position="relative">
            <Stepper size="md" index={activeStep} gap='0'>
                {steps.map((step, index) => (
                    <Step key={index} onClick={() => setActiveStep(index)}>
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
            { 
                activeStep == 0 ? (
                    InputLogin()
                ) : activeStep == 1 ? (
                    InputLogin()
                ) : (
                    InputLogin()
                )
            }
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