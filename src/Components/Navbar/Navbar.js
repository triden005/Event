import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
class Navbar extends React.Component {
    render() {
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
                            <Link to="/register">
                                <i class="fa fa-fw fa-user-plus" /> Register
                            </Link>

                            <Link to="/login">
                                <i class="fa fa-fw fa-user" /> Login
                            </Link>
                        </div>
                    </div>
                    <span class="tohide">
                        <Link to="/register" className="right">
                            <i class="fa fa-fw fa-user-plus" /> Register
                        </Link>

                        <Link to="/login" className="right">
                            <i class="fa fa-fw fa-user" /> Login
                        </Link>
                    </span>
                </div>
            </nav>
        );
    }
}

export default Navbar;
