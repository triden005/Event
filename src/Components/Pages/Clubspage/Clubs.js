import React from "react";
import { AddAlert } from "../../../_action/AlertAction";
import { Wrapper } from "../Home/Home";
import "../Home/home.css";
import { connect } from "react-redux";
import "./clubs.css";
import noImage from "../Home/no-image.jpg";

class Clubs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            event: {},
            show: -1,
        };
        //for scrolling to the view reference
        this.view = React.createRef();
    }

    componentDidMount() {
        //to get username from the url named id
        const id = this.props.match.params.id;
        //users list from redux state
        const list = [...this.props.users.values()];
        // console.log(list);                   //debug line

        //if the username is valid then const user will have the user
        const user = list.find((element) => {
            return element.username === id;
        });
        // console.log(user);              //debug line
        //if not user then redirect to home with alert usernot found
        if (!user) {
            this.props.AddAlert({ message: "UserNotFound" }, "info");
            this.props.history.push("/");
        } else {
            this.setState({ user });
        }
    }
    //function to display the event clicked from the array
    onclick = (id) => {
        //first scrolling to the event div
        this.view.current.scrollIntoView({ behavior: "smooth", block: "start" });
        //getting event from event dictionary from redux
        var ev = this.props.events.get(id);
        //condition of viewing another event from event
        if (this.state.show === 1 && id !== this.state.event._id) {
            this.setState({ show: -this.state.show });
            setTimeout(() => {
                this.setState({ event: ev, show: -this.state.show });
            }, 1000);
        } else this.setState({ event: ev, show: -this.state.show });
    };
    render() {
        //getting fields from user
        const { username, bio, createdAt, event, email, avatar } = this.state.user;
        //getting event from state to display
        const ev = this.state.event;
        return (
            <div className="club">
                <h1 className="center">{username}</h1>
                <div className="header">
                    <div className="leftside">
                        <div className="imageholder">
                            {avatar ? (
                                <img src={avatar} alt="avatar" />
                            ) : (
                                <img src={noImage} alt="No Image" />
                            )}

                            <div className="contactholder">Contact-{email}</div>
                        </div>
                    </div>
                    <div className="rightsize">
                        <div className="descriptionholder">{bio}</div>
                    </div>
                </div>
                <div className="events">
                    <h2 className="center">Recent Events</h2>
                    <div className="viewscreen" ref={this.view} show={this.state.show}>
                        <div style={{ height: "100%", marginBottom: "20px" }}>
                            {<Wrapper {...ev} />}
                        </div>{" "}
                    </div>
                    <div className="row">
                        {event &&
                            event.map((eventid) => {
                                // console.log(this.props.events.get(eventid));
                                var ev = this.props.events.get(eventid);
                                return (
                                    ev && (
                                        <>
                                            {" "}
                                            {}
                                            <div
                                                className="card"
                                                key={ev._id}
                                                onClick={this.onclick.bind(this, ev._id)}
                                            >
                                                <div>
                                                    {/* {console.log(ev.eimage)} */}
                                                    {ev.eimage ? (
                                                        <img src={ev.eimage} alt="eimage" />
                                                    ) : (
                                                        <img src={noImage} alt="No Image" />
                                                    )}
                                                    {ev.eventName}
                                                </div>
                                            </div>
                                        </>
                                    )
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapstatetoprops = (state) => ({
    users: state.data.users,
    events: state.data.events,
});

export default connect(mapstatetoprops, { AddAlert })(Clubs);
