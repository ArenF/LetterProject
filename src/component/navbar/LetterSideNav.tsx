// 편지 제작용 사이드 내비게이션 바 제작

import { CheckCircleIcon, CloseIcon, HamburgerIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardFooter, CardHeader, Grid, Heading, Icon, IconButton, IconProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Portal, ScaleFade, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Children, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import FontEditor from "../fonts/FontEditor";
import { useDispatch, useSelector } from "react-redux";
import { LetterState } from "src/reducer/letter";

type LetterNavElementType = {
    label: string,
    children: ReactNode,
    icon: ReactElement,
    index: number,
};

const LetterNavElement = ({
    label, icon, children, index
}:LetterNavElementType) => {

    const initialFocusRef = useRef();

    const navOpen = useSelector<any, boolean[]>((state) => state.letter.navOpen);
    const dispatch = useDispatch();

    const open = navOpen[index];

    return (
        <Box>
            <Popover
                isOpen={open}
                onOpen={() => {
                    dispatch({
                        type:'openNav',
                        index: index,
                    });
                }}
                onClose={() => {
                    dispatch({
                        type:'closeNav',
                        index: index,
                    });
                }}
                initialFocusRef={initialFocusRef}
                placement='right'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <IconButton 
                        size='lg'
                        isRound={true}
                        aria-label={`show ${label}`}
                        icon={icon}
                    />
                </PopoverTrigger>
                {/* Popover arrow 오류나는 경우가 있음 주의 */}
                <Portal>
                    <PopoverContent
                        color="white" 
                        bg='blue.800' 
                        borderColor='blue.800'
                    >
                        <PopoverArrow bg='blue.800' />
                        <PopoverBody>
                            {children}
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Box>
    );
};

type NavButtonType = {
    label: string,
    icon: ReactElement,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
};

const NavButton = ({
    label, icon, onClick
}:NavButtonType) => {
    return (
        <IconButton 
            size='lg'
            isRound={true}
            aria-label={label}
            icon={icon}
            onClick={onClick}
        />
    );
}

type DisclosureType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
};

const LetterSideNav = () => {
    const { isOpen, onToggle, } = useDisclosure();

    const letterData = useSelector<any, LetterState>((state) => state.letter);
    const dispatch = useDispatch();

    const [color, setColor] = useState(letterData.background);
    const handleChange = (color:ColorResult) => {
        setColor(color.hex)

        dispatch({
            type: "editBackground",
            background: color.hex,
        });
    };

    const navElements:LetterNavElementType[] = [
        {
            label: "bgcolor",
            icon: (<CheckCircleIcon/>),
            children: (
                <Box>
                    <ChromePicker
                        color={color}
                        onChange={handleChange}
                    />
                </Box>
            ),
            index: 0,
        },
        {
            label: 'fonts',
            icon: (<CheckCircleIcon/>),
            children: (
                <FontEditor/>
            ),
            index: 1,
        },
    ];

    useEffect(() => {
        if (!isOpen) {
            dispatch({
                type:'closeAll'
            });
        }
    }, [isOpen]);
    
    return (
        <Box
            position="absolute"
            top="20%"
            left="0%"
            margin='0.5em'
        >
            <NavButton 
                label="Toggle Nav Bar"
                icon={isOpen ? (<CloseIcon/>) : (<HamburgerIcon/>)}
                onClick={() => onToggle()}
            />
            <Stack
                direction="column"
                position="relative"
                marginTop='0.2em'
            >
                {navElements.map((value, index) => (
                    <ScaleFade
                        key={`fade : ${index}`}
                        delay={index * 0.1}
                        initialScale={0.9}
                        in={isOpen}
                    >
                        <LetterNavElement 
                            key={`letterNav : ${index}`}
                            label={value.label}
                            children={value.children}
                            icon={value.icon}
                            index={index}
                        />
                    </ScaleFade>
                ))}
            </Stack>
        </Box>
    );
};

export default LetterSideNav;