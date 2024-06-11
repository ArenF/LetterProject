import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";

const PasswordFormLabel = ({ password, passwordChange, size, }) => {

    const [show, setShow] = useState('');

    function handleChangePassword(value) {
        passwordChange(value);
    }

    return (
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input 
                    size={size === null ? "md" : size}
                    pr='4.5rem' 
                    type={show ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요."
                    onChange={(event) => handleChangePassword(event.target.value)}
                    value={password}
                />
                
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => {setShow(!show)}}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {}
        </FormControl>
    );
};

export default PasswordFormLabel;