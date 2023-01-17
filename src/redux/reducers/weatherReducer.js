import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS({
        weather: {
            captials: [],
            errorMsg: "",
            loading: true,
            loaded: false
        }
    });
}

export default function reducer(state=initialState(), action) {
    if (typeof reducer.prototype[action.type] === "function") {
        return reducer.prototype[action.type](state, action);
    }
    return state;
}

reducer.prototype[actionType.weather.weatherLoadPending] = (state, action) => {
    return state.setIn("weather.loading".split("."), true)
                .setIn("weather.loaded".split("."), false)
                .setIn("weather.captials".split("."), [])
                .setIn("weather.errorMsg".split("."), "");
}

reducer.prototype[actionType.weather.weatherLoadRejected] = (state, action) => {
    return state.setIn("weather.loading".split("."), false)
                .setIn("weather.loaded".split("."), false)
                .setIn("weather.captials".split("."), [])
                .setIn("weather.errorMsg".split("."), action.payload);
}

reducer.prototype[actionType.weather.weatherLoadFulfilled] = (state, action) => {
    return state.setIn("weather.loading".split("."), false)
                .setIn("weather.loaded".split("."), true)
                .setIn("weather.captials".split("."), action.payload)
                .setIn("weather.errorMsg".split("."), "");
}

reducer.prototype[actionType.weather.weatherErrMsgReset] = (state, _) => {
    return state.setIn("weather.loading".split("."), false)
                .setIn("weather.loaded".split("."), false)
                .setIn("weather.captials".split("."), [])
                .setIn("weather.errorMsg".split("."), "");
}