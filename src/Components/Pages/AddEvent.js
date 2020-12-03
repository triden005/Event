import React from "react";
import "./addevent.css";

import Markdown from "react-markdown";
import gfm from "remark-gfm";

import { setauthtoken } from "../../Utils/setauthtoken";
import proptype from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { logout } from "../../_action/AuthAction";
import { AddAlert } from "../../_action/AlertAction";

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

class AddEvent extends React.Component {
    state = {
        eventname: "The Flamingo",
        sdate: formatDate(new Date()),
        edate: formatDate(new Date()),
        venue: "At Campus",
        discription:
            "#### <center>College Ninja is organising an event on</center>\n\n--- \n|Days| |Timing|break|\n|:----:|:-|:-----:|:--:|\n|Day1|-|5pm-7pm|4pm-6pm|\n|Day2|- |10pm-12pm|11pm-11.30pm|\n|Day3|-|8am-3pm|noBreaksorry",
    };
    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("eimage", this.state.filesend);
        formdata.append("start_time", this.state.stime);
        formdata.append("end_time", this.state.etime);
        formdata.append("date", this.state.sdate);
        formdata.append("discription", this.state.discription);
        formdata.append("short_discription", this.state.sdiscription);
        formdata.append("schedule", this.state.schedule);
        formdata.append("event_name", this.state.eventname);
        formdata.append("start_date", this.state.sdate);
        formdata.append("venue", this.state.venue);
        setauthtoken();
        var config = {
            method: "post",
            url: "/api/v1/event/addEvent/" + this.props.user._id,
            headers: { "Content-Type": "multipart/form-data" },

            data: formdata,
        };
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    // console.log("hello world");
                    this.props.AddAlert({ message: response.data.message }, "success");
                }

                this.props.history.push("/");
                console.log(response);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.props.AddAlert(error.response.data, "danger");
                    this.props.logout();
                }
            });
    };
    onFileChange = (e) => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            filesend: e.target.files[0],
        });
    };
    render() {
        return (
            <div className="addevent">
                <div className="addevent-left">
                    <div className="addevent-leftbox">
                        <div className="header">
                            <h1>Add Event</h1>
                            <p>Make memories with Events...</p>
                        </div>
                        <div className="form">
                            <form onSubmit={this.onSubmit} className="left">
                                <div className="formname">
                                    <div>
                                        <label htmlFor="eventname">Eventname</label>
                                    </div>
                                    <input
                                        type="text"
                                        value={this.state.eventname}
                                        onChange={this.handelchange}
                                        name="eventname"
                                        placeholder="The name"
                                        id="eventname"
                                        required
                                    />
                                </div>
                                <div className="venue">
                                    <div>
                                        <label htmlFor="venue">Venue</label>
                                    </div>
                                    <input
                                        type="text"
                                        value={this.state.venue}
                                        onChange={this.handelchange}
                                        name="venue"
                                        placeholder="venue"
                                        required
                                    />
                                </div>
                                <div className="formdate">
                                    <div>
                                        <div>
                                            <label htmlFor="date">Start Date</label>
                                        </div>
                                        <input
                                            type="date"
                                            value={this.state.sdate}
                                            placeholder="The name"
                                            onChange={this.handelchange}
                                            name="sdate"
                                            id="date"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="Time">
                                    <div>
                                        <div>
                                            <label htmlFor="duration">Start Time</label>
                                        </div>
                                        <input
                                            type="time"
                                            value={this.state.stime}
                                            style={{ marginRight: "5px" }}
                                            placeholder="The name"
                                            onChange={this.handelchange}
                                            name="stime"
                                            id="duration"
                                            required
                                        />
                                    </div>
                                    <span style={{ width: "3px" }} />
                                    <div>
                                        <div>
                                            <label htmlFor="duration">End Time</label>
                                        </div>
                                        <input
                                            type="time"
                                            value={this.state.etime}
                                            name="etime"
                                            placeholder="The name"
                                            onChange={this.handelchange}
                                            id="time"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="short-discription">Short Discription</label>
                                </div>
                                <div className="short-textarea">
                                    <textarea
                                        type="text"
                                        name="sdiscription"
                                        id="short-discription"
                                        value={this.state.sdiscription}
                                        onChange={this.handelchange}
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="schedule">Event Schedule</label>
                                </div>
                                <div className="schedule-textarea">
                                    <textarea
                                        type="text"
                                        name="schedule"
                                        id="schedule-discription"
                                        value={this.state.schedule}
                                        onChange={this.handelchange}
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="discription">Discription</label>
                                </div>
                                <div className="textarea">
                                    <textarea
                                        type="text"
                                        name="discription"
                                        id="discription"
                                        value={this.state.discription}
                                        onChange={this.handelchange}
                                        required
                                    ></textarea>
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        fontSize: "16px",
                                        fontStyle: "italic",
                                    }}
                                >
                                    markdown supported
                                </div>

                                <div>
                                    <input type="file" onChange={this.onFileChange} />
                                    {/* <input
                                        type="submit"
                                        onClick={this.fileupload}
                                        value="Upload "
                                        style={{ marginRight: "10px" }}
                                    /> */}
                                </div>
                                <div className="submitbutton">
                                    <input type="submit" value="Add" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="addevent-right">
                    <div className="addevent-rightbox">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className="imageholder">
                                <img src={this.state.file} height="100px" width="100px" />
                            </div>
                            <div className="head">
                                <h3>{this.state.eventname}</h3>
                                <div className="venue">{this.state.venue}</div>
                                <div>
                                    <div className="discsmall">
                                        <div>{this.state.sdate ? `${this.state.sdate}` : null}</div>
                                        <div>
                                            {this.state.stime
                                                ? `Starts :${this.state.stime}`
                                                : null}
                                        </div>
                                        <div>
                                            {this.state.etime ? `Ends :${this.state.etime}` : null}
                                        </div>
                                        {this.state.stime || this.state.sdate ? <br /> : null}
                                    </div>
                                    <div>{this.state.sdiscription}</div>
                                </div>
                            </div>
                        </div>
                        <Markdown
                            allowDangerousHtml
                            plugins={[gfm]}
                            source={this.state.discription}
                        />
                        <hr />
                        <Markdown allowDangerousHtml plugins={[gfm]} source={this.state.schedule} />
                    </div>
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
