import { Box, Button, ButtonGroup, Card, FormControl, FormLabel, Image, Progress, Stack, Text, useInterval } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TargetSelector from "src/component/targetselector/TargetSelector";
import TimePicker from "src/component/timepicker/TimePicker";
import { createLetterSendObject, LetterSendObject, sendLetters } from "src/firestore/lettersDB";
import { LetterState } from "src/reducer/letter";
import { LoginState } from "src/reducer/login";

const SenderBody = ():JSX.Element => {

    const navigate = useNavigate();
    const letter = useSelector<any, LetterState>((state) => state.letter);
    const login = useSelector<any, LoginState>((state) => state.login);

    const [page, setPage] = useState(0);

    const body = [
        (
            <TargetSelector
                onClick={() => {
                    setPage(page+1);
                }}
            />
        ), 
        (
            <Stack
                direction='column'
                spacing={12}
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Stack
                    direction="row"
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    spacing='8em'
                >
                    <Calendar />
                    <TimePicker/>
                </Stack>
                <ButtonGroup flexDirection='row' display='flex'>
                    <Button
                        colorScheme='teal'
                        onClick={() => {
                            setPage(page-1);
                        }}
                    >
                        이전
                    </Button>
                    <Button
                        colorScheme='teal'
                        onClick={() => {
                            const letterData:LetterSendObject = createLetterSendObject(letter, login);
                            sendLetters(letterData, () => {
                                navigate('/profile');
                            });
                        }}
                    >
                        다음
                    </Button>
                </ButtonGroup>
            </Stack>
        ),
    ];

    return (
        <Box>{body[page]}</Box>
    ); 
};
 
const LetterSender = ():JSX.Element => {

    return (
        <Stack
            zIndex={0}
            position='relative'
            w='100vw'
            h='100vh'
            direction='column'
            display="flex"
            justifyContent='center'
            alignItems='center'
            bgGradient='linear(to-br, yellow.50, cyan.300)'
        >
            <Image 
                w='10em'
                h='10em'
                src="/mail-dynamic-gradient.png"
            />
            <SenderBody />
        </Stack>
    );
};

export default LetterSender;