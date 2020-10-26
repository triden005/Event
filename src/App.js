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
class App extends React.Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route path="/addevent">
                                <AddEvent />
                            </Route>
                            <Route path="/eventcalander">
                                <EventCalander />
                            </Route>
                            <Route path="/posters">
                                <Poster />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
