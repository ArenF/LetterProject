import { Action } from "redux";

export type StickerType = {
    image: string,
    x: number,
    y: number,
};

export type LetterState = {
    background: string,
    content: string,
    title: string,
    fontFamily: string,
    stickers: StickerType[],
    navOpen: boolean[],
    date: Date,
};

type EditBackgroundAction = Action<"editBackground"> & {
    background: string,
};

type EditContentAction = Action<"editContent"> & {
    content: string,
};

type EditFontAction = Action<"editFont"> & {
    fontFamily: string,
};

type EditTitleAction = Action<"editTitle"> & {
    title: string,
};

type AddStickerAction = Action<"addSticker"> & {
    sticker: StickerType,
};

type RemoveStickerAction = Action<"removeSticker"> & {
    sticker: StickerType,
};

type SetNavAction = Action<"setNav"> & {
    navOpen: boolean[],
};

type OpenNavAction = Action<"openNav"> & {
    index: number,
};

type CloseNavAction = Action<"closeNav"> & {
    index: number,
};

type CloseNavAllAction = Action<"closeAll">;

type SetDateAction = Action<"setDate"> & {
    date: Date,
};

type ClearAction = Action<"clear">; 

export type LetterActions = 
    EditBackgroundAction | 
    EditContentAction | 
    EditFontAction | 
    EditTitleAction | 
    AddStickerAction | 
    RemoveStickerAction | 
    SetNavAction | 
    OpenNavAction | 
    CloseNavAction | 
    CloseNavAllAction | 
    SetDateAction |
    ClearAction;

const initialState:LetterState = {
    background: '#FFF3DA',
    content: '',
    stickers: [],
    fontFamily: 'Ownglyph_meetme-Rg',
    title: '타이틀',
    navOpen: [false, false, false],
    date: new Date(Date.now() + (1800 * 1000)),
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
        case "editFont":
            return {
                ...state,
                fontFamily: action.fontFamily,
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
            removingTarget.filter((value) => {
                return value !== remover;
            });
            return {
                ...state,
                stickers: removingTarget,
            };
        case "setNav":
            return {
                ...state,
                navOpen: action.navOpen,
            };
        case "openNav":
            const openList = state.navOpen;
            const openNavResult = openList.map((value, index) => {
                if (action.index === index) {
                    value = true;
                } else {
                    value = false;
                }

                return value;
            });

            return {
                ...state,
                navOpen: openNavResult,
            };
        case "closeNav":
            const closeList = state.navOpen;
            const closeNavResult = closeList.map((value, index) => {
                if (action.index === index) {
                    value = false;
                };

                return value;
            });

            return {
                ...state,
                navOpen: closeNavResult,
            };
        case "closeAll":
            const closeAllList = state.navOpen;
            const closeAllResult = closeAllList.map(() => {
                return false;
            });

            return {
                ...state,
                navOpen: closeAllResult,
            };
        case "setDate":
            return {
                ...state,
                date: action.date,
            };
        default:
            return state;
    }
};