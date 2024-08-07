import { CheckCircleIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardHeader, IconButton, Input, InputGroup, InputRightElement, SkeletonCircle, SkeletonText, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { LoginState } from "src/reducer/login";
import { FriendRequestList } from "./FriendRequest";
import SentLetters from "./SentLetters";
import { FriendList } from "./Friend";

const TabRow = ():JSX.Element => {

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
                    <SentLetters />
                </Box> 
            )
        },
        {
            name: "친구",
            content: (
                <Box>
                    <FriendList />
                </Box>
            )
        },
        {
            name: "친구 요청",
            content: (
                <Box>
                    <FriendRequestList />
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
                            >
                                {loginData.name}
                            </Text>
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