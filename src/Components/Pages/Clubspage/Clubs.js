import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

import { AddAlert } from "../../../_action/AlertAction";
import { Wrapper } from "../Home/Home";

import "../Home/home.css";
import "./clubs.css";
import { setauthtoken } from "../../../Utils/setauthtoken";
import noImage from "../Home/no-image.jpg";

class Clubs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            event: {},
            show: -1,
            admin: false,
            edit: false,
            changepassword: false,
        };
        //for scrolling to the view reference
        this.view = React.createRef();
    }

    componentDidMount() {
        //to get username from the url named id
        const id = this.props.match.params.id;

        //users list from redux state
        // const list = [...this.props.users.values()];
        // console.log(list);                   //debug line

        //if the username is valid then const user will have the user
        const user = this.props.users.get(id);
        // console.log(user);              //debug line
        //if not user then redirect to home with alert usernot found
        if (!user) {
            this.props.AddAlert({ message: "UserNotFound" }, "info");
            this.props.history.push("/");
        } else {
            this.setState({ user });
            if (this.props.user) {
                var { _id } = this.props.user;
                if (_id === user._id) this.setState({ admin: true });
            }
        }
    }
    //function to display the event clicked from the array
    onclick = (id) => {
        //first scrolling to the event div
        if (this.state.show === -1)
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

    handelchange = (e) => {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value },
        });
    };
    onFileChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                avatar: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
            },
        });
    };
    handelsubmit = (e) => {
        e.preventDefault();
        if (!this.state.edit) {
            this.setState({ edit: true });
        } else {
            //after backend created
            const { bio, email, _id, username, file } = this.state.user;
            var formdata = new FormData();
            formdata.append("id", _id);
            formdata.append("email", email);
            formdata.append("username", username);
            formdata.append("bio", bio);
            const { confirmNewPassword, newPassword, oldPassword } = this.state.user;
            formdata.append("confirmNewPassword", confirmNewPassword);
            formdata.append("newPassword", newPassword);
            formdata.append("oldPassword", oldPassword);
            if (this.state.user.file) formdata.append("avatar", file);
            setauthtoken();
            var config = {
                method: "post",
                url: "/api/v1/users/edit/" + _id,
                headers: { "Content-Type": "multipart/form-data" },
                data: formdata,
            };
            axios(config)
                .then((res) => {
                    //add success message
                    this.props.AddAlert({ message: res.data.message }, "success");
                    //change button text
                    this.setState({ edit: false, changepassword: false });
                })
                .catch((error) => {
                    this.props.AddAlert(error.response.data, "danger");
                });
        }
    };
    render() {
        const { admin, edit, changepassword } = this.state;
        //getting fields from user
        const { username, bio, event, avatar, email } = this.state.user;
        //getting event from state to display
        const ev = this.state.event;
        return (
            <div className="club">
                <h1 className="center">{username}</h1>
                <form onSubmit={this.handelsubmit}>
                    <div className="head">
                        <div className="leftside">
                            <div className="imageholder">
                                {avatar ? (
                                    <img src={avatar} alt="avatar" />
                                ) : (
                                    <img src={noImage} alt="No Image" />
                                )}

                                <div className="buttonholder">
                                    {edit && <input type="file" onChange={this.onFileChange} />}
                                </div>
                            </div>
                        </div>
                        <div className="rightsize">
                            <div className="rightside2">
                                <div className="descriptionholder">
                                    {edit ? (
                                        <textarea
                                            value={bio}
                                            name="bio"
                                            onChange={this.handelchange}
                                        ></textarea>
                                    ) : (
                                        <div>
                                            <Markdown
                                                allowDangerousHtml
                                                plugins={[gfm]}
                                                source={bio}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className={changepassword ? "passwordblock" : "displaynone"}>
                                    {changepassword && (
                                        <Changepassword
                                            handelchange={this.handelchange}
                                            confirmNewPassword={this.state.confirmNewPassword}
                                            newPassword={this.state.newPassword}
                                            oldPassword={this.props.oldPassword}
                                        />
                                    )}
                                </div>
                            </div>

                            {admin ? (
                                <>
                                    <div className="righttext">
                                        {edit && (
                                            <input
                                                type="button"
                                                value="ChangePassword"
                                                onClick={() => {
                                                    this.setState({
                                                        changepassword: !changepassword,
                                                    });
                                                }}
                                            />
                                        )}

                                        <input
                                            type="submit"
                                            value={edit ? "Save" : "Edit"}
                                            className="edit-button"
                                        />
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </form>

                <div className="events">
                    <h2 className="center" ref={this.view}>
                        Recent Events
                        <hr color="white" width="60%" />
                    </h2>
                    <div className="viewscreen" show={this.state.show}>
                        <div style={{ height: "100%", marginBottom: "20px" }}>
                            {
                                <div className="home">
                                    <Wrapper {...ev} />
                                </div>
                            }
                        </div>
                        {admin && (
                            <div className="center">
                                <input
                                    type="submit"
                                    onClick={() => this.props.history.push("/edit/" + ev._id)}
                                    value="Edit"
                                    className=" edit-button"
                                />
                            </div>
                        )}
                    </div>
                    <div className="row">
                        {event &&
                            event.map((eventid) => {
                                var ev = this.props.events.get(eventid);
                                return (
                                    ev && (
                                        <div key={ev._id}>
                                            <div
                                                className="card"
                                                key={ev._id}
                                                onClick={this.onclick.bind(this, ev._id)}
                                            >
                                                <div className="carddiv">
                                                    {ev.eimage ? (
                                                        <img src={ev.eimage} alt="eimage" />
                                                    ) : (
                                                        <img src={noImage} alt="No Image" />
                                                    )}
                                                    {ev.eventName}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                );
                            })}
                        {admin && (
                            <div>
                                <div
                                    className="card"
                                    key={ev._id}
                                    onClick={() => this.props.history.push("/addevent")}
                                >
                                    <div className="wrap">
                                        <i className="fa fa-plus" />
                                    </div>
                                    <div className="center">CreateNew</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapstatetoprops = (state) => ({
    users: state.data.users,
    events: state.data.events,
    user: state.auth.user,
});

export default connect(mapstatetoprops, { AddAlert })(Clubs);

function Changepassword(props) {
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <div className="div1-login">
                <div className="login">
                    <h2 class="login-text">ChangePassword</h2>
                    <div className="left">
                        <label htmlFor="name"> Old Password </label>
                    </div>
                    <input
                        type="password"
                        name="oldPassword"
                        value={props.oldPassword}
                        onChange={props.handelchange}
                        required="true"
                    />
                    <br />
                    <div className="left">
                        <label htmlFor="password">New Password</label>
                    </div>
                    <input
                        type="password"
                        name="newPassword"
                        onChange={props.handelchange}
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        value={props.newPassword}
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        required="true"
                    />
                    <div className="left">
                        <label htmlFor="confirmNewPassword">ConfirmNewPassword</label>
                    </div>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        onChange={props.handelchange}
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        value={props.confirmNewPassword}
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        required="true"
                    />
                </div>
            </div>
        </div>
    );
}
