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
         value : ''
        };
      }
      
    change = (e) =>{
        const input = e.target.value;
        this.setState({value : e.target.value});
        
    }
    submit = (e)=>{
        e.preventDefault();
    }
    render() {
        return (
            <div className="home">
                <div className="leftside">
                {[...this.props.events.values()].map((ev) => {
                        console.log(ev.eventName);
                        if(ev.eventName.indexOf(this.state.value)!=-1)
                        return <Wrapper key={ev._id} {...ev} />;
                    })}
                </div>
                <div className="rightside">
                    <form onSubmit = {this.submit}>
                          
                        <input onChange = {this.change}>
                        
                        </input>
                        <button type="submit" >search</button>
                       
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
            <div className="image">
                <h3>{props.eventName}</h3>
                {props.startTime ? `Duration :${props.startTime}` : null} {props.endTime ? ` - ${props.endTime}` : null}
                {props.startTime ? <br /> : null}
                {props.eventDate ? `On :${props.eventDate}` : null}
                {props.eventDate ? <br /> : null}
                by-:{users.get(props.user).username}
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
                by-:{users.get(props.user).username}
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

const mapprops = (state) => ({
    users: state.data.users,
    events: state.data.events,
});

export default connect(mapprops, { loaddata })(Home);
