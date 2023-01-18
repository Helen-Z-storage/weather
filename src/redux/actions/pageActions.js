import { actionType } from "./actionType";
import { get } from "../../utilities/fetch";
import capitals from "../../data/capital.json";
import { round2, sumList } from "../../utilities/helpers";

const API_key = "87391d7ad955bd47f528c419e1b7519d";
const icon_img = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;
const tag_spliter = " ";

export const weatherErrMsgReset = () => {
    return (dispatch) => {
        dispatch({type: actionType.weather.weatherErrMsgReset});
    }
}

export const pageSetWeather = (weathers) => {
    return (dispatch) => {
        dispatch({type: actionType.weather.weatherLoadFulfilled, payload: weathers});
    }
}

export const pageLoadWeather = () => {
    return (dispatch) => {
        dispatch({type: actionType.weather.weatherLoadPending, payload: null});
        // change url to fetch data
        console.log(capitals.capitals);
        const weathers = capitals.capitals.map((capital, i) => {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${capital.lat}&lon=${capital.lon}&units=metric&cnt=8&appid=${API_key}`
            get(url)
            .then(res => {
                if (res.cod !== "200") {
                    dispatch({type: actionType.weather.weatherLoadRejected, payload: `ErrorCode ${res.cod}: ${res.message}`})
                } else {            
                    const weather_obj = {
                        id: i,
                        country: capital.country.toUpperCase(),
                        city: capital.city.toUpperCase(),
                        lat: capital.lat,
                        lon: capital.lon,
                        tags: tag_spliter,
                        icon: icon_img(res.list[0].weather.icon),
                        avg_forecast: {
                            timestamp: res.list[0].dt_txt,
                            temp: round2(sumList(res.list.map(({main}) => main.temp)) / 8),
                            feels_like: round2(sumList(res.list.map(({main}) => main.feels_like)) / 8),
                            temp_min: round2(sumList(res.list.map(({main}) => main.temp_min)) / 8),
                            temp_max: round2(sumList(res.list.map(({main}) => main.temp_max)) / 8),
                            icon: icon_img(res.list[0].weather.icon)
                        },
                        detail_forecast: res.list.map(
                            ({main, weather, dt_txt}) => {
                                return {
                                    timestamp: dt_txt, 
                                    temp: main.temp,
                                    feels_like: main.feels_like,
                                    temp_min: main.temp_min,
                                    temp_max: main.temp_max,
                                    icon: icon_img(weather.icon),
                                };})
                    }
                    return weather_obj;
                    
                }
            })
            .catch(error => {dispatch({type: actionType.weather.weatherLoadRejected, payload: `${error.response}`})})
            return {};
        })
        dispatch({type: actionType.weather.weatherLoadFulfilled, payload: weathers});
    }
}