import { Box, Button, Card, CardBody, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Progress, Show, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginState } from "src/reducer/login";

const steps = [
    { title: "First", description: "Input" },
    { title: "Second", description: "Write" },
    { title: "Third", description: "Check" },
];

const InputLogin = ():JSX.Element => {
    const [email, setEmail] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    const dispatch = useDispatch(); 

    const loginEmail = useSelector<LoginState, string>((loginState) => loginState.email);

    useEffect(() => {
        console.log(loginEmail);
        console.log(email); 
    }, [email]);

    const emailErrorChecker = true;
    const passwordErrorChecker = true;

    return (
        <Stack
            direction="column"
            padding={4}
            align="stretch"
        >
            <FormControl isInvalid={emailErrorChecker}>
                <FormLabel>Enter the Email</FormLabel>
                <Input
                    type="email"
                    onChange={(e) => {
                        const em = e.target.value;
                        setEmail(em);
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
                        onChange={(e) => {}}
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
        </Stack>
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