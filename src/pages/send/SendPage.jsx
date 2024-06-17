import { ChevronDownIcon, HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Stack, Card, Text, Input, Textarea, InputGroup, InputRightElement, Menu, MenuButton, IconButton, MenuList, MenuItem, Editable, EditableInput, EditablePreview, useDisclosure, Collapse, Show, Popover, PopoverTrigger, PopoverContent, Portal, PopoverArrow, PopoverBody, PopoverFooter, PopoverHeader, PopoverCloseButton, ButtonGroup, Button, FormControl, FormLabel, Select, Avatar, SimpleGrid, Image } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { ChromePicker, SketchPicker } from "react-color";
import { useNavigate } from "react-router-dom";
import Sticker from "../../components/sticker/Sticker";

const textAreaData = {
    min: 25,
    max: 40
};

const ClickableIcon = ({ label, icon, onClick }) => (
    <IconButton
        w="fit-content"
        size="lg"
        isRound={true}
        variant="solid"
        colorScheme="blue"
        aria-label={label}
        icon={icon}
        onClick={onClick}
    />
);

const StickerButton = ({ onClick = (event) => {}, stickerSrc }) => {
    return (
        <Button 
            colorScheme="blackAlpha" variant="ghost"
            onClick={onClick}  
        >
            <Image 
                src={stickerSrc}
                w="50px" h="50px"
            />
        </Button>
    );
};

const PopoverSticker = ({ dispatch = () => {} }) => {
    const initialFocusRef = useRef();

    // ID 값 따로 정하기 위한 ref
    const index = useRef(0);
    
    return (
        <Box border="1px solid green">
            <Popover
                initialFocusRef={initialFocusRef}
                placement="right"
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <IconButton
                        w="fit-content"
                        size="lg"
                        isRound={true}
                        variant="solid"
                        colorScheme="blue"
                        aria-label="sticker"
                        icon={<ChevronDownIcon/>}
                    />
                </PopoverTrigger>
                <PopoverContent color='white' bg='blue.800' borderColor='blue.800' w="fit-content">
                    <PopoverArrow bg='blue.800'/>
                    <SimpleGrid columns={2} padding={6} spacing={6} >
                        <StickerButton
                            onClick={(event) => {
                                dispatch({
                                    type:'ADD_STICKER',
                                    id: (index.current++),
                                    image:'sticker/hi.png',
                                    x: event.clientX,
                                    y: event.clientY,
                                });
                            }}
                            stickerSrc="sticker/hi.png"
                        />
                        <StickerButton 
                            onClick={(event) => {
                                dispatch({
                                    type:'ADD_STICKER',
                                    id: (index.current++),
                                    image:'sticker/lol.png',
                                    x: event.clientX,
                                    y: event.clientY,
                                });
                            }}
                            stickerSrc="sticker/lol.png"
                        />
                    </SimpleGrid>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

// changeTo 함수는 편지지 배경의 색상을 지정할 때 자동으로 적용되게 하는 함수
// changeTo 함수의 parameter는 color(RGB) 형태로 표현됨 타입은 string
const PopoverColorPicker = ({ changeTo, defaultColor }) => {
    // Focus 상태일 때는 꺼지지 않게 하기 위한 변수
    const initialFocusRef = useRef();
    const [bgColor, setBgColor] = useState(defaultColor);

    return (
        <Popover
            initialFocusRef={initialFocusRef}
            placement='right'
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <IconButton 
                    w="fit-content"
                    size="lg"
                    isRound={true}
                    variant="solid"
                    colorScheme="blue"
                    aria-label="pallete"
                    icon={<SunIcon/>}
                />
            </PopoverTrigger>
            <PopoverContent color='white' bg='blue.800' borderColor='blue.800' w="fit-content">
                <PopoverArrow 
                    bg="blue.800"
                />
                <PopoverBody w="auto">
                    <SketchPicker 
                        color={bgColor}
                        onChangeComplete={(color, event) => {
                            setBgColor(color.hex);
                            changeTo(color.hex);
                        }}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const IconNavigation = ({ onPickColor, pickColor, dispatch }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack
            position="relative"
            left={0}
            top={0}
            maxWidth="20em"
            padding="8px"
            direction="column"
        >
            <ClickableIcon 
                label="hamburger"
                icon={<HamburgerIcon/>}
                onClick={onToggle}
            />
            <Collapse 
                in={isOpen}
            >
                <Stack
                    direction="column"
                >
                    <PopoverColorPicker 
                        changeTo={(rgb) => {
                            onPickColor(rgb);
                            console.log(rgb);
                        }}
                        defaultColor={pickColor}
                    />
                    <PopoverSticker 
                        dispatch={dispatch}
                    />
                </Stack>
            </Collapse>
        </Stack>
    );
};

const SendPage = () => {
    // 텍스트를 가져와서 해당 값들을
    // height를 scrollHeight로 자동 수정하는 것
    
    // const textRef = useRef();
    // const handleResizeHeight = useCallback(() => {

    //     if ((textAreaData.max * 16) > textRef.current.scrollHeight) {
    //         // 기본 25em으로 초기화 
    //         textRef.current.style.height = textAreaData.min + "em";
    //         textRef.current.style.height = textRef.current.scrollHeight + "px";
    //     } 
    // });

    // // 마운트할 때 단 한번 실행
    // useEffect(() => {
    //     textRef.current.style.height = textAreaData.min + "em";
    // }, []);

    const navigate = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user === null) {
                navigate('/login');
            }
        });
    }, []);

    useEffect(() => {
        const storage = getStorage();
        const pathRef = ref(storage, 'profile');

    }, []);

    const [date, setDate] = useState(new Date().toLocaleString());
    const [bgColor, setBgColor] = useState("#DCD6F7");
    const [contexts, setContexts] = useState('');
    const [title, setTitle] = useState('TITLE');

    // 친구 시스템은 보류
    // 일단은 어떻게 저장할 지부터 설정
    const [receiverName, setReceiverName] = useState('');
    const [senderName, setSenderName] = useState('');

    // 스티커 관리 변수 및 함수
    const initialState = [];

    function reducer(state, action) {
        switch(action.type) {
            case 'ADD_STICKER':
                return [...state, {
                    id: action.id,
                    x: action.x,
                    y: action.y,
                    image: action.image,
                }];
            case 'REMOVE_STICKER':
                return state.filter((el) => action.id !== el.id);
            case 'MOVE_STICKER':
                return state.splice(action.id - 1, action.id, {
                    id: action.id,
                    x: action.x,
                    y: action.y,
                    image: action.image,
                });
            default:
                return state;
        };
    }

    const [stickers, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log(stickers);
    }, [stickers]);

    return (
        <Box
            w="100vw"
            h="100vh"
            bgGradient="linear(to-tr, blue.100, gray.50)"
            paddingTop="10em"
        >
            {/* 스티커를 개수만큼 생성하기 위함 */}
            {stickers.map((element, index) => (
                <Sticker 
                    key={index}
                    onDragEnd={(data) => {
                        
                    }}
                    content={(
                        <Image
                            position="absolute"
                            zIndex={3}
                            key={index}
                            src={element.image}
                            w="52px"
                            h="52px"
                        />
                    )}
                    x={element.x}
                    y={element.y}
                />
            ))}
            <IconNavigation
                onPickColor={(color) => setBgColor(color)}
                pickColor={bgColor}
                dispatch={dispatch}
            />
            <Card
                bg="white"
                align="center"
                variant="elevated"
                position={"absolute"}
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
            >
                <Stack
                    padding="1em"
                    background="transparent"
                    backgroundImage={`linear-gradient(${bgColor} 1.2rem, #042F4B 1.4rem)`}
                    backgroundSize="100% 1.3rem"
                    lineHeight="1.2rem"
                    fontSize="1.2rem"
                    direction="column"
                    spacing={4}
                    minW="40em"
                >
                    <Input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        variant="flushed"
                        size="lg"
                        textAlign="center"
                        background="transparent"
                        fontSize="32px"
                        fontWeight="bold"
                    />
                    <Stack direction="row-reverse" w="auto">
                        <Input 
                            w="fit-content"
                            value={date}
                            variant="flushed"
                            size="sm"  
                            readOnly
                            textAlign="right"
                            color="gray.500"
                        />
                    </Stack>
                    <Stack direction="row" w='auto'>
                        {/* 프리뷰 위치 */}
                        <Stack direction="row">
                            <Text></Text>
                        </Stack>
                        <Menu>
                            <MenuButton
                                as={IconButton} icon={<ChevronDownIcon/>}
                            />
                            <MenuList>
                                <MenuItem minH="40px">
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    ); 
};

export default SendPage;