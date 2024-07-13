import { Text, Box, Heading, Select, Stack, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LetterState } from "src/reducer/letter";

type OptionsType = {
    value: string,
    text: string,
}

const options:OptionsType[] = [
    {
        value: 'Ownglyph_meetme-Rg',
        text: '밑미 폰트'
    },
    {
        value: 'Ownglyph_ryurue-Rg',
        text: '온글 류류 폰트'
    },
];

const FontEditor = () => {

    const dispatch = useDispatch();
    const letterData = useSelector<any, LetterState>((state) => state.letter);

    return (
        <Box>
            <FormControl>
                <FormLabel>폰트 설정</FormLabel>
                <Select
                    onChange={(event) => {
                        const value = event.target.value;
                        console.log(value);
                        dispatch({
                            type: 'editFont',
                            fontFamily: value,
                        });
                    }}
                    background='blue.800'
                >
                    {options.map((opt, index) => (
                        <option key={index} value={opt.value}>
                            {opt.text}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default FontEditor;