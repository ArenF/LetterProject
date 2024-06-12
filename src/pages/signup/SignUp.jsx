import React, { useEffect, useRef, useState } from "react";
import { Input, InputGroup, InputRightElement, Box, Card, CardBody, Image, VStack, Heading, Button, FormErrorMessage } from "@chakra-ui/react";
import { Stepper, Step, StepTitle, StepDescription, StepSeparator, StepIndicator, StepStatus, StepIcon, StepNumber, useSteps } from "@chakra-ui/react";
import { FormControl, Avatar } from "@chakra-ui/react";
import Dropzone from "../../components/DnD/Dropzone";
import EmailFormLabel from "../../components/Form/EmailFormLabel";
import PasswordFormLabel from "../../components/Form/PasswordFormLabel";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Page = ({ pages, count }) => {
    return (
        <Box w='auto' minH="12em" paddingX="1em" margin={10}>
            {pages[count]}
        </Box>
    );
};

const NextButton = ({step, nextStep}) => (
    <Button 
        marginTop={"25px"}
        colorScheme="blue"
        size="lg"
        onClick={() => nextStep(step+1)}
    >다음</Button>
);

const steps = [
    { title: '회원 가입', description: '이메일&패스워드'},
    { title: '프로필', description: '이미지 & 이름'},
    { title: '끝', description: '로그인 하러 가기'}
];

const SignUp = () => {

    const auth = getAuth();
    const storage = getStorage();
    const storageRef = ref(storage);
    const profileRef = ref(storageRef, 'profile');
    const navigate = useNavigate();

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // 프로필 이미지를 가져오고 불러올 수 있도록 함
    // 파일과 해당 파일 이미지의 프리뷰를 모두 저장한다.
    /* 
        **주의** 
        profilePreview는 함부로 사용하지 않는다. 
        useEffect에서 처리하고 있기 때문
    */
    const [profileFile, setProfileFile] = useState(null);
    const [profilePreview, setProfilePreview] = useState('');

    // 이후 모든 값들을 비교해 해당 값들을 정리한다.
    const [submitError, setSubmitError] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');

    //파일 데이터를 가질 input 컴포넌트의 ref 값
    const fileInput = useRef(null);
    const avatarRef = useRef(null);

    // 파일 창을 띄워서 파일을 직접 넣을 수 있도록 함
    function showFileSelect() {
        fileInput.current.click();
    }

    function uploadImageFile({filename, file}) {
        
        const imageRef = ref(profileRef, filename);

        uploadBytes(imageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        })
    }

    // 프로필파일이 업데이트가 되면 자동으로 preview로 변환해서 저장함
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

                            <Box w='full' h='full'>
                                <Page 
                                    pages={[
                                        (
                                            <VStack spacing={8}>
                                                {/* 이메일 입력필드 */}
                                                <EmailFormLabel 
                                                    size="md"
                                                    placeholder="이메일을 입력하세요."
                                                    emailChange={setEmail}
                                                    email={email}
                                                />

                                                {/* 비밀번호 입력필드 */}
                                                <PasswordFormLabel 
                                                    size="md"
                                                    placeholder="패스워드를 입력하세요."
                                                    passwordChange={setPassword}
                                                    password={password}
                                                />

                                                <NextButton 
                                                    step={activeStep}
                                                    nextStep={setActiveStep}
                                                />
                                            </VStack>
                                        ),
                                        (
                                            <VStack spacing={10}>
                                                <Dropzone
                                                    onDrop={(file) => {
                                                        setProfileFile(file);
                                                    }}
                                                >
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
                                                        size="2xl" 
                                                        _hover={{
                                                            transition:"all 0.5s ease-in-out",
                                                            bg:"blackAlpha.700"
                                                        }}
                                                        bg="teal.500"
                                                        onClick={(event) => showFileSelect()}
                                                    />
                                                </Dropzone>
                                                    
                                                <Input
                                                    placeholder="이름을 입력해주세요."
                                                    value={name}
                                                    onChange={(event) => setName(event.target.value)}
                                                />
    
                                                <NextButton 
                                                    step={activeStep}
                                                    nextStep={setActiveStep}
                                                />
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
                                                <FormControl isInvalid={submitError}>

                                                    {
                                                        submitError ? (
                                                            <FormErrorMessage
                                                                textAlign={"center"}
                                                            >
                                                                {submitErrorMessage}
                                                            </FormErrorMessage>
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                    <Button
                                                        onClick={async (event) => {
                                                            createUserWithEmailAndPassword(auth, email, password)
                                                                .then((userCredential) => {
                                                                    const user = userCredential.user;

                                                                    // 프로필 이미지 업로드와 프로필 데이터 변경은 따로 진행
                                                                    // 포토 URL을 storage에서 한번 불러올 때 업데이트 하는 것으로 변경
                                                                    uploadImageFile({
                                                                        filename: user.uid,
                                                                        file: profileFile
                                                                    });

                                                                    updateProfile(user, {
                                                                        displayName: name,
                                                                        photoURL: ''
                                                                    });

                                                                    navigate('/');
                                                                })
                                                                .catch((error) => {
                                                                    const code = error.code;
                                                                    const message = error.message;
                                                                    console.log(code);
                                                                    console.log(message);
                                                                    setSubmitError(true);
                                                                    switch (code) {
                                                                        case "auth/email-already-in-use":
                                                                            setSubmitErrorMessage("이미 이메일이 존재합니다.");
                                                                            break;
                                                                        default:
                                                                            setSubmitErrorMessage("회원가입 중에 오류가 발생하였습니다.");
                                                                    }
                                                                })
                                                        }}
                                                        colorScheme="purple"
                                                    >
                                                        회원가입 하기
                                                    </Button>
                                                </FormControl>
                                                
                                            </Box>
                                        )
                                    ]}
                                    count={activeStep}
                                />
                            </Box>
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