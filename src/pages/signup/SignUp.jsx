import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Box, Card, CardBody, Image, VStack, Heading, Button } from "@chakra-ui/react";
import { Stepper, Step, StepTitle, StepDescription, StepSeparator, StepIndicator, StepStatus, StepIcon, StepNumber, useSteps } from "@chakra-ui/react";
import { SlideFade, Collapse, Fade, useDisclosure } from "@chakra-ui/react";


const Page = ({ pages, count }) => {
    return (
        <Box w='full' paddingX="5rem" margin={10}>
            {pages[count]}
        </Box>
    );
};

const steps = [
    { title: '회원 가입', description: '이메일&패스워드'},
    { title: '프로필', description: '이미지 & 이름'},
    { title: 'Third', description: 'Select Rooms'}
];

const SignUp = () => {

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length
    });

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Box
            w="100vw"
            h="100vh"
            bgGradient='linear(to-tr, purple.200, gray.50)'
        >
            <Card
                bg="white"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                overflow="hidden"
                variant="elevated"
                shadow="lg"
                direction={{base: 'column', sm: 'row'}}
            >
                {/* 카드 바디(옆에 이미지를 별개로 두고 실제로 기능할 컴포넌트들) */}
                <CardBody minW="40em" justifyContent='center'>
                    <VStack
                        border="1px solid red"
                        align="stretch"
                        spacing={20}
                        paddingY={"2rem"}

                    >
                        <Heading size="3xl" textAlign="center">회원가입</Heading>
                        <VStack spacing={5}>
                            {/* 회원 가입 스텝 작성  */}
                            <Stepper w={'full'} size={'md'} index={activeStep}>
                                {steps.map((step, index) => (
                                    <Step 
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                    >
                                        <StepIndicator>
                                            <StepStatus 
                                                complete={<StepIcon/>}
                                                incomplete={<StepNumber/>}
                                                active={<StepNumber/>}
                                            />
                                        </StepIndicator>

                                        <Box flexShrink='0'>
                                            <StepTitle>{step.title}</StepTitle>
                                            <StepDescription>{step.description}</StepDescription>
                                        </Box>

                                        <StepSeparator />
                                    </Step>
                                ))}
                            </Stepper>

                            <Page 
                                pages={[
                                    (
                                        <VStack spacing={8}>
                                            {/* 이메일 입력필드 */}
                                            <Input
                                                size="md" 
                                                placeholder="EMAIL"
                                                onChange={(event) => setEmail(event.target.value)}
                                                value={email}
                                            />
                                            {/* 비밀번호 입력필드 */}
                                            <InputGroup size="md">
                                                <Input 
                                                    pr='4.5rem' 
                                                    type={show ? 'text' : 'password'}
                                                    placeholder="Enter password"
                                                    onChange={(event) => setPassword(event.target.value)}
                                                    value={password}
                                                />

                                                <InputRightElement width='4.5rem'>
                                                    <Button h='1.75rem' size='sm' onClick={() => {setShow(!show)}}>
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <Button 
                                                colorScheme="blue"
                                                size="lg"
                                                onClick={() => setActiveStep(activeStep+1)}
                                            >다음</Button>
                                        </VStack>
                                    ),
                                    (
                                        <VStack spacing={10}>
                                            
                                        </VStack>
                                    )
                                ]}
                                count={activeStep}
                            />

                        </VStack>
                    </VStack>
                </CardBody>

                {/* 카드 기본 이미지 */}
                <Image
                    objectFit='cover'
                    maxW={{base:'100%', sm: '24rem'}}
                    src="images/writing-letter-image.jpeg"
                    alt="Caffe Latte"
                />
            </Card>
        </Box>
    );
};

export default SignUp;