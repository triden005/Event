import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { AddAlert } from "../_action/AlertAction";

export default function Auth(Component, type) {
    function Authenticationcheck(props) {
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
        const isLoading = useSelector((state) => state.auth.isLoading);
        const dispatch = useDispatch();

        // console.log(isAuthenticated, type);  // debugging use == with type and not ===
        useEffect(() => {
            if (isLoading !== true) {
                if (type === 1) {
                    if (isAuthenticated === false) {
                        props.history.goBack();
                        props.history.push("/login");

                        dispatch(AddAlert({ message: "Please Login to Continue" }, "systemAllert"));
                    }
                } else if (type == 2) {
                    if (isAuthenticated === true) {
                        props.history.goBack();

                        dispatch(AddAlert({ message: "Already Logged in" }, "systemAllert"));
                    }
                }
            } else {
                props.history.push("/");
            }
        }, [dispatch, isAuthenticated, isLoading, props.history]);
        return <Component {...props} />;
    }

    return Authenticationcheck;
}
