import React from "react";
import "./addevent.css";

import Markdown from "react-markdown";
import gfm from "remark-gfm";

import { setauthtoken } from "../../Utils/setauthtoken";
import proptype from "prop-types";
import { connect } from "react-redux";
import qs from "querystring";
import axois from "axios";
import { logout } from "../../_action/AuthAction";
import { AddAlert } from "../../_action/AlertAction";

class AddEvent extends React.Component {
    state = {};
    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();

        var body = qs.stringify({
            start_time: this.state.stime,
            end_time: this.state.etime,
            event_name: this.state.eventname,
            date: this.state.date,
            discription: this.state.discription,
        });
        setauthtoken();
        var config = {
            method: "post",
            url: "/api/v1/event/addEvent/" + this.props.user._id,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: body,
        };
        console.log(body);
        axois(config)
            .then((response) => {
                if (response.status === 200) {
                    console.log("hello world");
                    this.props.AddAlert({ message: response.data.message }, 200);
                }

                this.props.history.push("/");
                console.log(response);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.AddAlert({ message: "your are not logged in" }, "systemalert");
                    this.props.logout();
                }
            });
    };
    onFileChange = (e) => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        });
    };
    render() {
        return (
            <div className="div1-addevent">
                <div className="addevent">
                    <h1>Add Event</h1>
                    <p>Make memories with Events...</p>
                    <div className="container">
                        <form onSubmit={this.onSubmit} className="left">
                            <div>
                                <label htmlFor="eventname">Eventname</label>
                            </div>
                            <input type="text" value={this.state.eventname} onChange={this.handelchange} name="eventname" placeholder="The name" id="eventname" required />
                            <div>
                                <label htmlFor="date">date</label>
                            </div>
                            <input type="date" value={this.state.date} placeholder="The name" onChange={this.handelchange} name="date" id="date" required />
                            <div>
                                <label htmlFor="duration">Duration</label>
                            </div>
                            <div style={{ display: "flex" }}>
                                <input type="time" value={this.state.stime} style={{ marginRight: "5px" }} placeholder="The name" onChange={this.handelchange} name="stime" id="duration" required />
                                <input type="time" value={this.state.etime} name="etime" placeholder="The name" onChange={this.handelchange} id="time" required />
                            </div>
                            <div>
                                <label htmlFor="discription">Discription</label>
                            </div>
                            <textarea type="text" row="5" column="50" name="discription" id="discription" value={this.state.discription} onChange={this.handelchange}></textarea>
                            <div>
                                <input type="file" value={this.state.file} onChange={this.onFileChange} />
                                <input type="submit" onClick={this.fileupload} value="Upload " style={{ marginRight: "10px" }} />
                                <input type="submit" value="Add" />
                            </div>
                            <div></div>
                        </form>
                    </div>
                </div>
                <div className="addevent right">
                    <div className="center">
                        <img src={this.state.file} />
                    </div>
                    <div>
                        <h3>{this.state.eventname}</h3>
                    </div>
                    {this.state.stime ? `Duration :${this.state.stime}` : null} {this.state.etime ? ` - ${this.state.etime}` : null}
                    {this.state.stime ? <br /> : null}
                    {this.state.date ? `On :${this.state.date}` : null}
                    {this.state.date ? <br /> : null}
                    <Markdown allowDangerousHtml plugins={[gfm]} source={this.state.discription} />
                </div>
            </div>
        );
    }
}
AddEvent.proptype = {
    user: proptype.object,
};
const mapstatetoprops = (state) => ({
    user: state.auth.user,
});

export default connect(mapstatetoprops, { logout, AddAlert })(AddEvent);
