import React, { useState } from "react";
import "./poll.css";
import axios from "axios";
import qs from "querystring";
import { connect } from "react-redux";
import proptypes from "prop-types";
import { AddAlert } from "../../../_action/AlertAction";
import { GoogleLogin } from "react-google-login";
import { gauth, gauthclear } from "../../../_action/AuthAction";
import { Link } from "react-router-dom";

class Poll extends React.Component {
    state = {
        isauthenticated: false,
    };
    componentDidMount() {
        if (this.props.gauthenticated == true) {
            this.setState({ isauthenticated: true, tokenId: this.props.tokenId });
        }
    }
    handelsuccess = (res) => {
        // console.log(res);
        this.setState({ tokenId: res.tokenId, isauthenticated: true });
        this.props.gauth(this.state.tokenId);
    };
    handelfailure = (res) => {
        console.log(res);
        this.setState({ tokenId: "", isauthenticated: false });
        this.props.AddAlert({ message: "Something went wrong" }, "info");
    };

    handleVote = (event, value, pollId) => {
        let data = qs.stringify({
            parent: pollId,
            option: value,
            tokenId: this.state.tokenId,
        });
        let config = {
            method: "POST",
            url: `/api/v1/poll/vote/`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data,
        };
        axios(config)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.props.AddAlert({ message: response.data.message }, "success");
                }
            })
            .catch((error) => {
                console.log(error);
                this.props.AddAlert(error.response.data, "danger");
                if (error.status === 401) {
                    this.setState({ tokenId: "", isauthenticated: false });
                    this.props.gauthclear();
                }
            });
    };
    render() {
        console.log(this.props);
        let isLoggedIn = this.props.gauthenticated;
        if (!isLoggedIn && !this.state.isauthenticated) {
            this.props.AddAlert(
                { message: "Please Login With Google To Vote For Polls" },
                "danger"
            );
        }
        let { polls, user } = this.props;
        return (
            <div className="show-polls">
                <div className="polls">
                    {[...polls.values()].map((poll) => {
                        return (
                            <ShowPoll
                                key={poll._id}
                                poll={poll}
                                handleVote={this.handleVote}
                                user={user}
                                isLoggedIn={isLoggedIn}
                            />
                        );
                    })}
                </div>
                <div>
                    {isLoggedIn ? (
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login To Vote"
                            onSuccess={this.handelsuccess}
                            onFailure={this.handelfailure}
                            cookiePolicy={"single_host_origin"}
                            disabled
                        />
                    ) : (
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login To Vote"
                            onSuccess={this.handelsuccess}
                            onFailure={this.handelfailure}
                            cookiePolicy={"single_host_origin"}
                        />
                    )}
                </div>
                <div className="add-poll">
                    <button>
                        {this.props.user ? (
                            <Link to="/addpoll" className="button-link">
                                Add Poll
                            </Link>
                        ) : (
                            <Link className="button-link" to="/login">
                                Add Poll
                            </Link>
                        )}
                    </button>
                </div>
            </div>
        );
    }
}

function ShowPoll(props) {
    let poll = props.poll;
    let optionCount = Object.keys(props.poll).length - 15;
    let options = [];
    for (var i = 1; i <= optionCount; i++) {
        if (i == 1) {
            options[0] = poll.option1;
        }
        if (i == 2) {
            options[1] = poll.option2;
        }
        if (i == 3) {
            options[2] = poll.option3;
        }
        if (i == 4) {
            options[3] = poll.option4;
        }
    }
    let count = 1;
    const timeConvert = (timestamp) => {
        var a = new Date(timestamp);
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        console.log(a);
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        if (min >= 0 && min <= 9) {
            min = `0${min}`;
        }
        var time = date + " " + month + " " + year + "   " + hour + ":" + min;
        return time;
    };
    let pollStart = timeConvert(Number(poll.startTime));
    console.log(pollStart);
    let pollEnd = timeConvert(Number(poll.endTime));
    return (
        <div className="poll">
            <div className="poll-name">
                <h2>{poll.pollName}</h2>
                <sub>
                    <div className="creator">Created By-{poll.username}</div>
                </sub>
            </div>

            <div className="discription">{poll.discription}</div>
            <div className="time-details">
                <div className="start">Starts At - {pollStart}</div>
                <div className="end">Ends At - {pollEnd}</div>
            </div>
            <div className="options">
                {options.map((optionName) => {
                    return (
                        <ShowOptions
                            key={count}
                            value={count++}
                            optionName={optionName}
                            pollId={poll._id}
                            handleVote={props.handleVote}
                            isLoggedIn={props.isLoggedIn}
                            startTime={poll.startTime}
                            endTime={poll.endTime}
                        ></ShowOptions>
                    );
                })}
            </div>
        </div>
    );
}

function ShowOptions(props) {
    let { optionName, value, pollId, handleVote, isLoggedIn, startTime, endTime } = props;
    let option = String.fromCharCode(64 + value);
    let authenticatedToVote = false;
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    if (isLoggedIn) {
        if (startTime <= timestamp) {
            if (timestamp <= endTime) {
                authenticatedToVote = true;
            }
        }
    }
    return (
        <div className="option">
            {authenticatedToVote ? (
                <div
                    className="option-enabled"
                    onClick={(event) => handleVote(event, value, pollId)}
                >
                    {option} : {optionName}
                </div>
            ) : (
                <div className="option-disabled">
                    {option} : {optionName}
                </div>
            )}
        </div>
    );
}

const mapstatetoprops = (state) => ({
    user: state.auth.user,
    polls: state.data.polls,
    gauthenticated: state.auth.gauthenticated,
    tokenId: state.auth.tokenid,
});

export default connect(mapstatetoprops, { AddAlert, gauth, gauthclear })(Poll);
