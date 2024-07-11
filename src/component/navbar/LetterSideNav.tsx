// 편지 제작용 사이드 내비게이션 바 제작

import { CheckCircleIcon, CloseIcon, HamburgerIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, CardFooter, CardHeader, Heading, Icon, IconButton, IconProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, ScaleFade, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { ReactElement, ReactNode, useRef, useState } from "react";

type LetterNavElementType = {
    label: string,
    element: ReactNode,
    icon: ReactElement,
};

const LetterNavElement = ({
    label, element, icon = (<PlusSquareIcon/>)
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
                        isRound={true}
                        aria-label={`show ${label}`}
                        icon={icon}
                    />
                </PopoverTrigger>
                {/* Popover arrow 오류나는 경우가 있음 주의 */}
                <PopoverArrow bg='blue.800' />
                <PopoverCloseButton />
                <PopoverContent
                    color="white" 
                    bg='blue.800' 
                    borderColor='blue.800'
                >
                    <PopoverBody>
                        {element}
                    </PopoverBody>
                </PopoverContent>
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
                    border="1px solid red"
                    position="relative"
                >
                    <LetterNavElement 
                        label="color"
                        element={(
                            <Card>
                                <CardHeader>
                                    <Heading>TITLE</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>
                                        Lorem Ipsum
                                    </Text>
                                </CardBody>
                                <CardFooter>
                                    Datae
                                </CardFooter>
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