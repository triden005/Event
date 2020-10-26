import { SET_ALERT, CLEAR_ALERT } from "../_action/action_types";

const initialState = {
    msg: {},
    status: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ALERT:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
            };
        case CLEAR_ALERT:
            return {
                msg: {},
                status: null,
            };
        default:
            return state;
    }
}
