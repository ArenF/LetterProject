import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Text, Textarea, useEditableControls } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TitleEditable from "src/component/editable/TitleEditable";
import LetterSideNav from "src/component/navbar/LetterSideNav";
import DraggableSticker from "src/component/stickers/DraggableSticker";
import { LetterState } from "src/reducer/letter";

const LetterCreator = () => {

    const letterData = useSelector<any, LetterState>((state) => state.letter);

    const stickers = letterData.stickers;

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
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>
                                        <Text>보낼 날짜</Text>
                                    </PopoverHeader>
                                    <PopoverBody>
                                        
                                    </PopoverBody>
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