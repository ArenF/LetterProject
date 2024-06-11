import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const EmailFormLabel = ({email, emailChange, placeholder, size}) => {
    const handleEmailInputChange = (value) => {
        emailChange(value);
    };

    const isError = email === '' || email === null;

    return (
        <FormControl isRequired isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input
                isInvalid={isError}
                size={size === null || size === '' ? "md" : size}
                type="email"
                placeholder={placeholder}
                id="emailForm"
                value={email}
                onChange={(event) => handleEmailInputChange(event.target.value)}
            />
            {!isError ? (
                <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
            ) : (
                <FormErrorMessage>Email is required</FormErrorMessage>
            )}
        </FormControl>
    );
};

export default EmailFormLabel;