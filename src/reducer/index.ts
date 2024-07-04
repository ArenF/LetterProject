import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { registerReducer } from "./regist";

const rootReducer = combineReducers({
    login:loginReducer,
    regist:registerReducer,
});

export default rootReducer;
