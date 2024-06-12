import { Box, Text, HStack, Link as ChakraLink, Image, Avatar } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
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
    // TODO photoUrl 값은 firebase storage 값을 통해 가져온다.
    // Profile 페이지를 만들어 ProfileBox의 NAME을 통해 이동하게끔 한다.
    // Profile 페이지에서는 firebase의 cloud firestore의 기능을 이용해
    // 친구 요청, 친구, 편지들을 가져오는 기능을 만들 것 
    const [photoUrl, setPhotoUrl] = useState('');
    const [displayName, setDisplayName] = useState('');

    // 스토리지를 통한 이미지 불러오기

    const storage = getStorage();
    const storageRef = ref(storage);
    const profileRef = ref(storageRef, '/profile');

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uidRef = ref(profileRef, '/' + user.uid);
            getDownloadURL(uidRef)
                .then((url) => {
                    setPhotoUrl(url);
                })
                .catch((error) => {

                });
            
            setDisplayName(user.displayName);

            console.log({
                name: displayName,
                photo: photoUrl
            });

        } else {
            setDisplayName('Sign Out');
            setPhotoUrl('');
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