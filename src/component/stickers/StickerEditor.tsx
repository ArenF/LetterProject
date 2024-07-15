import { Box, Button, Image, SimpleGrid } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { StickerType } from "src/reducer/letter";

type StickerMakerType = {
    src: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}

const StickerMaker = (
    { src, onClick }:StickerMakerType,
):JSX.Element => {

    return (
        <Button
            w='5em'
            h='5em'
            variant='outline'
            onClick={onClick}
        >
            <Image
                src={src}
            />
        </Button>
    );
};

const StickerEditor = ():JSX.Element => {

    const dispatch = useDispatch();

    const stickers:StickerMakerType[] = [
        {
            src: '/stickers/hi.png',
            onClick: (e) => {
                const sticker = {
                    image: '/stickers/hi.png',
                    x: e.clientX,
                    y: e.clientY,
                };

                console.log(sticker);

                dispatch({
                    type:'addSticker',
                    sticker: sticker,
                });
            },
        }, 
        {
            src: '/stickers/lol.png',
            onClick: (e) => {
                const sticker = {
                    image: '/stickers/lol.png',
                    x: e.clientX,
                    y: e.clientY,
                };

                console.log(sticker);

                dispatch({
                    type:'addSticker',
                    sticker: sticker,
                });
            },
        },
    ];

    return (
        <SimpleGrid column={2} spacing={4}>
            {stickers.map((value, index) => (
                <StickerMaker
                    key={`${index} sticker`}
                    src={value.src}
                    onClick={value.onClick}
                />
            ))}
        </SimpleGrid>
    );
};

export default StickerEditor;