import { Avatar } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const StickerComponent = ({ id, content }) => {
    const handleDragStart = (event) => {
        
    }

    const handleDrag = (event) => {

    }

    const handleDragEnd = (event) => {

    }

    return (
        <Draggable
            draggableId={id}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDrag}
        >
            {content}
        </Draggable>
    )
};

export default StickerComponent;