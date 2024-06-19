import { Link as ChakraLink, Text, Heading, Box, Card, CardHeader, Grid, GridItem, Avatar, Tabs, TabPanels, TabPanel, TabList, Tab, useColorModeValue, Stack, Icon } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLettersWithReceiverId } from "../../db/LetterDB";
import { CheckIcon } from "@chakra-ui/icons";


const TabRow = ({rows, colorMode}) => {

    // 탭로우를 꾸며주는 변수들
    const colors = useColorModeValue(colorMode);
    const [tabIndex, setTabIndex] = useState(0);
    const bg = colors[tabIndex];
    const tabs = rows.tabs;
    const panels = rows.panels;

    return (
        <Tabs 
            size='md'
            onChange={(index) => setTabIndex(index)}
            bg={bg}
            borderBottomRadius="12px"
        >
            <TabList>
                {
                    tabs.map((tab,index) =>( <Tab key={index}>{tab}</Tab> ))
                }
            </TabList>
            <TabPanels>
                {
                    panels.map((panel, index) => ( <TabPanel key={index}>{panel}</TabPanel> ))
                }
            </TabPanels>
        </Tabs>
    )
};

const LetterPage = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    const [letters, setLetters] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                getLettersWithReceiverId(uid).then((value) => {
                    value.forEach(el => {
                        const data = el.data();
                        data["id"] = el.id;
                        setLetters([...letters, data]);
                    });
                    return;
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                alert("로그인 되어 있지 않습니다.");
                navigate('/login');
            }
        });
    }, []);

    useEffect(() => {
        console.log(letters);
        console.log(letters.length);
    }, [letters]);

    return (
        <Stack direction="column">
            {letters.map((letter, index) => (
                <Stack key={index} direction="row" align="baseline">
                    <Icon as={CheckIcon} color="green" />
                    <ChakraLink
                        onClick={() => {
                            navigate('/mail', { state:{ received:true, letterId:letter.id } });
                        }}
                    >
                        {letter.title}
                    </ChakraLink>
                </Stack>
            ))}
        </Stack>
    );
};

const Profile = () => {
    const [photoUrl, setPhotoUrl] = useState('');
    const [displayName, setDisplayName] = useState('');
    
    const navigate = useNavigate();

    const auth = getAuth();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhotoUrl(user.photoURL);
                setDisplayName(user.displayName);
            } else {
                navigate('/login');
            }
        });
    }, []);
    
    return (
        <Box
            w="100vw"
            h="100vh"
            bgGradient="linear(to-tr, blue.300, gray.50)"
        >
            <Card
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                size='lg'
                variant="elevated"
                bg="white"
                align="stretch"
            >
                <CardHeader>
                    <Grid
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}
                        border="1px solid yellow"
                    >
                        <GridItem rowSpan={2} colSpan={1}>
                            <Avatar 
                                size={'xl'}
                                src={photoUrl}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Heading
                                size='lg'
                            >
                                {displayName}
                            </Heading>
                        </GridItem>
                        <GridItem colSpan={4}>
                            <Text color="gray.500">Text</Text>
                        </GridItem>
                    </Grid>
                </CardHeader>
                <TabRow 
                    rows={{
                        tabs:["보낸 편지", "받은 편지", "친구", "친구 요청"],
                        panels:[
                            (
                                <LetterPage/>
                            ), 
                            (
                                <Text>2번</Text>
                            ), 
                            (
                                <Text>3번</Text>
                            ), 
                            (
                                <Text>4번</Text>
                            )
                        ]
                    }}
                    colorMode={['red.50', 'teal.50', 'blue.50', 'yellow.50']}
                />
            </Card>
        </Box>
    );
};

export default Profile;