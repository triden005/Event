import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import store from "./Store";
import { Provider } from "react-redux";
import { loadUser } from "./_action/AuthAction";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home/Home";
import Polls from "./Components/Pages/Polls/poll";
import EventCalander from "./Components/Pages/Eventcalender";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AddEvent from "./Components/Pages/AddEvent";
import Club from "./Components/Pages/Clubspage/Clubs";
import Editevent from "./Components/Pages/Editevent";
import addPoll from "./Components/Pages/Polls/addPoll";
import Chatbox from "./Components/Pages/chatbox/Chatbox";
import { connect } from "react-redux";
import Auth from "./Utils/Auth";
import { AlertModel } from "./Components/Alert/AlertModel";

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
                    <AlertModel />
                    <Switch>
                        {/* Auth second param 0-for public 1-for only login 2-for only not login */}
                        <Route exact path="/addevent" component={Auth(AddEvent, 1)} />

                        <Route exact path="/eventcalander" component={Auth(EventCalander, 0)} />

                        <Route exact path="/poll" component={Auth(Polls, 0)} />
                        <Route exact path="/login" component={Auth(Login, 2)} />

                        <Route exact path="/addpoll" component={Auth(addPoll, 1)} />

                        <Route exact path="/register" component={Auth(Register, 2)} />

                        <Route exact path="/user/:id" component={Club} />
                        <Route exact path="/edit/:id" component={Auth(Editevent, 1)} />

                        <Route path="/" component={Home} />
                    </Switch>
                    {<Redirect to="/" />}
                </Router>
                {/* <Error /> */}
            </Provider>
        );
    }
}

export default App;
