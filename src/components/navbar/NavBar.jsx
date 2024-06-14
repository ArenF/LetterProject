import { Box, Text, HStack, Link as ChakraLink, Image, Avatar } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import LoaderModal from "../loader/LoaderModal";

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
            <ChakraLink 
                as={RouterLink} 
                to={name === null ? "/signup" : "/profile" }
            >{name === null ? 'Sign Up' : name}</ChakraLink>
            <Avatar 
                src={image}
                name={name}
            />
        </HStack>
    )
}

const NavBar = () => {
    // auth에서 가져올 이미지와 이름
    const [photoUrl, setPhotoUrl] = useState('');
    const [displayName, setDisplayName] = useState('');

    // 로딩할 때 사용할 로더
    const [showLoader, setShowLoader] = useState(true);

    // 이미지가 아직 불러오기 전이며 auth에 가입이 되어있다면
    // displayName은 auth에서 값을 바로 가져오지만
    // image URL은 불러오는데 용량이 있는 편
    // 그렇기에 조건은 로그인 상태이면서 이미지가 없는 상태
    // 실행은 로더 이미지를 띄우는 것이다.

    useEffect(() => {
        if (photoUrl === '' && displayName !== '') {
            setShowLoader(true);
        }
        if (showLoader && photoUrl !== '') {
            // 이미지 로딩 후 딜레이
            setInterval(() => setShowLoader(false), 400);
        }
    }, [photoUrl]);

    // 스토리지를 통한 이미지 불러오기
    const storage = getStorage();
    const storageRef = ref(storage);
    const profileRef = ref(storageRef, '/profile');

    // auth 기능을 통해 이미 로그인된 유저의 데이터를 가져옴
    const auth = getAuth();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uidRef = ref(profileRef, '/' + user.uid);
                if (user.photoURL === null || user.photoURL === '') {
                    getDownloadURL(uidRef)
                    .then((url) => {
                        updateProfile(user, {
                            displayName: user.displayName,
                            photoURL: url
                        });
                    })
                    .catch((error) => {
    
                    });
                }
                
                setDisplayName(user.displayName == null ? '' : user.displayName);
                setPhotoUrl(user.photoURL == null ? '' : user.photoURL);
            }
        });
    }, []);

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
            <LoaderModal  
                openCondition={showLoader}
            />
        </Box>
    );
};

export default NavBar;