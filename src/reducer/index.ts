import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { registerReducer } from "./regist";
import { LetterReducer } from "./letter";

const rootReducer = combineReducers({
    login:loginReducer,
    regist:registerReducer,
    letter:LetterReducer,
});

export default rootReducer;
