import { Text, Center, Square, Circle, Box, Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const Linker = ({ text, linkTo }) => (
    <Square w="80px" h="80px">
        <ChakraLink as={Link} to={linkTo}>
            <Text fontSize={"20px"} fontWeight={"bold"}>{text}</Text>
        </ChakraLink>
    </Square>
)

const NavBar = () => {
    return(
        <Center
            position={"fixed"}
            bg={"#006769"} 
            textColor={"white"} 
            w={"100vw"}
            h={"8em"}
        >
            <HStack
                w={"50vw"}
                h="auto"
                justify={"start"}
                paddingLeft={"52px"}
            >
                <Text
                    textAlign={"center"}
                    fontWeight={"bold"}
                    fontSize={"34px"}
                >
                    LETTER LIKE
                </Text>
            </HStack>
            <HStack 
                w={"50vw"}
                h="auto"
                justify={"end"}
            >
                <Linker text={"SEND"} linkTo={"/send"}/>
                <Linker text={"MAIL"} linkTo={"/mail"} />
                <Linker text={"LOGIN"} linkTo={"/login"} />
                <Center
                    padding={"4rem"}
                >
                    <HStack>
                        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"20px"}>NAME</Text>
                        <Circle marginLeft={"15px"} w="4em" h="4em" bg={"white"}></Circle>
                    </HStack>
                </Center>
            </HStack>
        </Center>
    );
};

export default NavBar;