import { Box, Text, HStack, Link as ChakraLink, Image } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const NavLinker = ({to, text}) => {
    return (
        <ChakraLink
            as={RouterLink}
            to={to}
            fontWeight="bold"
            fontSize="large"
        >
            {text}
        </ChakraLink>
    );
};

const ProfileBox = ({ image, name }) => {
    return (
        <HStack>
            <ChakraLink as={RouterLink} to="/">{name}</ChakraLink>
            <Image 
                borderRadius='full'
                boxSize='50px'
                src= {image == null ? 'https://bit.ly/dan-abramov' : image}
                alt='Dan Abramov'
            />
        </HStack>
    )
}

const NavBar = () => {
    return (
        <Box
            zIndex="1"
            margin="0"
            w="100vw"
            h="5em"
            position="fixed"
            display="flex"
        >
            <HStack 
                w="100vw"
                border="1px solid red"
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingX="2rem"
            >
                <Text
                    marginRight="65em"
                    size="xl"
                    fontWeight="bold"
                >
                    LETTERLIKE
                </Text>
                <HStack
                    position="relative"
                    spacing="2em"
                    display="flex"
                    justifyContent="right"
                    alignItems="center"
                >
                    <NavLinker to="/mail" text="MAIL" />
                    <NavLinker to="/send" text="SEND" />
                    <NavLinker to="/template" text="TEMPLATE" />
                    <NavLinker to="/login" text="LOGIN" />

                    {/* 프로필 박스 */}
                    <ProfileBox name="Dan Albert" />
                </HStack>
            </HStack>
        </Box>
    );
};

export default NavBar;