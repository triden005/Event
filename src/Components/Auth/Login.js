import React from "react";

import "./login.css";
import { login } from "../../_action/AuthAction";
import { connect } from "react-redux";
import proptype from "prop-types";

class Login extends React.Component {
    state = {
        username: "",
        password: "",
    };

    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login({ username: this.state.username, password: this.state.password });
    };
    componentDidUpdate(props) {
        if (this.props.isAuthenticated === true && this.state.username !== "") {
            this.setState({ username: "", password: "" });
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div className="div1-login">
                <div className="Login">
                    <div class="container">
                        <form onSubmit={this.onSubmit}>
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" value={this.state.username} required onChange={this.handelchange} />
                            <br />
                            <label for="password">Password</label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={this.handelchange}
                                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                value={this.state.password}
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                            />

                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
                <div className="Login right">
                    <h3>
                        <li>For many problem the one solution</li>
                        <li>A platform that Brings every one closer</li>
                        <li>Just one step Far</li>
                        <li>Login to access and maintain all your events</li>
                    </h3>
                </div>
            </div>
        );
    }
}
Login.proptype = {
    isAuthenticated: proptype.bool.isRequired,
};
const mapstatetoprops = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapstatetoprops, { login })(Login);
