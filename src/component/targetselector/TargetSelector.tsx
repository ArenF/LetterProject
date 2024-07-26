import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const TargetSelector = ():JSX.Element => {
    
    const dispatch = useDispatch();
    const [target, setTarget] = useState('');

    const isError = target === '';
    
    return (
        <Box>
            <FormControl>
                <FormLabel color='white'>보낼 이메일</FormLabel>
                <Input 
                    color='white'
                    onChange={(event) => {
                        const value = event.target.value;
                        setTarget(value);
                        dispatch({
                            type: 'setTarget',
                            target: value,
                        });

                        console.log(value);
                    }}
                    value={target}
                    name="email"
                />
                {!isError ? (
                    <FormHelperText>
                        보낼 이메일을 입력하세요
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>
                        보낼 대상의 이메일이 하나라도 있어야 합니다!
                    </FormErrorMessage>
                )}
            </FormControl>
        </Box>
    );
};

export default TargetSelector;