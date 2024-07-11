// 편지 제작용 사이드 내비게이션 바 제작

import { CheckCircleIcon, CloseIcon, HamburgerIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Card, CardHeader, Heading, Icon, IconButton, IconProps, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, ScaleFade, Stack, useDisclosure } from "@chakra-ui/react";
import { ReactElement, ReactNode, useRef, useState } from "react";

type LetterNavElementType = {
    label: string,
    element: ReactNode,
    icon: ReactElement,
};

const LetterNavElement = ({
    label, element, icon = (<PlusSquareIcon/>)
}:LetterNavElementType) => {
    const initialFocusRef = useRef();

    return (
        <Popover
            initialFocusRef={initialFocusRef}
            placement='left'
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <NavButton 
                    label={`show ${label}`}
                    icon={icon}
                />
            </PopoverTrigger>
            <PopoverArrow bg='blue.800' />
            <PopoverContent color="white" bg='blue.800' borderColor='blue.800'>
                <PopoverBody>
                    {element}
                </PopoverBody>
            </PopoverContent>
        </Popover>
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
            isRound={true}
            aria-label={label}
            icon={icon}
            onClick={onClick}
        />
    );
}

const LetterSideNav = () => {
    const { isOpen, onToggle } = useDisclosure();
    
    return (
        <Box
            position="absolute"
            top="20%"
            left="0%"
        >
            <NavButton 
                label="Toggle Nav Bar"
                icon={isOpen ? (<CloseIcon/>) : (<HamburgerIcon/>)}
                onClick={() => onToggle()}
            />
            <ScaleFade
                initialScale={0.9}
                in={isOpen}
            >
                <Stack
                    direction="column"
                >
                    <LetterNavElement 
                        label="font"
                        element={(
                            <Card>
                                
                            </Card>
                        )}
                        icon={<CheckCircleIcon/>}
                    />
                </Stack>
            </ScaleFade>
        </Box>
    );
};

export default LetterSideNav;