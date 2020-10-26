import axios from "axios";

//importing action types for authentication
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./action_types";
import { AddAlert } from "./AlertAction";

///setup for header and token for any request
export const tokenconfig = (getstate) => {
    const token = getstate().auth.token;

    const config = {
        header: {
            "Content-type": "application/json",
        },
    };

    if (token) {
        config.header["Auth-Token"] = token;
    }
    return config;
};

//Load user if token is there
export const loadUser = () => (dispatch, getState) => {
    //User loading so
    dispatch({ type: USER_LOADING });

    //get token from local storage by calling tokenconfig() for getting user
    axios
        .get("/api/auth/user", tokenconfig(getState))
        .then((res) =>
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(AddAlert(err.response.data, "Some internal error occured"));
            dispatch({ type: AUTH_ERROR });
        });
};

//login User
export const login = ({ email, password }) => (dispatch) => {
    //Header
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });

    axios
        .post("api/login", body, config)
        .then((res) =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(AddAlert(err.response.data, "LOGIN_FAILED"));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

//Register user
export const register = ({ name, email, password }) => (dispatch) => {
    //header
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ name, email, password });

    axios
        .post("/api/users", body, config)
        .then((res) =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(AddAlert(err.response.data, "Registration Failed"));
            dispatch({ type: REGISTER_FAIL });
        });
};

//logout
export const logout = () => {
    return {
        type: LOGOUT_SUCESS,
    };
};
