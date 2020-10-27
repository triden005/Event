import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
class Register extends React.Component {
    state = {};
    handelchange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
    };
    onFileChange = (e) => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        });
    };
    render() {
        return (
            <div className="div1-register">
                <div className="Register">
                    <h1>Register</h1>
                    <p>Create An account to manage your Events...</p>
                    <div className="container">
                        <form onSubmit={null} className="left">
                            <div>
                                <label for="clubname">clubname</label>
                            </div>
                            <input type="text" value={this.state.clubname} placeholder="The name" onChange={this.handelchange} name="clubname" id="clubname" required />
                            <div>
                                <label for="bio">Bio</label>
                            </div>
                            <textarea style={{ width: "350px", minHeight: "100px" }} value={this.state.bio} onChange={this.handelchange} type="text" placeholder="The Fame" name="bio" id="bio" required />
                            <div>
                                <label for="username">UserName</label>
                            </div>
                            <input type="text" placeholder="Enter username" value={this.state.username} onChange={this.handelchange} name="username" id="username" required />
                            <div>
                                <label for="password">Password</label>
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={this.handelchange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                value={this.state.password}
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                            />
                            <div>
                                <label for="reppasswordd">Repeat Password</label>
                            </div>
                            <input
                                type="password"
                                id="reppassword"
                                name="reppassword"
                                onChange={this.handelchange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                value={this.state.reppassword}
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                            />
                            <input type="submit" value="Register  " />
                        </form>
                    </div>
                </div>

                <div className="Register right center">
                    <div>
                        <img src={this.state.file} />
                        <input type="file" onChange={this.onFileChange} />
                        <input type="submit" onClick={this.fileupload} value="Upload " />
                    </div>
                    Already have an account?{" "}
                    <Link to="./login" className="submit">
                        {" "}
                        Log In!
                    </Link>
                    .
                </div>
            </div>
        );
    }
}

export default Register;
