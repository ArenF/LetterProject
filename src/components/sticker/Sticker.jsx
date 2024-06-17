import React, { useRef } from "react";
import Draggable from "react-draggable";

const Sticker = ({ content, onDragEnd = (data) => {}, x = 0, y = 0, }) => {

    return (
        <Draggable
            defaultPosition={{x:x, y:y}}
            onStop={(e, data) => onDragEnd(data)}
        >
            {content}
        </Draggable>
    );
};

export default Sticker;