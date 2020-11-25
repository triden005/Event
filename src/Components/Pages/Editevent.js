import React, { Component } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddAlert } from "../../_action/AlertAction";

class Editevent extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        events: PropTypes.object,
    };
    state = {};
    componentDidMount(props) {
        const id = this.props.match.params.id;
        const event = this.props.events.get(id);
        if (!event) {
            this.props.history.goBack();
            this.props.AddAlert({ message: "No event found" }, "danger");
        } else {
            if (!!this.props.user && this.props.user._id !== event.user) {
                this.props.AddAlert({ message: "Not Authorised" }, "danger");
                this.props.history.goBack();
            } else {
                this.setState({ ...event });
            }
        }
    }
    onFileChange = (e) => {
        this.setState({
            eimage: URL.createObjectURL(e.target.files[0]),
            filesend: e.target.files[0],
        });
    };
    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    delete = () => {};
    render() {
        return (
            <div className="addevent">
                <div className="addevent-left">
                    <div className="addevent-leftbox">
                        <div className="header">
                            <h1>Edit</h1>
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
                                        value={this.state.eventName}
                                        onChange={this.handelchange}
                                        name="eventName"
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
                                            <label htmlFor="date">StartDate</label>
                                        </div>
                                        <input
                                            type="date"
                                            value={this.state.eventDate}
                                            placeholder="The name"
                                            onChange={this.handelchange}
                                            name="eventDate"
                                            id="date"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="Time">
                                    <div>
                                        <div>
                                            <label htmlFor="duration">StartTime</label>
                                        </div>
                                        <input
                                            type="time"
                                            value={this.state.startTime}
                                            style={{ marginRight: "5px" }}
                                            placeholder="The name"
                                            onChange={this.handelchange}
                                            name="startTime"
                                            id="duration"
                                            required
                                        />
                                    </div>
                                    <span style={{ width: "3px" }} />
                                    <div>
                                        <div>
                                            <label htmlFor="duration">EndTime</label>
                                        </div>
                                        <input
                                            type="time"
                                            value={this.state.endTime}
                                            name="endTime"
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
                                        name="shortDiscription"
                                        id="short-discription"
                                        value={this.state.shortDiscription}
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
                                </div>
                                <div
                                    className="submitbutton"
                                    style={{ display: "flex", justifyContent: "space-around" }}
                                >
                                    <input type="button" value="Delete" onClick={this.delete} />
                                    <input type="submit" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="addevent-right">
                    <div className="addevent-rightbox">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className="imageholder">
                                <img src={this.state.eimage} height="100px" width="100px" />
                            </div>
                            <div className="head">
                                <h3>{this.state.eventName}</h3>
                                <div className="venue">{this.state.venue}</div>
                                <div>
                                    <div className="discsmall">
                                        <div>
                                            {this.state.eventDate
                                                ? `${this.state.eventDate}`
                                                : null}
                                        </div>
                                        <div>
                                            {this.state.startTime
                                                ? `Starts :${this.state.startTime}`
                                                : null}
                                        </div>
                                        <div>
                                            {this.state.endTime
                                                ? `Ends :${this.state.endTime}`
                                                : null}
                                        </div>
                                        {this.state.startTime || this.state.eventDate ? (
                                            <br />
                                        ) : null}
                                    </div>
                                    <div>{this.state.shortDiscription}</div>
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

const mapStateToProps = (state) => ({
    events: state.data.events,
    user: state.auth.user,
});

export default connect(mapStateToProps, { AddAlert })(Editevent);
