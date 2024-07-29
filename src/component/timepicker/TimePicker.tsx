import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SerializableDate, serializableToDate } from "src/reducer/letter";

type TimePickerColumnType = {
    defaultValue: number | string,
    onChangeNumber?: (value:number) => void,
    onChange?: (value:string) => void,
    value?: string,
    max: number,
    min: number,
};

const TimePickerColumn = ({
    defaultValue, onChangeNumber, onChange, value, max, min
}:TimePickerColumnType):JSX.Element => {
    
    return (
        <NumberInput
            borderRadius='15px'
            color='white'
            bg='cyan.600'
            defaultValue={defaultValue}
            max={max}
            min={min}
            size='lg'
            maxW={32}
            onChange={(str, num) => {
                onChangeNumber(num);
                onChange(str);
            }}
            value={value}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper color='white' />
                <NumberDecrementStepper color='white' />
            </NumberInputStepper>
        </NumberInput>
    );
};

const TimePicker = ():JSX.Element => {

    const dispatch = useDispatch();
    const date = useSelector<any, SerializableDate>((state) => state.letter.date);

    useEffect(() => {
        const realDate = serializableToDate(date);
        console.log(realDate);
    });

    const [hour, setHour] = useState(`${date.hour}시`);
    const [minute, setMinute] = useState(`${date.minute}분`);
    const [second, setSecond] = useState(`${date.second}초`);

    return (
        <Stack 
            direction="column"
            spacing="3.5em"
        >
            <TimePickerColumn 
                defaultValue={hour}
                onChangeNumber={(num) => dispatch({
                    type: 'setHour',
                    hour: num,
                })}
                onChange={(hour) => {
                    setHour(`${hour}시`);
                }}
                value={hour}
                max={24}
                min={1}
            />
            <TimePickerColumn 
                defaultValue={minute}
                onChangeNumber={(num) => dispatch({
                    type: 'setMinute',
                    minute: num,
                })}
                onChange={(val) => {
                    setMinute(`${val}분`);
                }}
                value={minute}
                max={59}
                min={0}
            />
            <TimePickerColumn 
                defaultValue={second}
                onChangeNumber={(num) => dispatch({
                    type: 'setSecond',
                    second: num,
                })}
                onChange={(val) => {
                    setSecond(`${val}초`);
                }}
                value={second}
                max={59}
                min={0}
            />
        </Stack>
    );
};

export default TimePicker;