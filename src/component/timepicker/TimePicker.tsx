import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TimePickerColumnType = {
    defaultValue: number,
    onChange?:(valueAsString:string, valueAsNumber:number) => void,
    max: number,
    min: number,
};

const TimePickerColumn = ({
    defaultValue, onChange, max, min
}:TimePickerColumnType):JSX.Element => {
    
    return (
        <Stack direction='column'>
            <NumberInput
                color='white'
                bg='blue.700'
                defaultValue={defaultValue}
                max={max}
                min={min}
                size='lg'
                maxW={32}
                onChange={onChange}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper color='white' />
                    <NumberDecrementStepper color='white' />
                </NumberInputStepper>
            </NumberInput>
        </Stack>
    );
};

const TimePicker = ():JSX.Element => {

    const dispatch = useDispatch();
    const date = useSelector<any, Date>((state) => state.letter.date);

    return (
        <Stack direction="row">
            <TimePickerColumn 
                defaultValue={date.getHours()}
                max={24}
                min={1}
            />
            <TimePickerColumn 
                defaultValue={date.getMinutes()}
                max={59}
                min={0}
            />
            <TimePickerColumn 
                defaultValue={date.getSeconds()}
                max={59}
                min={0}
            />
        </Stack>
    );
};

export default TimePicker;