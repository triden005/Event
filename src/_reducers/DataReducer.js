import { DATA_LOADED, DATA_LOADING } from "../_action/action_types";

const initialState = {
    users: [],
    events: [],
    isLoading: null,
};

export default function DataReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case DATA_LOADED:
            return {
                ...state,
                users: action.payload.users,
                events: action.payload.events,
                isLoading: false,
            };
        default:
            return state;
    }
}
