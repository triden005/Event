import React,{useEffect,useState} from "react";
import axois from "axios";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { connect, useSelector } from "react-redux";

 function EventCalender (props)
{
const [state,setState] = useState([]);

useEffect(()=>{
  [...props.events.values()].map((ev) => {
  let n1 = ev.eventDate;
  let n2 = ev.eventName;
  // console.log(n1);
  // console.log(n2) ;
   setState(oldState => [...oldState,{ title: n2 , date:  n1 } ] ) ;
//  console.log(state);
})

},[]);

  return (
    <>
   { 
    <FullCalendar
      plugins={[ dayGridPlugin ]}

      initialView="dayGridMonth"
    
      events = {state}
            
    />
    }

    </>
  )
  
  
}
const mapstatetoprops = (state) => ({
  users: state.data.users,
  events: state.data.events,
});

export default connect(mapstatetoprops)(EventCalender);


