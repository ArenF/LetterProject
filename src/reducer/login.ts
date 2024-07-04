import { Action } from "redux";

export type LoginState = {
    uid: string,
    name: string,
    photoUrl: string, 
};

export type LoginActions = SuccessAction | SignOutAction;

type SuccessAction = Action<"success"> & {
    uid: string,
    name: string,
    photoUrl: string,
};

type SignOutAction = Action<"signout">;

const initialState:LoginState = {
    uid: '',
    name: '',
    photoUrl: '',
}

export const loginReducer = (
    state: LoginState = initialState,
    action: LoginActions,
) => {
    switch(action.type) {
        case "success":
            return {
                ...state,
                uid: action.uid,
                name: action.name,
                photoUrl: action.photoUrl,
            };
        case "signout":
            return {
                ...state,
                uid: '',
                name: '',
                photoUrl: '',
            }
        default:
            return state;
    }
};