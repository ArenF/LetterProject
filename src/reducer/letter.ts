
export type StickerType = {
    image: string,
    x: number,
    y: number,
};

export type LetterState = {
    background: string,
    content: string,
    title: string,
    sticker: StickerType[],
    
};