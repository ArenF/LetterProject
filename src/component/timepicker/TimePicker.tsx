import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SerializableDate, serializableToDate } from "src/reducer/letter";

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
    const date = useSelector<any, SerializableDate>((state) => state.letter.date);

    useEffect(() => {
        const realDate = serializableToDate(date);
        console.log(realDate);
    });

    return (
        <Stack direction="row">
            <TimePickerColumn 
                defaultValue={date.hour}
                onChange={(s, num) => dispatch({
                    type: 'setHour',
                    hour: num,
                })}
                max={24}
                min={1}
            />
            <TimePickerColumn 
                defaultValue={date.minute}
                onChange={(s, num) => dispatch({
                    type: 'setMinute',
                    minute: num,
                })}
                max={59}
                min={0}
            />
            <TimePickerColumn 
                defaultValue={date.second}
                onChange={(s, num) => dispatch({
                    type: 'setSecond',
                    second: num,
                })}
                max={59}
                min={0}
            />
        </Stack>
    );
};

export default TimePicker;