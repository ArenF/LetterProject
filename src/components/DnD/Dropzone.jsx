import { Box } from "@chakra-ui/react";
import React from "react";

const Dropzone = ({children}) => {
    const handleDragEnter = (event) => {
        event.preventDefault();
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
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
