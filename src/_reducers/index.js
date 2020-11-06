import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import AlertReducer from "./AlertReducer";
import DataReducer from "./DataReducer";
export default combineReducers({
    alert: AlertReducer,
    auth: AuthReducer,
    data: DataReducer,
});
