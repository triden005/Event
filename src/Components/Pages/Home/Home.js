import React, { useState } from "react";
import axois from "axios";
import "./home.css";

import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { loaddata } from "../../../_action/DataAction";
import { connect, useSelector } from "react-redux";
import Chatbox from "../chatbox/Chatbox";
import noImage from "./no-image.jpg";

class Home extends React.Component {
    state = {};
    top = React.createRef();
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
            toggle: true,
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
        const visible = {
            width: "300px",
        };
        const hidden = {
            width: "0px",
        };
        return (
            <div className="home" ref={this.top}>
                <div className="leftside">
                    {[...this.props.events.values()].map((ev) => {
                        if (
                            ev.eventName.toLowerCase().indexOf(this.state.value.toLowerCase()) != -1
                        )
                            return <Wrapper key={ev._id} {...ev} />;
                    })}
                </div>
                <div
                    className="togglebutton1"
                    onClick={() => {
                        this.setState({ toggle: !this.state.toggle });
                        this.top.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                >
                    <i class="fas fa-bars" />
                </div>
                <div
                    className="rightside"
                    className={this.state.toggle ? "rightside visible" : "rightside hidden"}
                >
                    <div
                        className="togglebutton2"
                        onClick={() => {
                            this.setState({ toggle: !this.state.toggle });
                            this.top.current.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }}
                    >
                        <i class="fas fa-times" />
                    </div>
                    <form class="home-right-form" onSubmit={this.submit}>
                        <input class="search-field" onChange={this.change}></input>
                        <button class="submit-button" type="submit">
                            search
                        </button>
                    </form>
                    <div className="rightrow">
                        <div> Users</div>
                        {[...this.props.users.values()].map((user) => {
                            return (
                                <div
                                    className="userarray"
                                    onClick={() =>
                                        this.props.history.push("/user/" + user.username)
                                    }
                                >
                                    {user.username}
                                </div>
                            );
                        })}
                    </div>
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
    const [chat, setchat] = useState(false);
    const big = (
        <>
            <div className="wrapper-large">
                <div className="header" onClick={onclick}>
                    <div className="image-large">
                        {props.eimage ? (
                            <img src={props.eimage} alt="Event" />
                        ) : (
                            <img src={noImage} alt="No Image" />
                        )}
                    </div>
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
                </div>
                <div className="large-info">
                    <div>
                        <button class="tablink" onClick={() => setchat(!chat)}>
                            {chat ? "Description" : "Chat"}
                        </button>
                        {/* <button class="tablink" onClick={() => setchat(true)}>
                            Chats
                        </button> */}
                    </div>
                    <div>
                        {chat ? (
                            <Chatbox parent={props._id} />
                        ) : (
                            <Markdown
                                allowDangerousHtml
                                plugins={[gfm]}
                                source={props.discription}
                            ></Markdown>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
    var small = (
        <>
            <div className="wrapper-small" onClick={onclick} large={large}>
                <div className="image-small">
                    {props.eimage ? (
                        <img src={props.eimage} alt="Event" />
                    ) : (
                        <img src={noImage} alt="No Image" />
                    )}
                </div>
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
                        <Markdown
                            allowDangerousHtml
                            plugins={[gfm]}
                            source={props.shortDiscription}
                        ></Markdown>
                    </div>
                </div>
            </div>

            <div className="time-table">
                <Markdown allowDangerousHtml plugins={[gfm]} source={props.schedule}></Markdown>
            </div>
        </>
    );
    return <div className="wrapper">{large === -1 ? small : big}</div>;
}

const mapprops = (state) => ({
    users: state.data.users,
    events: state.data.events,
});
export { Wrapper };

export default connect(mapprops, { loaddata })(Home);
