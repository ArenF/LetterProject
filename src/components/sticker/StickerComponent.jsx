import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const StickerComponent = ({ id, context, index }) => {
    return (
        <Draggable draggableId={id} index={index} >
            {(provided) => {
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        background: 'yellow',
                        padding: '10px',
                        margin: '10px',
                        borderRadius: '4px'
                    }}
                >
                    {context}
                </div>
            }}
        </Draggable>
    )
};

export default StickerComponent;