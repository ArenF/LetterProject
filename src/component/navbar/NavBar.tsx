import { Box, Heading, Stack, Text, Link as ChakraLink, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const MiniProfile = ():JSX.Element => {
    const [text, setText] = useState("SIGNUP");

    return (
        <Stack
            direction="row"
            align="center"
            spacing={4}
        >
            <Linker 
                name={text}
                to="/signup"
            />
            <Avatar />
        </Stack>
    );
};
 
const Linker = ({
    name = "",
    to = "",
}):JSX.Element => {
    
    return (
        <Box
            gap={2}
        >
            <ChakraLink 
                as={RouterLink} 
                to={`${to}`}
            >
                <Text
                    fontWeight="bold"
                    size="lg"
                >
                    {name}
                </Text>
            </ChakraLink>
        </Box>
    );
};

const NavBar = ():JSX.Element => {

    const width = "100vw";
    const height = "6em";

    const LinkList = [
        {
            name: "메일함",
            to: "/mail",
        },
        {
            name: "만들기",
            to: "/send",
        }, 
        {
            name: "로그인",
            to: "/login"
        },
    ];

    return (
        <Stack
            position="fixed"
            w={width}
            h={height}
            direction="row"
            bgColor="whitesmoke"
            gap={0}
        >
            <Stack
                position="relative"
                w="50vw"
                h={height}
                direction="row"
                align="center"
                padding="2em"
            >
                <Heading size={"md"}>LETTERLIKE</Heading>
            </Stack>
            <Stack
                position="relative"
                w="50vw"
                h={height}
                direction="row-reverse"
                align="center"
                padding='2em'
                rowGap={3}
                spacing={12}
            >
                <MiniProfile />
                <Stack
                    direction="row"
                    spacing={6}
                >
                    {LinkList.map((value, index) => (
                        <Linker 
                            key={index}
                            name={value.name}
                            to={value.to}
                        />
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default NavBar;