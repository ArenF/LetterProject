import { ChevronDownIcon, HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Stack, Card, Text, Input, Textarea, InputGroup, InputRightElement, Menu, MenuButton, IconButton, MenuList, MenuItem, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const textAreaData = {
    min: 25,
    max: 40
};
const ItemNavigation = () => {

    return (
        <Stack
            direction="column"
            left={0}
            top={0}
            width="42px"
            height="auto"
            border="1px solid red"
        >
            <IconButton 
                width="auto"
                aria-label="hamburger"
                icon={<HamburgerIcon/>}
            />
            <IconButton 
                aria-label="pallete"
                icon={<SunIcon/>}
            />
            <IconButton 
                aria-label="sticker"
                icon={<ChevronDownIcon/>}
            />
        </Stack>
    );
};

const SendPage = () => {
    // 텍스트를 가져와서 해당 값들을
    // height를 scrollHeight로 자동 수정하는 것
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {

        if ((textAreaData.max * 16) > textRef.current.scrollHeight) {
            // 기본 25em으로 초기화 
            textRef.current.style.height = textAreaData.min + "em";
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        } 
    });

    // 마운트할 때 단 한번 실행
    useEffect(() => {
        textRef.current.style.height = textAreaData.min + "em";
    }, []);

    const [receiver, setReceiver] = useState('');

    const [paperColor, setPaperColor] = useState('');
    const [lineColor, setLineColor] = useState('');


    return (
        <Box
            w="100vw"
            h="100vh"
            bgGradient="linear(to-tr, blue.100, gray.50)"
            paddingTop="10em"
        >
            <ItemNavigation />
            <Card
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                align="stretch"
                minW="50em" minH="40em"
                /* Background lines */
                backgroundImage="linear-gradient(#FFF8E3 1.5rem, #424874 1.8rem)"
                backgroundSize="100% 1.6rem"
            >
                <Stack
                    direction={'column'}
                    align="stretch"
                    padding="25px"
                    gap={4}
                >
                    <Editable 
                        textAlign="center"
                        fontSize="32px"
                        fontWeight="bold"
                        defaultValue="Title"
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    {/* row-reverse는 오른쪽에서 왼쪽으로 정렬해줌 */}
                    <Stack direction="row-reverse">
                        <Input 
                            size="sm"
                            width='auto'
                            htmlSize={8}
                            readOnly={true}
                            color="gray.500"
                            value={new Date().toLocaleDateString('ko-KR')}
                        />
                    </Stack>
                    <Stack direction="row-reverse" align='baseline'>
                        <Text>에게</Text>
                        <InputGroup
                            width="auto"
                        >
                            <Input 
                                width="auto"
                                htmlSize={6}
                                size='md'
                                overflow="hidden"
                                placeholder="to who?"
                                value={receiver}
                                onChange={(event) => setReceiver(event.target.value)}
                            />
                            <InputRightElement>
                                <Menu>
                                    <MenuButton
                                        size={'sm'}
                                        as={IconButton} 
                                        icon={<ChevronDownIcon/>}
                                    />
                                    <MenuList>
                                        <MenuItem onClick={() => setReceiver("Friend1")}>Friend1</MenuItem>
                                        <MenuItem onClick={() => setReceiver("Friend2")}>Friend2</MenuItem>
                                    </MenuList>
                                </Menu>
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                    <Textarea 
                        resize="none"
                        lineHeight={1.42}
                        fontSize="1.1em"
                        ref={textRef}
                        onInput={handleResizeHeight}
                        border="none"
                        focusBorderColor="transparent"
                        position="relative"
                    />
                    <Stack
                        direction="row"
                        align="baseline"
                    >
                        <InputGroup
                            width="auto"
                        >
                            <Input 
                                width="auto"
                                htmlSize={6}
                                size='md'
                                overflow="hidden"
                                placeholder="from who?"
                                value={receiver}
                                onChange={(event) => setReceiver(event.target.value)}
                            />
                            <InputRightElement>
                                <Menu>
                                    <MenuButton
                                        size={'sm'}
                                        as={IconButton} 
                                        icon={<ChevronDownIcon/>}
                                    />
                                    <MenuList>
                                        <MenuItem onClick={() => setReceiver("Friend1")}>Friend1</MenuItem>
                                        <MenuItem onClick={() => setReceiver("Friend2")}>Friend2</MenuItem>
                                    </MenuList>
                                </Menu>
                            </InputRightElement>
                        </InputGroup>
                        <Text>에게</Text>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    ); 
};

export default SendPage;