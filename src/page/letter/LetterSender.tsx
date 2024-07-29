import { Box, Button, FormControl, FormLabel, Image, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import TargetSelector from "src/component/targetselector/TargetSelector";
import TimePicker from "src/component/timepicker/TimePicker";

const SenderBody = ():JSX.Element => {

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
                <Button
                    colorScheme='teal'
                    onClick={() => {
                        
                    }}
                >
                    다음
                </Button>
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