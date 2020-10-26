import React from "react";

import "./login.css";
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
    };
    render() {
        return (
            <div className="Login">
                <div class="container">
                    <form onSubmit={this.onSubmit}>
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required onChange={this.handelchange} />

                        <label for="pssword">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={this.handelchange}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            required
                        />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
