import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Card, CardBody, CardHeader, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, Textarea, useEditableControls } from "@chakra-ui/react";
import TitleEditable from "src/component/editable/TitleEditable";
import LetterSideNav from "src/component/navbar/LetterSideNav";

const LetterCreator = () => {

    return (
        <Box
            w="100vw"
            h='100vh'
            bgGradient="linear(to-tr, #FFF9D0, #5AB2FF)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop='5em'
        >
            <LetterSideNav />

            <Card
                zIndex={1}
                bg='white'
            >
                <CardHeader>
                    <TitleEditable 
                        defaultValue="Title"
                    />
                </CardHeader>
                <CardBody>
                    <Textarea 
                        w="40rem"
                        h="32rem"
                        placeholder="편지의 내용을 입력하세요."
                        resize="none"
                    /> 
                </CardBody>
            </Card>
        </Box>
    );
};

export default LetterCreator;