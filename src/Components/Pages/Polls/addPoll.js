import React, { useState } from "react";
import "./addpoll.css";
import axios from "axios";
import { connect } from "react-redux";
import proptypes from "prop-types";
import qs from "querystring";
import { setauthtoken } from "../../../Utils/setauthtoken";
import { AddAlert } from "../../../_action/AlertAction";
import { Redirect } from "react-router-dom";

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

class AddPoll extends React.Component {
    state = {
        pollname: "",
        startdate: formatDate(new Date()),
        enddate: formatDate(new Date()),
        starttime: "",
        endtime: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        optionCount: 2,
        discription: "",
    };
    // handle input change
    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleIncreaseCount = (e) => {
        e.preventDefault();
        let { optionCount } = this.state;
        if (optionCount == 4) {
            this.props.AddAlert({ message: "You Cannot Add More Than Four Options" }, "danger");
        } else {
            let count = optionCount;
            this.setState({ optionCount: count + 1 });
        }
    };

    handleDecreaseCount = (e) => {
        e.preventDefault();
        let { optionCount } = this.state;
        if (optionCount == 2) {
            this.props.AddAlert({ message: "You Must Have At Least Two Options" }, "danger");
        } else {
            let count = optionCount;
            this.setState({ optionCount: count - 1 });
        }
    };

    formatDate = (date, time) => {
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        let formattedDate = day + "-" + month + "-" + year;
        var dateString = formattedDate + " " + time,
            dateTimeParts = dateString.split(" "),
            timeParts = dateTimeParts[1].split(":"),
            dateParts = dateTimeParts[0].split("-"),
            timeStamp;

        timeStamp = new Date(
            dateParts[2],
            parseInt(dateParts[1], 10) - 1,
            dateParts[0],
            timeParts[0],
            timeParts[1]
        );

        return timeStamp.getTime();
    };

    // submit
    Submit = (e) => {
        e.preventDefault();
        let start = this.formatDate(this.state.startdate, this.state.starttime);
        let end = this.formatDate(this.state.enddate, this.state.endtime);
        let input = {
            start_time: start,
            end_time: end,
            poll_name: this.state.pollname,
            discription: this.state.discription,
        };
        for (var i = 1; i <= this.state.optionCount; i++) {
            if (i == 1) {
                input.option_1 = this.state.option1;
            }
            if (i == 2) {
                input.option_2 = this.state.option2;
            }
            if (i == 3) {
                input.option_3 = this.state.option3;
            }
            if (i == 4) {
                input.option_4 = this.state.option4;
            }
        }
        let data = qs.stringify({ ...input });
        setauthtoken();
        var config = {
            method: "POST",
            url: `/api/v1/poll/create/${this.props.user._id}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: data,
        };
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    this.props.AddAlert({ message: response.data.message }, "success");
                }
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log(error);
                this.props.AddAlert(error.response.message, "danger");
            });
    };
    render() {
        let { optionCount } = this.state;
        let options = [];
        for (var i = 1; i <= optionCount; i++) {
            if (i == 1) {
                options[i] = {
                    name: `Option ${i}`,
                    count: i,
                    value: this.state.option1,
                };
            }
            if (i == 2) {
                options[i] = {
                    name: `Option ${i}`,
                    count: i,
                    value: this.state.option2,
                };
            }
            if (i == 3) {
                options[i] = {
                    name: `Option ${i}`,
                    count: i,
                    value: this.state.option3,
                };
            }
            if (i == 4) {
                options[i] = {
                    name: `Option ${i}`,
                    count: i,
                    value: this.state.option4,
                };
            }
        }
        return (
            <form onSubmit={this.Submit}>
                <div className="Poll">
                    <div className="addPoll">
                        <div className="addpoll-box">
                            <h2 className="title">Add Poll</h2>
                            <div className="poll-name">
                                <div>
                                    <label htmlFor="polls">Poll Name</label>
                                </div>
                                <input
                                    type="text"
                                    value={this.state.pollname}
                                    onChange={this.handelchange}
                                    name="pollname"
                                    id="polls"
                                    required
                                />
                            </div>
                            <div className="dis">
                                <div>
                                    <label htmlFor="discription">Discription</label>
                                </div>
                                <textarea
                                    value={this.state.discription}
                                    placeholder="Discription"
                                    onChange={this.handelchange}
                                    name="discription"
                                    id="discription"
                                    required
                                />
                            </div>

                            <div className="options">
                                {options.map((option) => {
                                    return (
                                        <>
                                            <div key={option.count}>
                                                <label htmlFor="option">{option.name}</label>
                                            </div>
                                            <input
                                                type="text"
                                                value={option.value}
                                                onChange={this.handelchange}
                                                name={`option${option.count}`}
                                                id="option"
                                                required
                                            />
                                        </>
                                    );
                                })}
                                <div className="button-cover">
                                    {optionCount > 2 ? (
                                        <button
                                            className="button"
                                            onClick={this.handleDecreaseCount}
                                        >
                                            Remove
                                        </button>
                                    ) : (
                                        <button className="button-disabled" disabled>
                                            Remove
                                        </button>
                                    )}
                                    {optionCount < 4 ? (
                                        <button
                                            className="button"
                                            onClick={this.handleIncreaseCount}
                                        >
                                            Add Option
                                        </button>
                                    ) : (
                                        <button className="button-disabled" disabled>
                                            Add Option
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="Start">
                                <div className="start-datee">
                                    <div>
                                        <label htmlFor="start-date">Start Date</label>
                                    </div>
                                    <input
                                        type="date"
                                        value={this.state.startdate}
                                        onChange={this.handelchange}
                                        name="startdate"
                                        id="start-date"
                                        required
                                    />
                                </div>
                                <div className="start-timee">
                                    <div>
                                        <label htmlFor="start-time">Start Time</label>
                                    </div>
                                    <input
                                        type="time"
                                        value={this.state.starttime}
                                        onChange={this.handelchange}
                                        name="starttime"
                                        id="start-time"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="End">
                                <div className="end-datee">
                                    <div>
                                        <label htmlFor="end-date">End Date</label>
                                    </div>
                                    <input
                                        type="date"
                                        value={this.state.enddate}
                                        onChange={this.handelchange}
                                        name="enddate"
                                        id="end-date"
                                        required
                                    />
                                </div>

                                <div className="end-timee">
                                    <div>
                                        <label htmlFor="end-time">End Time</label>
                                    </div>
                                    <input
                                        type="time"
                                        value={this.state.endtime}
                                        onChange={this.handelchange}
                                        name="endtime"
                                        id="end-time"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="submitbutton">
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapstatetoprops = (state) => ({
    user: state.auth.user,
});

export default connect(mapstatetoprops, { AddAlert })(AddPoll);
