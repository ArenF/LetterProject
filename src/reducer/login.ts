import { Action } from "redux";

export type LoginState = {
    email: string,
    password: string,
    name: string,
    photoUrl: string,
};

export type LoginActions = EmailInputAction | PasswordInputAction | NameInputAction | PhotoUrlInputAction | ClearAction;

type EmailInputAction = Action<"emailInput"> & {
    email: string,
};

type PasswordInputAction = Action<"passwordInput"> & {
    password: string,
};

type NameInputAction = Action<"nameInput"> & {
    name: string,
};

type PhotoUrlInputAction = Action<"photoInput"> & {
    photoUrl: string,
};

type ClearAction = Action<"clear">;

const initialState:LoginState = {
    email: '',
    password: '',
    name: '',
    photoUrl: '',
};

export const loginReducer = (
    state:LoginState = initialState,
    action:LoginActions
) => {
    switch (action.type) {
        case "emailInput":
            return {
                ...state,
                email: action.email,
            };
        case "passwordInput":
            return {
                ...state,
                password: action.password,
            };
        case "nameInput":
            return {
                ...state,
                name: action.name,
            };
        case "photoInput":
            return {
                ...state,
                photoUrl: action.photoUrl,
            };
        case "clear": 
            return state;
        default:
            return state;
    }
};