import { Stack } from "@chakra-ui/react";

const NavBar = ():JSX.Element => {
    return (
        <Stack
            position="fixed"
            w="100vw"
            h="6em"
            direction="row"
            bgColor="whitesmoke"
        >
            <Stack
                w="auto"
                h="max-content"
                direction="row"
                border="1px solid red"
            >

            </Stack>
            <Stack
                w="auto"
                h="max-content"
                direction="row-reverse"
                border="1px solid red"
            >
                
            </Stack>
        </Stack>
    );
};

export default NavBar;