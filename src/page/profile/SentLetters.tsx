import { Avatar, Box, Link as ChakraLink, SkeletonCircle, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "src/component/search/SearchBar";
import { getLettersSent, LetterData } from "src/firestore/lettersDB";


type SentLetterElement = {
    name: string,
    body: JSX.Element,
};

const SentLetters = ():JSX.Element => {

    const navigate = useNavigate();

    const defaultValue:LetterData[] = [];

    const name:string = useSelector<any, string>((state) => state.login.name);

    const [letters, setLetters] = useState(defaultValue);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (letters.length === 0) {
            getLettersSent(name, (list) => {
                setLetters(list);
            });
            return;
        }

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
                        <ChakraLink
                            fontWeight='bold'
                            onClick={() => {
                                navigate('/letter', data.id);
                            }}
                        >
                            {data.title}
                        </ChakraLink>
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
