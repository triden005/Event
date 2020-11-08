import axios from "axios";
import qs from "querystring";
import jwt from "jwt-decode";
//importing action types for authentication

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./action_types";
import { AddAlert } from "./AlertAction";

//Load user if token is there
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    //getting token from state
    var token = getState().auth.token;
    var user = null;

    if (token) {
        user = jwt(token); //Decode user

        console.log(user); // Debug Line

        if (user && user.exp > Date.now() / 1000) {
            dispatch({
                type: USER_LOADED,
                payload: user,
            });
        } else {
            dispatch({
                type: AUTH_ERROR,
            });
            dispatch(AddAlert({ message: "UserValidation error" }, "warning"));
        }
    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

//login User
export const login = ({ email, password }) => (dispatch) => {
    //Header
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    //body
    var body = qs.stringify({ email, password });

    axios
        .post("/api/v1/users/login", body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data.token,
            });

            //add success alert and loaduser
            dispatch(AddAlert({ message: res.data.message }, "success"));
            dispatch(loadUser());
        })
        .catch((err) => {
            dispatch(AddAlert(err.response.data, "warning"));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

//Register user
export const register = (data) => (dispatch) => {
    //header
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const body = qs.stringify(data);

    axios
        .post("/api/v1/users/register", body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.data.token,
            });

            //add success message and loaduser
            dispatch(AddAlert({ message: res.data.message }, "success"));
            dispatch(loadUser());
        })
        .catch((err) => {
            dispatch(AddAlert(err.response.data, "warning"));
            dispatch({ type: REGISTER_FAIL });
        });
};

//logout
export const logout = () => (dispatch) => {
    dispatch(AddAlert({ message: "Logout successfully!!" }, "info"));
    dispatch({
        type: LOGOUT_SUCESS,
    });
};
