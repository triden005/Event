import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import "./alertmodel.css";

export const AlertModel = () => {
    const Alert = useSelector((state) => state.alert);
    const [alerts, setalerts] = useState([]);

    useEffect(() => {
        if (Alert.status != null) {
            setalerts([...alerts, Alert]);
        }
    }, [Alert]);

    const removealert = (index) => {
        console.log(index);
        setTimeout(() => {
            var arr = alerts.slice();
            arr.splice(index, 1);
            setalerts(arr);
        }, 600);
    };
    const data = alerts.map((alert, index) => {
        return <AlertBox key={uuid()} {...alert} removealert={removealert} index={index} />;
    });
    return (
        <div className="alertmodel">
            {/* {alerts.map((alert, index) => {
                return <AlertBox key={uuid()} {...alert} removealert={removealert} index={index} />;
            })} */}
            {data}
        </div>
    );
};

const AlertBox = (props) => {
    const [click, setclick] = useState(0);
    const onclick = () => {
        setclick(1);
        props.removealert(props.index);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            onclick();
        }, 3500 - props.index * 650);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={`alert center ${props.status}`} style={{ color: "white" }} onClick={onclick} click={click}>
            {props.msg.message} <span className="closebtn righttext">&times;</span>
        </div>
    );
};
