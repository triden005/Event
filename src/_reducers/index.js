import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import AlertReducer from "./AlertReducer";

export default combineReducers({
    alert: AlertReducer,
    auth: AuthReducer,
});
