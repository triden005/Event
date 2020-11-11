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
        <h3>{props.eventName}</h3>
        {props.startTime ? `Duration :${props.startTime}` : null}{" "}
        {props.endTime ? ` - ${props.endTime}` : null}
        {props.startTime ? <br /> : null}
        {props.eventDate ? `On :${props.eventDate}` : null}
        {props.eventDate ? <br /> : null}
        by-:{users.get(props.user).username}
        <Markdown
          allowDangerousHtml
          plugins={[gfm]}
          source={props.discription}
        />
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
            {props.startTime ? `Starts at:${props.startTime}` : null}{" "}
          </div>
          <div className="end-time">
            {props.endTime ? `Ends at: ${props.endTime}` : null}
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
      <div className="wrapper" onClick={onclick} large={large}>
        {large === -1 ? (
          <div className="image-small">
            <img src="https://miro.medium.com/max/12000/1*pUi3vkj06Vqp_sXeiI-UbQ.jpeg" />
          </div>
        ) : (
          <div className="image-large">
            <img src="https://miro.medium.com/max/12000/1*pUi3vkj06Vqp_sXeiI-UbQ.jpeg" />
          </div>
        )}
        {large === 1 ? big : small}
      </div>
    </>
  );
}

const mapprops = (state) => ({
  users: state.data.users,
  events: state.data.events,
});

export default connect(mapprops, { loaddata })(Home);
