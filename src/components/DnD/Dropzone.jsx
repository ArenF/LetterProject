import { Box, transition } from "@chakra-ui/react";
import React from "react";

const Dropzone = ({children, onDrop}) => {
    const handleDragEnter = (event) => {
        event.preventDefault();
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        if (file === undefined || file === null)
            return;
        console.log(file);
        onDrop(file);
    }
    
    return (
        <Box
            className="drag-drop-zone"
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
        >
            {children}
        </Box>
    );
};

export default Dropzone;
