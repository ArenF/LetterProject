import { Action } from "redux";

export type LoginState = {
    uid: string,
    name: string,
    photoUrl: string, 
    loggedIn: Boolean,
};

export type LoginActions = SuccessAction | SignOutAction;

type SuccessAction = Action<"signin"> & {
    uid: string,
    name: string,
    photoUrl: string,
};

type SignOutAction = Action<"signout">;

const initialState:LoginState = {
    uid: '',
    name: '',
    photoUrl: '',
    loggedIn: false,
}

export const loginReducer = (
    state: LoginState = initialState,
    action: LoginActions,
) => {
    switch(action.type) {
        case "signin":
            return {
                ...state,
                uid: action.uid,
                name: action.name,
                photoUrl: action.photoUrl,
                loggedIn: true,
            };
        case "signout":
            return {
                ...state,
                uid: '',
                name: '',
                photoUrl: '',
                loggedIn: false,
            }
        default:
            return state;
    }
};