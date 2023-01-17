import { actionType } from "./actionType";
import {post} from "../../utilities/fetch";
import * as uiActions from "./uiActions";

import capitals from "../data/capital.json";

export const weatherErrMsgReset = () => {
    return (dispatch) => {
        dispatch({type: actionType.weather.weatherErrMsgReset});
    }
}

export const pageLoginLoadUser = (username, password) => {
    return (dispatch) => {
        dispatch({type: actionType.weather.weatherLoadPending, payload: null});
        // change url to fetch data
        post("http://localhost:8080/api/login", { username: username, password: password })
        .then(res => {
            if (res.cod !== 200) {
                dispatch({type: actionType.weather.weatherLoadRejected, payload: `ErrorCode ${res.cod}: ${res.message}`})
            } else {
                // setting average calculations here
                dispatch({type: actionType.weather.weatherLoadFulfilled, payload: res});
            }
        })
        .catch(error => {dispatch({type: actionType.weather.weatherLoadRejected, payload: `${error.response}`})})
    }
}