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
    const onclick = () => {
        setactive(!active);
    };
    if (!active) {
        return (
            <>
                <div className="wrapper" onClick={onclick}>
                    <div className="image">
                        <img src="https://placegoat.com/100"></img>
                    </div>

                    <div className="discription">
                        <h3>{props.eventName}</h3>
                        {props.startTime ? `Duration :${props.startTime}` : null} {props.endTime ? ` - ${props.endTime}` : null}
                        {props.startTime ? <br /> : null}
                        {props.eventDate ? `On :${props.eventDate}` : null}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="wrapper" onClick={onclick}>
                    <div className="image">
                        <img src="https://placegoat.com/250" />
                    </div>
                    <div className="image">
                        {props.startTime ? `Duration :${props.startTime}` : null} {props.endTime ? ` - ${props.endTime}` : null}
                        {props.startTime ? <br /> : null}
                        {props.eventDate ? `On :${props.eventDate}` : null}
                        {props.eventDate ? <br /> : null}
                    </div>
                    <div className="discription">
                        <h3>{props.eventName}</h3>
                        <Markdown allowDangerousHtml plugins={[gfm]} source={props.discription} />
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
