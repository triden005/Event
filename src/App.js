import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import store from "./Store";
import { Provider } from "react-redux";
import { loadUser } from "./_action/AuthAction";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home/Home";
import EventCalander from "./Components/Pages/Eventcalender";
import Poster from "./Components/Pages/Poster";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AddEvent from "./Components/Pages/AddEvent";

import { connect } from "react-redux";
import Auth from "./Utils/Auth";

class App extends React.Component {
    state = {};
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            {/* Auth second param 0-for public 1-for only login 2-for only not login */}
                            <Route exact path="/addevent" component={Auth(AddEvent, 1)} />

                            <Route exact path="/eventcalander" component={Auth(EventCalander, 0)} />

                            <Route exact path="/posters" component={Auth(Poster, 0)} />

                            <Route exact path="/login" component={Auth(Login, 2)} />

                            <Route exact path="/register" component={Auth(Register, 2)} />

                            <Route path="/" component={Home} />
                        </Switch>
                    </div>
                </Router>
                <Error />
            </Provider>
        );
    }
}

const mapstatetoprops = (state) => ({
    alert: state.alert,
});

const _Error = (props) => {
    const { msg, status } = props.alert;
    return (
        <div>
            {/* {msg.length != null ? msg.map((ms) => <div>{msg.ms}</div>) : null} */}
            {msg ? <div>msg={msg.message}</div> : null}
            {status ? <div>status={status}</div> : null}
        </div>
    );
};

const Error = connect(mapstatetoprops)(_Error);

export default App;
