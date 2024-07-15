import { Box, Button, Image, SimpleGrid } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

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

    const stickers:StickerMakerType[] = [
        {
            src: '/stickers/hi.png',
            onClick: () => {

            },
        }, 
        {
            src: '/stickers/lol.png',
            onClick: () => {

            },
        },
    ];

    return (
        <SimpleGrid column={2} spacing={4}>
            {stickers.map((value, index) => (
                <StickerMaker 
                    key={index}
                    src={value.src}
                    onClick={value.onClick}
                />
            ))}
        </SimpleGrid>
    );
};

export default StickerEditor;