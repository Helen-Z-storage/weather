import ui from "./uiReducer";
import weather from "./weatherReducer";
import { combineReducers } from "redux";

export default combineReducers({
    ui,
    weather,
})
