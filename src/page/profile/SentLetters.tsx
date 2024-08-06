import { Avatar, Box, SkeletonCircle, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import SearchBar from "src/component/search/SearchBar";
import { getLetters, LetterData } from "src/firestore/lettersDB";


type SentLetterElement = {
    name: string,
    body: JSX.Element,
};

const SentLetters = ():JSX.Element => {

    const defaultValue:LetterData[] = [];

    const [letters, setLetters] = useState(defaultValue);
    const [data, setData] = useState([]);

    useEffect(() => {
        getLetters((list) => {
            setLetters(list);
            console.log(list);
        });
    }, []); 

    useEffect(() => {
        if (letters === null)
            return;

        let result:SentLetterElement[] = [];

        letters.forEach((value) => {
            const data = value.data;
            result.push({
                name: data.title,
                body: (
                    <Stack 
                        spacing={4} 
                        flexDirection='row'
                        display='flex'
                        alignItems='center'
                        justifyContent='stretch'
                    >
                        <SkeletonCircle 
                            size='10' 
                            startColor={data.background}
                            endColor={data.background}
                        />
                        <Text>{data.title}</Text>
                    </Stack>
                )
            });
        });

        setData(result);

    }, [letters]);

    return (
        <SearchBar 
            data={data}
        />
    );
};

export default SentLetters;
