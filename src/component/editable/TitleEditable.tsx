import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, useEditableControls } from "@chakra-ui/react";

type TitleEditableType = {
    fontFamily: string,
    defaultValue: string,
};

const TitleEditable = ({
    fontFamily, defaultValue
}:TitleEditableType) => {

    function EditableControls():JSX.Element {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();
    
        return isEditing ? (
            <ButtonGroup
                justifyContent='center'
                size='sm'
            >
                <IconButton aria-label="check" icon={<CheckIcon/>} {...getSubmitButtonProps()} />
                <IconButton aria-label="cancel" icon={<CloseIcon/>} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center'>
                <IconButton 
                    aria-label="Edit Title"
                    icon={<EditIcon/>}
                    {...getEditButtonProps()}
                />
            </Flex>
        );
    };

    return (
        <>
            <Editable
                textAlign='center'
                defaultValue={defaultValue}
                fontSize='2xl'
                fontFamily={fontFamily}
                isPreviewFocusable={false}
            >
                <EditablePreview />
                <Input as={EditableInput} />
                <EditableControls />
            </Editable>
        </>
    );
};

export default TitleEditable