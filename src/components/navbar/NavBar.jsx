import { Box, Text, HStack, Link as ChakraLink, Image, Avatar } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
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
            <ChakraLink as={RouterLink} to="/">{name === null ? 'User' : name}</ChakraLink>
            <Avatar 
                src={image}
                name={name}
            />
        </HStack>
    )
}

const NavBar = () => {
    // photoUrl 값은 firebase storage 값을 통해 가져온다.
    const [photoUrl, setPhotoUrl] = useState('');
    const [displayName, setDisplayName] = useState('');

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {

            console.log(user.photoURL);
            console.log(user.displayName);
            setPhotoUrl(user.photoURL);
            setDisplayName(user.displayName);
        } else {

        }
    });

    return (
        <Box
            zIndex="1"
            margin="0"
            w="100vw"
            h="5em"
            position="fixed"
            display="flex"
            bgColor="white"
        >
            <HStack 
                w="100vw"
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
                    <ProfileBox
                        image={photoUrl}
                        name={displayName}
                    />
                </HStack>
            </HStack>
        </Box>
    );
};

export default NavBar;