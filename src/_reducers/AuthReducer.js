import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGOUT_SUCESS, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../_action/action_types";

const initialState = {
    token: localStorage.getItem("Token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("Token", action.payload);
            return {
                ...state,
                token: action.payload,
                // isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGOUT_SUCESS:
            localStorage.removeItem("Token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
}
