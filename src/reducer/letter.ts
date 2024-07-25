import { Action } from "redux";

export type StickerType = {
    image: string,
    x: number,
    y: number,
};

export type SerializableDate = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
};

export type LetterState = {
    background: string,
    content: string,
    title: string,
    fontFamily: string,
    stickers: StickerType[],
    navOpen: boolean[],
    date: SerializableDate,
    target: string,
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

type SetHourAction = Action<"setHour"> & {
    hour: number,
};

type SetMinuteAction = Action<"setMinute"> & {
    minute: number,
};

type SetSecondAction = Action<"setSecond"> & {
    second: number,
};

type SetDateAction = Action<"setDate"> & {
    year: number,
    month: number,
    day: number,
};

type SetTargetAction = Action<"setTarget"> & {
    target: string,
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
    SetHourAction | SetMinuteAction | SetSecondAction | SetDateAction |
    SetTargetAction |
    ClearAction;

export function serializableToDate(value:SerializableDate):Date {
    let date:Date = new Date();
    date.setFullYear(value.year);
    date.setMonth(value.month);
    date.setDate(value.day);
    date.setHours(value.hour);
    date.setMinutes(value.minute);
    date.setSeconds(value.second);

    return date;
}

export function dateToSerialize(date:Date):SerializableDate {
    const result:SerializableDate = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };

    return result;
}

const initialState:LetterState = {
    background: '#FFF3DA',
    content: '',
    stickers: [],
    fontFamily: 'Ownglyph_meetme-Rg',
    title: '타이틀',
    navOpen: [false, false, false],
    date: dateToSerialize(new Date(Date.now() + (1800 * 1000))),
    target: '',
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
        case "setHour":
            let hourResult = state.date;
            hourResult = {
                ...hourResult,
                hour: action.hour,
            };

            return {
                ...state,
                date: hourResult,
            };
        case "setMinute":
            let minuteResult = state.date;
            minuteResult = {
                ...minuteResult,
                minute: action.minute,
            };

            return {
                ...state,
                date: minuteResult,
            };
        case "setSecond":
            let secondResult = state.date;
            secondResult = {
                ...secondResult,
                second: action.second,
            };

            return {
                ...state,
                date: secondResult,
            };
        case "setDate":
            let dateResult = state.date;
            dateResult = {
                ...dateResult,
                year: action.year,
                month: action.month,
                day: action.day,
            };

            return {
                ...state,
                date: dateResult,
            };
        case "setTarget":
            return {
                ...state,
                target: action.target,
            };
        default:
            return state;
    }
};