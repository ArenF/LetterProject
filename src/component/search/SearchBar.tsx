import { SearchIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { useState } from "react";

type SearchArgs = {
    data: {
        body:JSX.Element,
        name: string,
    }[],

};

const SearchBar = ({ data }:SearchArgs):JSX.Element => {

    const [context, setContext] = useState('');
    
    return (
        <Box>
            <InputGroup>
                <Input 
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                />
                <InputRightElement>
                    <IconButton 
                        aria-label="search"
                        icon={<SearchIcon/>}
                        onClick={() => {

                        }}
                    />
                </InputRightElement>
            </InputGroup>
            <Stack marginTop='2rem' direction='column'>
                {data.map((value, number) => {
                    const name = value.name;

                    if (!name.startsWith(context)) {
                        return;
                    }

                    return (
                        <Box key={`searchData.${number}`} tabIndex={number}>
                            {value.body}
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    )
};

export default SearchBar;