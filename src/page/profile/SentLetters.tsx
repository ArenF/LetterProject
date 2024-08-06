import { Box, Stack } from "@chakra-ui/react";
import SearchBar from "src/component/search/SearchBar";

const SentLetters = ():JSX.Element => {
    
    const data = [
        {
            name: '',
            body: (
                <Box></Box>
            ),
        },
        {
            name: '',
            body: (
                <Box></Box>
            ),
        }
    ]

    return (
        <SearchBar 
            data={data}
        />
    );
};

export default SentLetters;
