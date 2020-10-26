import React from "react";
import { Link } from "react-router-dom";
class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/addevent">Addevent</Link>
                    </li>
                    <li>
                        <Link to="/eventcalander">eventcalander</Link>
                    </li>
                    <li>
                        <Link to="/posters">poster</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
