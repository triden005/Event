import axios from "axios";

import store from "../Store";
export const setauthtoken = () => (getState) => {
    if (store.getState().auth.token) {
        axios.defaults.headers.common["x-auth-Token"] = store.getState().auth.token;
    } else {
        delete axios.defaults.headers.common["x-auth-Token"];
    }
};
