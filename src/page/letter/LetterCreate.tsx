import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, Textarea, useEditableControls } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import TitleEditable from "src/component/editable/TitleEditable";
import LetterSideNav from "src/component/navbar/LetterSideNav";
import DraggableSticker from "src/component/stickers/DraggableSticker";
import { LetterState, serializableToDate } from "src/reducer/letter";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import moment from "moment";
import TimePicker from "src/component/timepicker/TimePicker";
import TargetSelector from "src/component/targetselector/TargetSelector";
import { useNavigate } from "react-router-dom";

const LetterCreator = () => {

    const dispatch = useDispatch();
    const letterData = useSelector<any, LetterState>((state) => state.letter);

    const stickers = letterData.stickers;

    const navigate = useNavigate();

    return (
        <Box
            w="100vw"
            h='100vh'
            bgGradient="linear(to-tr, #FFF9D0, #5AB2FF)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop='5em'
        >
            <LetterSideNav />

            {stickers.map((value, index) => (
                <DraggableSticker 
                    key={index}
                    index={index}
                    image={value.image}
                    x={value.x}
                    y={value.y}
                />
            ))}

            <Card
                zIndex={1}
                bgColor={letterData.background}
            >
                <CardHeader>
                    <TitleEditable 
                        fontFamily={letterData.fontFamily}
                        defaultValue="타이틀"
                    />
                </CardHeader>
                <CardBody>
                    <Textarea
                        fontFamily={letterData.fontFamily} 
                        fontSize='24px'
                        w="40rem"
                        h="32rem"
                        placeholder="편지의 내용을 입력하세요."
                        resize="none"
                        onDrop={(event) => { 
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                    /> 
                </CardBody>
                <CardFooter
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Button
                        colorScheme='blue' 
                        type="submit"
                        onClick={() => {

                            dispatch({
                                type: 'setWritten',
                                writtneDate: Date.now(),
                            });

                            navigate('/send');
                        }}
                    >
                        전송
                    </Button>
                </CardFooter>
            </Card>
        </Box>
    );
};

export default LetterCreator;