// 편지 제작용 사이드 내비게이션 바 제작

import { CheckCircleIcon, CloseIcon, HamburgerIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardFooter, CardHeader, Grid, Heading, Icon, IconButton, IconProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Portal, ScaleFade, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Children, ReactElement, ReactNode, useRef, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import FontEditor from "../fonts/FontEditor";

type LetterNavElementType = {
    label: string,
    children: ReactNode,
    icon: ReactElement,
};

const LetterNavElement = ({
    label, children, icon = (<PlusSquareIcon/>)
}:LetterNavElementType) => {
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();
    const initialFocusRef = useRef();

    return (
        <Box>
            <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
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

const LetterSideNav = () => {
    const { isOpen, onToggle, } = useDisclosure();

    const [color, setColor] = useState('#000');
    const handleChange = (color:ColorResult) => setColor(color.hex);

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
        },
        {
            label: 'fonts',
            icon: (<CheckCircleIcon/>),
            children: (
                <FontEditor />
            ),
        },
    ];
    
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
                            icon={value.icon}
                            children={value.children}
                        />
                    </ScaleFade>
                ))}
            </Stack>
        </Box>
    );
};

export default LetterSideNav;