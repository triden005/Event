import axios from "axios";

import store from "../Store";
export const setauthtoken = (getState) => {
  if (store.getState().auth.token) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + store.getState().auth.token;
    // console.log("token added");
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
