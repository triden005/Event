import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./Store";
import { Provider } from "react-redux";
import { loadUser } from "./_action/AuthAction";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import EventCalander from "./Components/Pages/Eventcalender";
import Poster from "./Components/Pages/Poster";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AddEvent from "./Components/Pages/AddEvent";

import { connect, getState } from "react-redux";

class App extends React.Component {
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
                            <Route exact path="/addevent" component={AddEvent} />

                            <Route exact path="/eventcalander" component={EventCalander} />

                            <Route exact path="/posters" component={Poster} />

                            <Route exact path="/login" component={Login} />

                            <Route exact path="/register" component={Register} />

                            <Route exact path="/" component={Home} />
                        </Switch>
                    </div>
                    <Error />
                </Router>
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
