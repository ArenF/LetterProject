import { SearchIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

export const FriendList = () => {
    
    const [search, setSearch] = useState('');

    return (
        <Box>
            <InputGroup>
                <Input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputRightElement>
                    <IconButton 
                        aria-label="search"
                        icon={<SearchIcon/>}
                        onClick={() => {}}  
                    />
                </InputRightElement>
            </InputGroup>
        </Box>
    );
};
