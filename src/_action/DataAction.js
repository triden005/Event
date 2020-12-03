import { DATA_LOADING, DATA_LOADED } from "./action_types";
import { AddAlert } from "./AlertAction";
///import action type for data action
import axios from "axios";

export const loaddata = () => (dispatch) => {
    dispatch({ type: DATA_LOADING });
    var config = {
        method: "get",
        url: "api/v1/home",
    };

    axios(config)
        .then((res) => {
            var usermap = new Map();
            var eventmap = new Map();
            var pollmap = new Map();
            var user = res.data.data.user;
            var event = res.data.data.event;
            var poll = res.data.data.poll;
            user.map((us) => usermap.set(us._id, us));
            event.map((eve) => eventmap.set(eve._id, eve));
            if (poll) poll.map((p) => pollmap.set(p._id, p));
            dispatch({
                type: DATA_LOADED,
                payload: { users: usermap, events: eventmap, polls: pollmap },
            });
        })
        .catch((err) => {
            if (err.response)
                dispatch(AddAlert({ message: "Something Went Wrong" }, err.response.status));
            console.log(err);
        });
};
