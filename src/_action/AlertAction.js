import { SET_ALERT, CLEAR_ALERT } from "./action_types";
///import action type for error action

export const AddAlert = (msg, status) => {
    return {
        type: SET_ALERT,
        payload: { msg, status },
    };
};
//

export const ClearAlert = () => {
    return {
        type: CLEAR_ALERT,
    };
};
