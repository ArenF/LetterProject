import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, Textarea, useEditableControls } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TitleEditable from "src/component/editable/TitleEditable";
import LetterSideNav from "src/component/navbar/LetterSideNav";
import DraggableSticker from "src/component/stickers/DraggableSticker";
import { LetterState } from "src/reducer/letter";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import moment from "moment";
import TimePicker from "src/component/timepicker/TimePicker";

const LetterCreator = () => {

    const letterData = useSelector<any, LetterState>((state) => state.letter);

    const stickers = letterData.stickers;

    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(0);

    const body = [
        {
            name: '날짜 설정',
            content: (
                <Calendar 
                    onChange={(value:Date) => {
                        setDate(value);
                    }}
                    value={date}
                    calendarType="gregory"
                    formatDay={(locale, date) => moment(date).format("DD")}
                />
            ),
        },
        {
            name: '시간 설정',
            content: (
                <TimePicker />
            ),
        }
    ];

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
                        onDrop={(event) => { event.preventDefault() }}
                    /> 
                </CardBody>
                <CardFooter
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <ButtonGroup isAttached>
                        <Button colorScheme='blue'>
                            전송
                        </Button>
                        <Popover placement="top">
                            <PopoverTrigger>
                                <IconButton 
                                    colorScheme='blue'
                                    aria-label="Set there Calendar"
                                    icon={<CalendarIcon/>}
                                />
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent bgColor='blue.800'>
                                    <PopoverArrow bg='blue.800' />
                                    <PopoverCloseButton color='white' />
                                    <PopoverHeader>
                                        <Text color='white'>
                                            {body[page].name}
                                        </Text>
                                    </PopoverHeader>
                                    <PopoverBody>
                                        {body[page].content}
                                    </PopoverBody>
                                    <PopoverFooter
                                        border='0'
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='space-between'
                                        pb={4}
                                    >
                                        <Box>
                                            <Text
                                                color='white'
                                            >
                                                Step {page+1} of {body.length}
                                            </Text>
                                        </Box>
                                        <ButtonGroup>
                                            <IconButton 
                                                aria-label="go to previous"
                                                icon={<ArrowLeftIcon/>}
                                                color='white'
                                                bg='blue.800'
                                                _hover={{
                                                    bgColor:'blue.700'
                                                }}
                                                onClick={() => {
                                                    const prev = page-1;
                                                    if (prev < 0) {
                                                        return;
                                                    }
                                                    setPage(prev);
                                                }}
                                            />
                                            <IconButton 
                                                aria-label="go to next"
                                                icon={<ArrowRightIcon/>}
                                                color='white'
                                                bg='blue.800'
                                                _hover={{
                                                    bgColor:'blue.700'
                                                }}
                                                onClick={() => {
                                                    const next = page+1;
                                                    if (next > body.length-1) {
                                                        return;
                                                    }
                                                    setPage(next);
                                                }}
                                            />
                                        </ButtonGroup>
                                    </PopoverFooter>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Box>
    );
};

export default LetterCreator;