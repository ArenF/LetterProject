import { Box, Divider, IconButton, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const FriendList = () => {

    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
                
    }, []);

    return (
        <Stack direction='column'>
            <Text color='gray.400'>요청</Text>
            <Divider />
            <Text color='gray.400'>친구</Text>
            <Divider />
        </Stack>
    );
};
