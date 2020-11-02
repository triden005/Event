import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { AddAlert } from "../_action/AlertAction";

export default function Auth(Component, type) {
    function Authenticationcheck(props) {
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

        const dispatch = useDispatch();

        // console.log(isAuthenticated, type);  // debugging use == with type and not ===

        if (type == 0) {
            return <Component {...props} />;
        } else if (type == 1) {
            if (isAuthenticated === true) {
                return <Component {...props} />;
            } else {
                dispatch(AddAlert({ message: "Please Login to Continue" }, "systemAllert"));
                return <Redirect to="/login" />;
            }
        } else if (type == 2) {
            if (isAuthenticated === true) {
                dispatch(AddAlert({ message: "Already Logged in" }, "systemAllert"));
                return <Redirect to="/" />;
            } else {
                return <Component {...props} />;
            }
        }
    }

    return Authenticationcheck;
}
