import React, { useState } from "react";
import axois from "axios";
import "./home.css";

import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { loaddata } from "../../../_action/DataAction";
import { connect, useSelector } from "react-redux";

class Home extends React.Component {
  state = {};

  handelchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    this.props.loaddata();
  }
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  change = (e) => {
    const input = e.target.value;
    this.setState({ value: e.target.value });
  };
  submit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="home">
        <div className="leftside">
          {[...this.props.events.values()].map((ev) => {
            console.log(ev.eventName);
            if (ev.eventName.indexOf(this.state.value) != -1)
              return <Wrapper key={ev._id} {...ev} />;
          })}
        </div>
        <div className="rightside">
          <form onSubmit={this.submit}>
            <input onChange={this.change}></input>
            <button type="submit">search</button>
          </form>
        </div>
      </div>
    );
  }
}

function Wrapper(props) {
  const users = useSelector((state) => state.data.users);
  const [active, setactive] = useState(false);
  const [large, setlarge] = useState(-1);
  const onclick = () => {
    setactive(!active);
    setlarge(-large);
  };
  const big = (
    <>
      <div className="discription-large">
        <div className="event-name">
          <h3>{props.eventName}</h3>
        </div>
        <div className="venue">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        </div>
        <div className="date-time">
          <div className="event-date">
            {props.eventDate ? `${props.eventDate}` : null}
          </div>
          <div className="start-time">
            {props.startTime ? `Starts:${props.startTime}` : null}{" "}
          </div>
          <div className="end-time">
            {props.endTime ? `Ends: ${props.endTime}` : null}
          </div>
        </div>
      </div>
      <div className="large-info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti
        architecto excepturi aliquid sint a dolore, quidem quae, numquam illum
        cum magnam nesciunt? Fugiat assumenda accusantium aliquam autem cum
        unde? Consequuntur obcaecati dicta neque nihil maxime dolores pariatur
        earum recusandae officia ipsa ea architecto vitae odio, est itaque saepe
        hic esse repellendus autem voluptatum? Quos atque eum cumque odio ipsa?
        Deleniti illum facere laudantium accusantium quod porro hic beatae,
        natus blanditiis in vitae aliquam officia ipsam temporibus praesentium
        numquam delectus, velit, nemo dolores! Id facere nihil quis nisi
        cupiditate. Tenetur. Facilis eligendi, officia laboriosam odio vero
        nulla? Ipsum, quod aperiam obcaecati quia laborum laudantium quasi vitae
        reprehenderit quae itaque nobis voluptatum quo eveniet ab saepe! Itaque
        nulla minima animi soluta!
      </div>
    </>
  );
  var small = (
    <>
      <div className="discription-small">
        <div className="event-name">
          <h3>{props.eventName}</h3>
        </div>
        <div className="venue">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        </div>
        <div className="date-time">
          <div className="event-date">
            {props.eventDate ? `${props.eventDate}` : null}
          </div>
          <div className="start-time">
            {props.startTime ? `Starts:${props.startTime}` : null}{" "}
          </div>
          <div className="end-time">
            {props.endTime ? `Ends: ${props.endTime}` : null}
          </div>
        </div>
        <div className="short-info">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
          labore provident aliquid molestias commodi minima nam sed nulla aut.
          Nulla delectus quibusdam fugiat fugit
        </div>
      </div>
    </>
  );
  return (
    <>
      {large === -1 ? (
        <div className="wrapper-small" onClick={onclick} large={large}>
          <div className="image-small">
            <img src="https://miro.medium.com/max/12000/1*pUi3vkj06Vqp_sXeiI-UbQ.jpeg" />
          </div>
          {large === 1 ? big : small}
        </div>
      ) : (
        <div className="wrapper-large" onClick={onclick} large={large}>
          <div className="image-large">
            <img src="https://miro.medium.com/max/12000/1*pUi3vkj06Vqp_sXeiI-UbQ.jpeg" />
          </div>
          {large === 1 ? big : small}
        </div>
      )}
    </>
  );
}

const mapprops = (state) => ({
  users: state.data.users,
  events: state.data.events,
});

export default connect(mapprops, { loaddata })(Home);
