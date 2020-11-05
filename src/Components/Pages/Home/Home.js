import React, { useState } from "react";
import axois from "axios";
import "./home.css";

import Markdown from "react-markdown";
import gfm from "remark-gfm";

class Home extends React.Component {
    state = {
        data: null,
    };

    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    componentDidMount() {
        var config = {
            method: "get",
            url: "api/v1/home",
        };

        axois(config)
            .then((res) => {
                this.setState({ data: res.data.data });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="home">
                <div className="leftside">
                    {this.state.data
                        ? this.state.data.event.map((e) => {
                              return <Wrapper onClick={this.onclick} {...e} key={e._id} />;
                          })
                        : null}
                </div>
            </div>
        );
    }
}

function Wrapper(props) {
    const [active, setactive] = useState(false);
    const [large, setlarge] = useState(-1);
    const onclick = () => {
        setactive(!active);
        setlarge(-large);
    };
    const big = (
        <>
            <div className="image">
                <h3>{props.eventName}</h3>
                {props.startTime ? `Duration :${props.startTime}` : null} {props.endTime ? ` - ${props.endTime}` : null}
                {props.startTime ? <br /> : null}
                {props.eventDate ? `On :${props.eventDate}` : null}
                {props.eventDate ? <br /> : null}
            </div>
            <div className="discription" style={{ width: "90%" }}>
                <Markdown allowDangerousHtml plugins={[gfm]} source={props.discription} />
            </div>
        </>
    );
    var small = (
        <>
            <div className="discription">
                <h3>{props.eventName}</h3>
                {props.startTime ? `Duration :${props.startTime}` : null} {props.endTime ? ` - ${props.endTime}` : null}
                {props.startTime ? <br /> : null}
                {props.eventDate ? `On :${props.eventDate}` : null}
            </div>
        </>
    );
    return (
        <>
            <div className="wrapper" onClick={onclick} large={large}>
                <div className="image">{large === -1 ? <img src="https://placegoat.com/100" /> : <img src="https://placegoat.com/200" />}</div>
                {large === 1 ? big : small}
            </div>
        </>
    );
}

export default Home;
