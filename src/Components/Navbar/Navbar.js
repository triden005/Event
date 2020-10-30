import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import { logout } from "../../_action/AuthAction";
import proptype from "prop-types";

class Navbar extends React.Component {
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const guest = (
            <>
                <Link to="/register" className="right">
                    <i class="fa fa-fw fa-user-plus" /> Register
                </Link>

                <Link to="/login" className="right">
                    <i class="fa fa-fw fa-user" /> Login
                </Link>
            </>
        );
        const userlogin = (
            <>
                <Link to="/login" onClick={this.props.logout} className="right">
                    Logout
                </Link>
            </>
        );
        return (
            <nav className="navbar">
                <div className="container">
                    <Link to="/">
                        <i class="fa fa-fw fa-home" /> Home
                    </Link>
                    <span class="tohide">
                        <Link to="/addevent">
                            <i class="fa fa-fw fa-plus-square" /> AddEvent
                        </Link>

                        <Link to="/eventcalander">
                            <i class="fa fa-fw fa-calendar-plus" /> Calendar
                        </Link>
                        <Link to="/posters">Poster</Link>
                    </span>

                    <div class="dropdown right">
                        <button class="dropbtn">
                            <i class="fa fa-caret-down"></i> Options
                        </button>
                        <div class="dropdown-content">
                            <Link to="/addevent">
                                <i class="fa fa-fw fa-plus-square" /> AddEvent
                            </Link>

                            <Link to="/eventcalander">
                                <i class="fa fa-fw fa-calendar-plus" /> Calendar
                            </Link>
                            {isAuthenticated ? userlogin : guest}
                            {/* <Link to="/register">
                                <i class="fa fa-fw fa-user-plus" /> Register
                            </Link>

                            <Link to="/login">
                                <i class="fa fa-fw fa-user" /> Login
                            </Link> */}
                        </div>
                    </div>
                    <span class="tohide">
                        {isAuthenticated ? userlogin : guest}
                        {/* <Link to="/register" className="right">
                            <i class="fa fa-fw fa-user-plus" /> Register
                        </Link>

                        <Link to="/login" className="right">
                            <i class="fa fa-fw fa-user" /> Login
                        </Link> */}
                    </span>
                </div>
            </nav>
        );
    }
}
Navbar.proptype = {
    auth: proptype.object.isRequired,
};
const mapstatetoprops = (state) => ({
    auth: state.auth,
});

export default connect(mapstatetoprops, { logout })(Navbar);
