import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import noImage from "../Home/no-image.jpg";
import "./chatbox.css";
import { GoogleLogin } from "react-google-login";
import { AddAlert } from "../../../_action/AlertAction";
function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join(".");
}
class Chatbox extends Component {
    static propTypes = {
        prop: PropTypes,
    };
    state = {
        rerender: 1,
        isloading: false,
        isauthenticated: false,
        comments: [
            {
                imageurl: noImage,
                text: "No comments yet!!!",
                upvotes: [1, 2, 3, 4, 5],
                downvotes: [],
                createdAt: "2020-11-27T15:27:19.650Z",
                author: "Admin",
            },
        ],
    };
    componentDidMount() {
        this.setState({ parent: this.props.parent });
        let data = qs.stringify({
            parent: this.props.parent,
        });
        let config = {
            method: "post",
            url: "/api/v1/comment/fetch/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };
        axios(config).then((res) => {
            console.log(res.data);
            this.setState({
                comments: res.data.comment,
            });
        });
    }
    componentDidUpdate() {
        if (this.state.rerender !== 1) {
            let data = qs.stringify({
                parent: this.props.parent,
            });
            let config = {
                method: "post",
                url: "/api/v1/comment/fetch/",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: data,
            };
            axios(config)
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        comments: res.data.comment,
                        rerender: 1,
                    });
                })
                .catch((err) => {
                    this.props.AddAlert({ messade: "Something Bad Happend" }, "danger");
                });
        }
    }
    handelsuccess = (res) => {
        console.log(res);
        this.setState({ tokenId: res.tokenId, isauthenticated: true });
    };
    handelfailure = (res) => {
        this.setState({ tokenId: "", isauthenticated: false });
    };
    sentcomment = () => {
        console.log("sending");
        let data = qs.stringify({
            parent: this.state.parent,
            tokenId: this.state.tokenId,
            text: this.state.text,
        });
        let config = {
            method: "post",
            url: "/api/v1/comment/create/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };
        axios(config)
            .then((res) => {
                this.props.AddAlert(res.data, "success");
                this.setState({ rerender: -1, text: "" });
            })
            .catch((error) => {
                this.props.AddAlert(error.response.data, "danger");
            });
    };
    upvote = (_id) => {
        let data = qs.stringify({
            _id,
            tokenId: this.state.tokenId,
        });
        let config = {
            method: "post",
            url: "api/v1/comment/upvote/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };

        axios(config)
            .then((res) => {
                this.props.AddAlert(res.data, "success");
                this.setState({ rerender: -1 });
            })
            .catch((error) => {
                this.props.AddAlert(error.response.data, "danger");
            });
    };
    downvote = (_id) => {
        let data = qs.stringify({
            _id,
            tokenId: this.state.tokenId,
        });
        let config = {
            method: "post",
            url: "api/v1/comment/downvote/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };

        axios(config)
            .then((res) => {
                this.props.dispatch(AddAlert(res.data, "success"));
                this.setState({ rerender: -1 });
            })
            .catch((error) => {
                this.props.dispatch(AddAlert(error.response.data, "danger"));
            });
    };
    render() {
        const comment = this.state.comments.map((cm) => {
            return (
                <div className="chats">
                    <div className="avatar">
                        <img src={cm.imageurl} />
                    </div>
                    <div className="content">
                        <div className="header">
                            <span className="createdby">{cm.author}</span>
                            <span className="createdat">{formatDate(cm.createdAt)}</span>
                        </div>
                        <div className="text">{cm.text}</div>
                    </div>
                    <div className="votebox">
                        <span className="upvote" onClick={() => this.upvote(cm._id)}>
                            <i class="fas fa-arrow-up" />
                        </span>
                        <span>{cm.upvotes.length - cm.downvotes.length}</span>
                        <span className="downvote" onClick={() => this.downvote(cm._id)}>
                            <i class="fas fa-arrow-down" />
                        </span>
                    </div>
                </div>
            );
        });
        const nocomment = (
            <div className="chats">
                <div className="avatar">
                    <img src={noImage} />
                </div>
                <div className="content">
                    <div className="header">
                        <span className="createdby">Admin</span>
                        <span className="createdat">27.11.2020</span>
                    </div>
                    <div className="text">No comments yet!!!</div>
                </div>
                <div className="votebox">
                    <span className="upvote">
                        <i class="fas fa-arrow-up" />
                    </span>
                    <span>{5}</span>
                    <span className="downvote">
                        <i class="fas fa-arrow-down" />
                    </span>
                </div>
            </div>
        );
        return (
            <div className="chatbox">
                {this.state.comments.length > 0 ? comment : nocomment}
                <div className="commentfooter ">
                    <textarea
                        value={this.state.text}
                        onChange={(e) => this.setState({ text: e.target.value })}
                    />
                    {this.state.isauthenticated ? (
                        <input type="submit" value="Comment" onClick={this.sentcomment} />
                    ) : (
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login & Comment"
                            onSuccess={this.handelsuccess}
                            onFailure={this.handelfailure}
                            cookiePolicy={"single_host_origin"}
                        />
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
