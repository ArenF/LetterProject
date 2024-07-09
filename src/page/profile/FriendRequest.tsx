import { Stack, Avatar, Text, IconButton, Box, InputGroup, Input, InputRightElement, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { CheckCircleIcon, SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { sendFriendsRequest } from "src/firestore/friendsRequest";
import { useSelector } from "react-redux";
import { LoginState } from "src/reducer/login";
import { allProfiles, ProfileData } from "src/firestore/profileDB";
import { ReactNode } from "react";

// 친구 요청 페이지
type FriendRequestElementType = {
    userUid: string,
    uid: string,
    name: string,
    photoUrl: string,
};

const FriendRequestElement = (
    { userUid, uid, name, photoUrl }:FriendRequestElementType,
):JSX.Element => {
    return (
        <Stack
            direction="row"
            align='center'
            spacing={8}
            justify='stretch'
            position="relative"
        >
            <Stack
                position="relative"
                w="50%"
                h="100%"
                direction="row"
                align='center'
                justify='stretch'
            >
                <Avatar 
                    src={photoUrl}
                />
                <Text
                    size="lg"
                >{name}</Text>
            </Stack>
            <Stack
                position="relative"
                w="50%"
                h="100%"
                direction="row-reverse"
                align='center'
                justify='stretch'
            >
                <IconButton 
                    variant='outline'
                    aria-label="friend request"
                    icon={<CheckCircleIcon bgSize={10}/>}
                    color='green'
                    onClick={() => {
                        sendFriendsRequest({
                            requestId: userUid,
                            receiveId: uid,
                            accepted: false,
                        });
                    }}
                />
            </Stack>
        </Stack>
    );
};

export const FriendRequestList = ():JSX.Element => {

    const [search, setSearch] = useState('');
    const [profiles, setProfiles] = useState([]);

    const loginData = useSelector<any, LoginState>((state) => state.login);

    useEffect(() => {
        allProfiles((list) => {
            list.forEach((value:ProfileData, index:number) => {
                console.log(`id : ${index} => ${value}`);
            });
            setProfiles(list);
        });
    }, []);

    useEffect(() => {
        allProfiles((list) => {
            const result = list.filter((value:ProfileData) => {
                const name = value.name;
                return name.startsWith(search);
            });

            setProfiles(result);
        });
    }, [search]);

    const ProfileListStack = ({children}:{children:ReactNode}) => (
        <Stack
            paddingTop={4}
            align='stretch'
            direction='column'
        >
            {children}
        </Stack>
    );

    return (
        <Box>
            <InputGroup>
                <Input 
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <InputRightElement>
                    <IconButton 
                        aria-label="Search Friends"
                        icon={<SearchIcon/>}
                    />
                </InputRightElement>
            </InputGroup>
            {
                profiles.length === 0 ? (
                    <ProfileListStack>
                        <SkeletonCircle size='10' />
                        <SkeletonText spacing={1} skeletonHeight='1' />
                    </ProfileListStack>
                ) : (
                    <ProfileListStack>
                        {profiles.map((value:ProfileData, index) => (
                            <FriendRequestElement
                                key={index}
                                uid={value.uid}
                                name={value.name}
                                photoUrl={URL.createObjectURL(value.photo)}
                                userUid={loginData.uid}
                            />
                        ))}
                    </ProfileListStack>
                )
            }
        </Box>
    );
};