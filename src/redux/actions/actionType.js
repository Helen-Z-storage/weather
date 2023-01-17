import { ActionType } from "redux-promise-middleware";
export const actionType = {
    ui: {
        setCityFilter:        "UI_SETCITYFILTER",
        setCountryFilter:     "UI_SETCOUNTRYFILTER",
        setTagFilter:         "UI_SETTAGFILTER",
    },
    weather: {
        weatherLoadPending:  `WEATHER_LOAD${ActionType.Pending}`,
        weatherLoadFulfilled:`WEATHER_LOAD${ActionType.Fulfilled}`,
        weatherLoadRejected: `WEATHER_LOAD${ActionType.Rejected}`,
        weatherErrMsgReset:  `WEATHER_ERRMSGRESET`
    },
}
