import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const AlertModel = () => {
    const Alert = useSelector((state) => state.alert);
    const [alerts, setalerts] = useState([]);
    console.log(Alert);
    useEffect(() => {
        return () => {
            setalerts([...alerts, Alert]);
        };
    }, [Alert]);

    alerts.map((alert) => {
        return (
            <div className="Alert" style={{ color: "white" }} key={alert.message}>
                {alert.message}
            </div>
        );
    });
    return <div></div>;
};
