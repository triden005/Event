import React, { useEffect, useState } from "react";
import axois from "axios";
import FullCalendar, { listenBySelector } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { connect, useSelector } from "react-redux";

function EventCalender(props) {
    const [state, setState] = useState([]);

    useEffect(() => {
        var list = [];
        [...props.events.values()].map((ev) => {
            let n1 = ev.eventDate;
            let n2 = ev.eventName;
            // console.log(n1);
            // console.log(n2) ;
            list.push({ title: n2, date: n1 });

            //  console.log(state);
        });
        setState(list);
    }, []);
    var style = {
        paddingTop: "3rem",
        height: "90vh",
        width: "80vw",
        margin: "auto",
        overflow: "auto",
    };
    return (
        <div style={style}>
            {<FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={state} />}
        </div>
    );
}
const mapstatetoprops = (state) => ({
    users: state.data.users,
    events: state.data.events,
});

export default connect(mapstatetoprops)(EventCalender);
