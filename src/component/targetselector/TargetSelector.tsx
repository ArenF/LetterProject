import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

type TargetSelectorArgs = {
    onClick:React.MouseEventHandler<HTMLButtonElement>,
};

const TargetSelector = (
    { onClick }:TargetSelectorArgs,
):JSX.Element => {
    
    const dispatch = useDispatch();
    const [target, setTarget] = useState('');

    const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

    const isError = target === '' || !emailRegex.test(target);
    
    return (
        <Stack
            w='50em'
            direction='column'
            justifyContent='center'
            alignItems='center'
            display='flex'
        >
            <FormControl isInvalid={isError}>
                <FormLabel>보낼 이메일</FormLabel>
                <Input
                    borderColor='green.600'
                    _focus={{
                        outline:'1px solid #2F855A'
                    }}
                    _autofill={{
                        WebkitBoxShadow: "#000",
                        _hover: {
                            WebkitBoxShadow: "#000",
                        },
                        _active: {
                            WebkitBoxShadow: "#000",
                        },
                        _focus: {
                            WebkitBoxShadow: "#000",
                        },  
                    }}
                    bg='teal.200'
                    color='teal.600'
                    _placeholder={{
                        color:'teal.400'
                    }}
                    placeholder="이메일을 입력하세요!"
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
                        해당 이메일로 보낼 수 있습니다!
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>
                        이메일 형식이 아닙니다
                    </FormErrorMessage>
                )}
            </FormControl>
            {!isError ? (
                <form action="">
                    <Button
                        colorScheme='teal'
                        onClick={onClick}
                    >
                        다음
                    </Button>
                </form>
            ) : (
                <div></div>
            )}
        </Stack>
    );
};

export default TargetSelector;