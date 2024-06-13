import { Spinner, ModalContent, ModalOverlay, Modal, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";

const LoaderModal = ({ openCondition }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    useEffect(() => {
        if (openCondition) {
            onOpen();
        } else {
            onClose();
        }
    }, [openCondition]);

    return(
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
        >
            <ModalOverlay 
                bg="blackAlpha.300"
                backdropFilter="blur(10px)"
            />
            <ModalContent
                justifyContent="center"
                alignItems="center"
                bg="transparent"
                shadow="none"
            >
                <Spinner 
                    w="10em"
                    h="10em"
                    thickness="12px"
                    speed="0.5s"
                    emptyColor="gray.200"
                    color="blue.500"
                />
            </ModalContent>
        </Modal>
    );
};

export default LoaderModal;