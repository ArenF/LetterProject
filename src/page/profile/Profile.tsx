import { CheckCircleIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardHeader, IconButton, Input, InputGroup, InputRightElement, SkeletonCircle, SkeletonText, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sendFriendsRequest } from "src/firestore/friendsRequest";
import { allProfiles, getProfile, ProfileData } from "src/firestore/profileDB";
import { LoginState } from "src/reducer/login";

type ProfileElementType = {
    uid: string,
    name: string,
    photoUrl: string,
};

const ProfileElement = (
    { uid, name, photoUrl }:ProfileElementType
):JSX.Element => {

    const loginData = useSelector<any, LoginState>((state) => state.login);

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
                    size={"lg"}
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

                    }}
                />
            </Stack>
        </Stack>
    );
};

const ProfileList = ():JSX.Element => {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        allProfiles((list) => {
            list.forEach((value:ProfileData, index:number) => {
                console.log(`id : ${index} => ${value}`);
            })
            setProfiles(list);
        });
    }, []);

    useEffect(() => {
        profiles.forEach((profile:ProfileData) => {
            const name = profile.name;
            const url = URL.createObjectURL(profile.photo);

            console.log(`${name} => ${url}`);
        });
    }, [profiles]);

    if (profiles.length === 0) {
        return (
            <Stack
                paddingTop={4}
                align='stretch'
                direction="column"
            >
                <SkeletonCircle size='10' />
                <SkeletonText spacing={1} skeletonHeight='1' />
            </Stack>
        );
    } else {
        return (
            <Stack
                paddingTop={4}
                align='stretch'
                direction="column"
            >
                {profiles.map((value:ProfileData, index) => (
                    <ProfileElement 
                        key={index + 1}
                        uid={value.uid}
                        name={value.name}
                        photoUrl={URL.createObjectURL(value.photo)}
                    />
                ))}
    
            </Stack>
        );
    }
};

const TabRow = ():JSX.Element => {

    const [search, setSearch] = useState('');

    const tabElements = [
        {
            name: "받은 편지",
            content: (
                <Box>
                    
                </Box>
            ),
        },
        {
            name: "보낸 편지",
            content: (
                <Box>
    
                </Box> 
            )
        },
        {
            name: "친구",
            content: (
                <Box></Box>
            )
        },
        {
            name: "친구 요청",
            content: (
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

                    <ProfileList />
                </Box>
            )
        }
    ];

    return (
        <Tabs>
            <TabList>
                {tabElements.map((value, index) => (
                    <Tab key={index}>{value.name}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {tabElements.map((value, index) => (
                    <TabPanel key={index}>{value.content}</TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}


const Profile = ():JSX.Element => {
    
    const loginData = useSelector<any, LoginState>((state) => state.login);

    return (
        <Box
            w="100vw"
            h="100vh"
            bgGradient="linear(to-tr, #5AB2FF, #FFF9D0)"

            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Card
                w={"32em"}
                h=""
            >
                <CardHeader>
                    {/* 프로필 이미지 */}
                    <Stack
                        direction="row"
                    >
                        <Avatar 
                            src={loginData.photoUrl}
                        />
                        <Stack
                            direction="column"
                        >
                            <Text
                                fontWeight="bold"
                                fontSize="large"
                                color="gray.600"
                            >{loginData.name}</Text>
                            
                        </Stack>
                    </Stack>
                </CardHeader>
                <CardBody>
                    <TabRow />
                </CardBody>
            </Card>
        </Box>
    );
};

export default Profile;