import React from "react";
import "./login.css";
import { login } from "../../_action/AuthAction";
import { connect } from "react-redux";
import proptype from "prop-types";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  //handel input
  handelchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //submit form
  onSubmit = (e) => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  };

  //for redirect after successful submit
  componentDidUpdate() {
    if (this.props.isAuthenticated === true && this.state.email !== "") {
      this.setState({ email: "", password: "" });
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div className="div1-login">
        <div className="login">
          <h2 class="login-text">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="left">
              <label htmlFor="email"> Email </label>
            </div>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              required
              onChange={this.handelchange}
            />
            <br />
            <div className="left">
              <label htmlFor="password">Password</label>
            </div>
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

            <input type="submit" value="Submit" class="submit-button" />
          </form>
        </div>
        <div className="login-right">
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
