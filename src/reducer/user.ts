import { Action } from "redux";

type UserState = {
    id: String,
    name: String,
    myPhoto: String,
    loginDate: Date,
};

type UserActions = setIdAction | setNameAction | setPhotoAction | setLoginDate;

type setIdAction = Action<"setId"> & {
    id: String,
};

type setNameAction = Action<"setName"> & {
    name: String,
};

type setPhotoAction = Action<"setPhoto"> & {
    photo: String,
}

type setLoginDate = Action<"setLoginDate"> & {
    loginDate: Date,
};

const initialState:UserState = {
    id: "",
    name: "",
    myPhoto: "",
    loginDate: new Date(),
};

export const userReducer = (
    state:UserState = initialState,
    action:UserActions
) => {
    switch (action.type) {
        case "setId":
            return { ...state,
                id: action.id,
            };
        case "setName":
            return { ...state,
                name: action.name,
            };
        case "setPhoto":
            return { ...state,
                myPhoto: action.photo,
            };
        case "setLoginDate":
            return { ...state,
                loginDate: action.loginDate,
            };
        default:
            return state;
    }
};