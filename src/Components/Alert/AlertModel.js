import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import "./alertmodel.css";

export const AlertModel = () => {
    const Alert = useSelector((state) => state.alert);
    const [alerts, setalerts] = useState([]);

    useEffect(() => {
        if (Alert.status != null) {
            setalerts((alerts) => [
                { id: uuid(), message: Alert.msg.message, status: Alert.status },
                ...alerts,
            ]);
        }
    }, [Alert]);
    const removealert = (id) => {
        // setalerts((prevalerts) => {
        //     let newalerts = prevalerts.filter((alert) => {
        //         return alert.id !== id;
        //     });
        //     return newalerts;
        // });
        setalerts((alerts) => alerts.filter((alert) => alert.id !== id));
    };
    return (
        <div className="alertmodel">
            {alerts
                ? alerts.length
                    ? alerts.map((alert) => {
                          return <AlertBox key={alert.id} {...alert} removealert={removealert} />;
                      })
                    : null
                : null}
        </div>
    );
};

const AlertBox = (props) => {
    const [click, setclick] = useState(0);
    const onclick = () => {
        setclick(1);
        setTimeout(() => {
            props.removealert(props.id);
        }, 600);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            onclick();
        }, 1500);
        return () => {
            // clearInterval(timer);
        };
    }, []);
    return (
        <div
            className={`alert center ${props.status}`}
            style={{ color: "white" }}
            onClick={onclick}
            click={click}
        >
            {props.message} <span className="closebtn righttext">&times;</span>
        </div>
    );
};
