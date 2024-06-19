import { Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel, IconButton, Image, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getLetterData } from "../../db/LetterDB";
import { HamburgerIcon } from "@chakra-ui/icons";
import { setDefaultEventParameters } from "firebase/analytics";
import { getProfileIfExists } from "../../db/ProfileDB";

const LetterShowPage = ({title, receiverName, bgColor, date, context, stickers}) => {
    const textRef = useRef();

    return (
        <Card
            w="auto"
            h="auto"
            backgroundImage={`linear-gradient(${bgColor} 1.2rem, #042F4B 1.4rem)`}
            backgroundSize="100% 1.3rem"
        >
            <CardHeader>
                <Input 
                    value={title}
                    readOnly={true}
                    size="lg"   
                    textAlign="center"
                    background="transparent"
                    fontSize="32px"
                    fontWeight="bold"
                />
            </CardHeader>
            <CardBody>
                <Stack
                    padding="1em"
                    lineHeight="1.2rem"
                    fontSize="1.2rem"
                    direction="column"
                    spacing={4}
                    minW="40em"
                >
                    {/* Date */}
                    <Stack direction="row-reverse" w="auto">
                        <Input 
                            w="fit-content"
                            value={date}
                            variant="flushed"
                            size="sm"
                            readOnly={true}
                            textAlign="right"
                            color="gray.500"
                        />
                    </Stack>

                    <Stack direction="row" w='auto'>
                        {/* 프리뷰 위치 */}
                        <Stack direction="row" zIndex={2}>
                            <FormControl>
                                <FormLabel>받는 사람</FormLabel>
                                <InputGroup size='md'>
                                    <Input 
                                        value={receiverName}
                                        readOnly={true}
                                        placeholder=""
                                    />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <Textarea 
                        backgroundColor="transparent"
                        placeholder="내용을 입력하세요"
                        value={context}
                        border="none"
                        readOnly={true}
                        onChange={(event) => {
                            handleResizeHeight();
                        }}
                        ref={textRef}
                        fontSize="1.2rem"
                        resize="none"
                    />
                </Stack>
            </CardBody>
        </Card>
    );
}

const MailPage = () => {
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [date, setDate] = useState('');
    const [context, setContext] = useState('');
    const [stickers, setStickers] = useState([]);

    useEffect(() => {
        // 프로필 또는 다른 페이지에서 값을 받았는지 안 받았는지를 결정
        // setLetterData(location.state);
        const mailData = location.state;
        console.log(mailData);

        getLetterData(mailData.letterId)
        .then((letter) => {
            console.log(letter);
            setTitle(letter.title);
            getProfileIfExists(letter.receiverId)
            .then((profile) => {
                setReceiverName(profile.displayName);
            })
            .catch((err) => console.log("받는 상대가 존재하지 않습니다 : " + err));
            setBgColor(letter.background);
            setContext(letter.context);
            setDate(new Date(letter.writtenDate.seconds).toLocaleString("ko-kr"));
            setStickers(letter.stickers);
        })
        .catch((err) => {
            console.log(err);
        })


    }, [location]);

    return (
        <Box
            position="relative"
            w="100vw"
            h="100vh"
            bgGradient="linear(to-tr, gray.100, blue.300)"
            paddingTop="6em"
            justifyContent="center"
            alignItems="center"
            display='flex'
        >
            {location.state !== null ? (
                <LetterShowPage
                    title={title}
                    context={context}
                    receiverName={receiverName}
                    bgColor={bgColor}
                    date={date}
                />
            ) : (
                <Box>

                </Box>
            )}
        </Box>
    );
};

export default MailPage;