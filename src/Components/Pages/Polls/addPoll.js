import React, { useState } from "react";
import "./addpoll.css";
import axios from "axios";
import { connect } from "react-redux";
import proptypes from "prop-types";
import { AddAlert } from "../../../_action/AlertAction";

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
  };
  // handle input change
  handelchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleIncreaseCount = (e) => {
    e.preventDefault();
    let { optionCount } = this.state;
    if (optionCount == 4) {
      this.props.AddAlert(
        { message: "You Cannot Add More Than Four Options" },
        "danger"
      );
    } else {
      let count = optionCount;
      this.setState({ optionCount: count + 1 });
    }
  };

  handleDecreaseCount = (e) => {
    e.preventDefault();
    let { optionCount } = this.state;
    if (optionCount == 2) {
      this.props.AddAlert(
        { message: "You Must Have At Least Two Options" },
        "danger"
      );
    } else {
      let count = optionCount;
      this.setState({ optionCount: count - 1 });
    }
  };

  // submit
  Submit = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    // // formdata.append('author',props.user._id);
    // formdata.append("sdate", sdate);
    // formdata.append("edate", edate);
    // var config = {
    //   method: "post",
    //   url: "/api/v1/poll/create/" + props.user._id,
    //   headers: { "Content-Type": "multipart/form-data" },
    //   data: formdata,
    // };
    // axios(config)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       console.log("poll posted");
    //     }
    //     console.log("poll posted");
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 401) {
    //       console.log("poll not uploaded");
    //     }
    //   });
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
              <div className="header">
                <h2 className="title">Add Poll</h2>
                <div className="poll-name">
                  <div>
                    <label htmlFor="polls">Poll Name</label>
                  </div>
                  <div className="options">
                    {options.map((option) => {
                      return (
                        <>
                          <div>
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
                    {optionCount > 2 ? (
                      <button onClick={this.handleDecreaseCount}>Remove</button>
                    ) : (
                      <button disabled>Remove</button>
                    )}
                    {optionCount < 4 ? (
                      <button onClick={this.handleIncreaseCount}>
                        Add Option
                      </button>
                    ) : (
                      <button disabled>Add Option</button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Poll Name"
                    value={this.state.pollname}
                    onChange={this.handelchange}
                    name="pollname"
                    id="polls"
                    required
                  />
                </div>
                <div className="Start">
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
                <div className="End">
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
                  <span style={{ width: "3px" }} />
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
