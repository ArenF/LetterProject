import { Action } from "redux";

export type StickerType = {
    id: number,
    image: string,
    x: number,
    y: number,
};

export type LetterState = {
    background: string,
    content: string,
    title: string,
    stickers: StickerType[],
};

type EditBackgroundAction = Action<"editBackground"> & {
    background: string,
};

type EditContentAction = Action<"editContent"> & {
    content: string,
};

type EditTitleAction = Action<"editTitle"> & {
    title: string,
};

type AddStickerAction = Action<"addSticker"> & {
    sticker: StickerType,
};

type RemoveStickerAction = Action<"removeSticker"> & {
    sticker: StickerType,
}

type ClearAction = Action<"clear">; 

export type LetterActions = EditBackgroundAction | EditContentAction | EditTitleAction | AddStickerAction | RemoveStickerAction | ClearAction;

const initialState:LetterState = {
    background: '#FFF3DA',
    content: '',
    stickers: [],
    title: '타이틀'
};

export const LetterReducer = (
    state:LetterState = initialState,
    action: LetterActions,
):LetterState => {
    switch (action.type) {
        case "editBackground":
            return {
                ...state,
                background: action.background,
            };
        case "editContent":
            return {
                ...state,
                content: action.content,
            };
        case "editTitle":
            return {
                ...state,
                title: action.title,
            };
        case "addSticker":
            const addingTarget = state.stickers;
            return {
                ...state,
                stickers: [
                    ...addingTarget,
                    action.sticker,
                ]
            };
        case "removeSticker":
            const remover = action.sticker;
            let removingTarget = state.stickers;
            removingTarget.filter((value, index) => {
                return value !== remover;
            });
            return {
                ...state,
                stickers: removingTarget,
            };
        default:
            return state;
    }
};