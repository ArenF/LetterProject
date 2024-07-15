import { Box, Image } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { StickerType } from "src/reducer/letter";

type DraggableStickerType = {
    index: number,
    image: string,
    x: number,
    y: number,
};

const DraggableSticker = (
    {
        index, image, x, y,
    }:DraggableStickerType
):JSX.Element => {

    const stickerRef = useRef();

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x:x, y:y });

    const handleOnDrag = (e:DraggableEvent, data:DraggableData) => {
        setIsDragging(true);

        setPosition({
            x: data.x,
            y: data.y,
        });
    };

    const handleStopDrag = () => {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    };

    return (
        <Box
            position='absolute'
            zIndex={2}
        >
            <Draggable
                ref={stickerRef}
                position={{
                    x: position.x,
                    y: position.y,
                }}
                onDrag={handleOnDrag}
                onStop={handleStopDrag}
            >
                <Image
                    src={image}
                    width='5em'
                    height='5em'
                />
            </Draggable>
        </Box>
    );
};

export default DraggableSticker;