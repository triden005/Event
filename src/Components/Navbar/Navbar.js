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

                    <Link to="/addevent">
                        <i class="fa fa-fw fa-plus-square" /> AddEvent
                    </Link>

                    <Link to="/eventcalander">
                        <i class="fa fa-fw fa-calendar-plus" /> Calendar
                    </Link>

                    <Link to="/posters">Poster</Link>

                    <Link to="/register" className="right">
                        <i class="fa fa-fw fa-user-plus" /> Register
                    </Link>

                    <Link to="/login" className="right">
                        <i class="fa fa-fw fa-user" /> Login
                    </Link>
                </div>
            </nav>
        );
    }
}

export default Navbar;
