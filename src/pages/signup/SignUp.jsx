import React, { useEffect, useRef, useState } from "react";
import { Input, InputGroup, InputRightElement, Box, Card, CardBody, Image, VStack, Heading, Button } from "@chakra-ui/react";
import { Stepper, Step, StepTitle, StepDescription, StepSeparator, StepIndicator, StepStatus, StepIcon, StepNumber, useSteps } from "@chakra-ui/react";
import { Hide, Avatar } from "@chakra-ui/react";
import Dropzone from "../../components/DnD/Dropzone";


const Page = ({ pages, count }) => {
    return (
        <Box w='full' minH="12em" paddingX="5rem" margin={10}>
            {pages[count]}
        </Box>
    );
};

const steps = [
    { title: '회원 가입', description: '이메일&패스워드'},
    { title: '프로필', description: '이미지 & 이름'},
    { title: '끝', description: '로그인 하러 가기'}
];

const SignUp = () => {

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length
    });

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 프로필 이미지를 가져오고 불러올 수 있도록 함
    // 파일과 해당 파일 이미지의 프리뷰를 모두 저장한다.
    const [profileFile, setProfileFile] = useState(null);
    const [profilePreview, setProfilePreview] = useState('');

    //파일 데이터를 가질 input 컴포넌트의 ref 값
    const fileInput = useRef(null);
    const avatarRef = useRef(null);

    // 파일 창을 띄워서 파일을 직접 넣을 수 있도록 함
    function showFileSelect() {
        fileInput.current.click();
    }

    useEffect(() => {
        if (profileFile !== null) {
            const imagePreview = URL.createObjectURL(profileFile);
            setProfilePreview(imagePreview);
        }
    }, [profileFile]);

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
                                                placeholder="Enter email"
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
                                            <Dropzone>
                                                <input 
                                                    type="file"
                                                    ref={fileInput} 
                                                    onChange={(event) => {
                                                        const file = event.target.files[0];
                                                        setProfileFile(
                                                            file === undefined ? null : file
                                                        );
                                                    }}
                                                    style={{display: "none"}}
                                                />
                                                <Avatar 
                                                    src={profilePreview}
                                                    ref={avatarRef}
                                                    _hover={{
                                                        bg:"teal.700",
                                                        transition:"all 0.5s ease-in-out"
                                                    }} 
                                                    size="2xl" 
                                                    bg={profilePreview === '' ? "teal.500" : "gray.50"}
                                                    onClick={(event) => showFileSelect()}
                                                />
                                            </Dropzone>

                                            <Input placeholder="이름" />
                                        </VStack>
                                    ),
                                    (
                                        <Box
                                            w="full"
                                            h="full"
                                            border='1px solid red'
                                            align="center"
                                            alignItems='center'
                                        >
                                            <Button
                                            
                                                colorScheme="purple"
                                            >
                                                로그인 하러 가기
                                            </Button>
                                        </Box>
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