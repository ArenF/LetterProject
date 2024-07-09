import { Action } from "redux";

export type RegistState = {
    page: number,
    email: string,
    password: string,
    name: string,
    // base64 text로 저장
    photo: string,
};

export type RegistActions = ChangePageAction | InputEmailAction | InputPasswordAction | InputNameAction | InputPhotoAction | ClearAction;

type ChangePageAction = Action<"changePage"> & {
    page: number,
};

type InputEmailAction = Action<"inputEmail"> & {
    email: string,
};

type InputPasswordAction = Action<"inputPassword"> & {
    password: string,
};

type InputNameAction = Action<"inputName"> & {
    name: string,
};

type InputPhotoAction = Action<"inputPhoto"> & {
    photo: string,
};

type ClearAction = Action<"clear">;

const initialState:RegistState = {
    page: 0,
    email: '',
    password: '',
    name: '',
    photo: '',
};

export const registerReducer = (
    state:RegistState = initialState,
    action:RegistActions
):RegistState => {
    switch(action.type) {
        case "changePage":
            return {
                ...state,
                page: action.page,
            };
        case "inputEmail":
            return {
                ...state,
                email: action.email,
            };
        case "inputPassword":
            return {
                ...state,
                password: action.password,
            };
        case "inputName":
            return {
                ...state,
                name: action.name,
            };
        case "inputPhoto":
            return {
                ...state,
                photo: action.photo,
            };
        case "clear":
            return initialState;
        default:
            return state;
    }
};