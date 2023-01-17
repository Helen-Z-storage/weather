import { actionType } from "../actions/actionType";
import { fromJS } from "immutable";

const initialState = () => {
    return fromJS(
        {
            cityFilter:        "",
            countryFilter:     "",
            tagFilter:         "",
        }
    )
}

export default function reducer(state=initialState(), action) {
    if (typeof reducer.prototype[action.type] === "function") {
        return reducer.prototype[action.type](state, action);
    }
    return state;
}

reducer.prototype[actionType.ui.setCityFilter] = (state, action) => {
    return state.set("cityFilter", action.payload);
}

reducer.prototype[actionType.ui.setCountryFilter] = (state, action) => {
    return state.set("countryFilter", action.payload);
}

reducer.prototype[actionType.ui.setTagFilter] = (state, action) => {
    return state.set("tagFilter", action.payload);
}