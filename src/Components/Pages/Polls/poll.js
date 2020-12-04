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
        this.props.AddAlert({ message: error.data.message }, "danger");
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
              <Link to="/addpoll">Add Poll</Link>
            ) : (
              <Link to="/login">Add Poll</Link>
            )}
          </button>
        </div>
      </div>
    );
  }
}

function ShowPoll(props) {
  let poll = props.poll;
  let optionCount = Object.keys(props.poll).length - 12;
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
  return (
    <div className="poll">
      <div className="poll-name">{poll.pollName}</div>
      <div className="creator">{poll.username}</div>
      <div className="discription">{poll.discription}</div>
      <div className="time-details">
        <div className="start">{poll.startTime}</div>
        <div className="end">{poll.endTime}</div>
      </div>
      <div className="options">
        {options.map((option) => {
          return (
            <ShowOptions
              key={count}
              value={count++}
              option={option}
              pollId={poll._id}
              handleVote={props.handleVote}
              isLoggedIn={props.isLoggedIn}
            ></ShowOptions>
          );
        })}
      </div>
    </div>
  );
}

function ShowOptions(props) {
  let { option, value, pollId, handleVote, isLoggedIn } = props;
  return (
    <>
      {isLoggedIn ? (
        <div
          className="option-enabled"
          onClick={(event) => handleVote(event, value, pollId)}
        >
          {option}
        </div>
      ) : (
        <div className="option-disabled">{option}</div>
      )}
    </>
  );
}

const mapstatetoprops = (state) => ({
  user: state.auth.user,
  polls: state.data.polls,
  gauthenticated: state.auth.gauthenticated,
  tokenId: state.auth.tokenid,
});

export default connect(mapstatetoprops, { AddAlert, gauth, gauthclear })(Poll);
