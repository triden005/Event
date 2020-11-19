import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { connect } from "react-redux";
import proptype from "prop-types";
import { AddAlert } from "../../_action/AlertAction";
import { register } from "../../_action/AuthAction";

class Register extends React.Component {
    //form will have all the form data
    state = {
        form: {},
    };

    //for handelling input
    handelchange = (e) => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value },
        });
    };

    //for submit
    onsubmit = (e) => {
        e.preventDefault();
        if (this.state.form.password !== this.state.form.confirm_password) {
            this.props.AddAlert("password donot match", "danger");

            this.setState({ form: { ...this.state.form, confirm_password: "" } });
        } else {
            this.props.register({ ...this.state.form });
            this.setState({
                form: { ...this.state.form, username: "", password: "" },
            });
        }
    };

    //onfile upload
    onFileChange = (e) => {
        this.setState({
            form: { ...this.state.form, file: e.target.files[0] },
            image: URL.createObjectURL(e.target.files[0]),
        });
    };

    //for redirect after successful registering
    componentDidUpdate(props) {
        if (this.props.isAuthenticated === true) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="div1-register">
                <div className="register">
                    <div className="container">
                        <h1>Register</h1>
                        <p>Create An account to manage your Events...</p>
                        <form onSubmit={this.onsubmit} className="left">
                            <div>
                                <label>clubname</label>
                            </div>
                            <input
                                type="text"
                                value={this.state.form.username}
                                placeholder="Name"
                                onChange={this.handelchange}
                                name="username"
                                required
                            />
                            <div>
                                <label>Bio</label>
                            </div>
                            <textarea
                                style={{ minHeight: "100px" }}
                                value={this.state.form.bio}
                                onChange={this.handelchange}
                                type="text"
                                placeholder="The Fame"
                                name="bio"
                                required
                            />
                            <div>
                                <label>Email</label>
                            </div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={this.state.form.email}
                                onChange={this.handelchange}
                                name="email"
                                required
                            />
                            <div>
                                <label>Password</label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handelchange}
                                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                value={this.state.form.password}
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                            />
                            <div>
                                <label>Repeat Password</label>
                            </div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                id="reppassword"
                                name="confirm_password"
                                onChange={this.handelchange}
                                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                value={this.state.form.confirm_password}
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                            />
                            <img src={this.state.image} />
                            <input type="file" onChange={this.onFileChange} />
                            <input type="submit" value="Register" className="submit-button" />
                            <div className="have-account">
                                Already have an account?&nbsp;&nbsp;
                                <Link to="./login" className="login-link">
                                    Log In!
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
Register.proptype = {
    isAuthenticated: proptype.bool.isRequired,
};
const mapstatetoprops = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapstatetoprops, { AddAlert, register })(Register);
