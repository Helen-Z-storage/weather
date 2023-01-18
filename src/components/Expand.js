import React from 'react';
import '../css/Expand.css';

import { connect } from "react-redux";
import * as uiActions from "../redux/actions/uiActions";

const tag_spliter = " ";
const defaultCity = {
    id: -1,
    country: "",
    city: "",
    lat: 0.0,
    lon: 0.0,
    tags: tag_spliter,
    icon: "",
    avg_forecast: {
        timestamp: "",
        temp: 0.00,
        feels_like: 0.00,
        temp_min: 0.00,
        temp_max: 0.00,
        icon: ""
    },
    detail_forecast: new Array(8).fill({
        timestamp: "", 
        temp: 0.00,
        feels_like: 0.00,
        temp_min: 0.00,
        temp_max: 0.00,
        icon: "",
    })
};

function Expand(props) {
    const {cityID} = props;
    const groupExpand = props.ui.get("groupExpand");
    const city = props.weather.getIn("weather.captials".split("."))[cityID];

    const handleExpand = (cityID) => {
      props.dispatch(uiActions.setGroupExpand(groupExpand.map(
          (expand, i) => i === cityID ? !expand: expand)));
    }
    
    const detailWeatherList = <li></li>;
    const avgWeatherList = <li></li>;
    if (city && Object.keys(city).length !== 0) {
      const avgWeather = city.avg_forecast;
      const detailWeathers = city.detail_forecast;
      
      // expanded 
      detailWeatherList = detailWeathers.map(
        (weatherObj, i) => 
          <li key={"weather_" + i}>
            <table>
              <tr>
                <td>{`${weatherObj.timestamp}:`}</td>
                <td>{weatherObj.icon}</td>
                <td>{`${weatherObj.temp} C`}</td>
                <td>{`${weatherObj.feels_like} C`}</td>
                <td>{`${weatherObj.temp_min} C`}</td>
                <td>{`${weatherObj.temp_max} C`}</td>
              </tr>
            </table>
            </li>);

      avgWeatherList = 
      <li key={"avg_weather"}>
            <table>
              <tbody>
                <tr>
                  <td>{`${avgWeather.timestamp}:`}</td>
                  <td>{avgWeather.icon}</td>
                  <td>{`${avgWeather.temp} C`}</td>
                  <td>{`${avgWeather.feels_like} C`}</td>
                  <td>{`${avgWeather.temp_min} C`}</td>
                  <td>{`${avgWeather.temp_max} C`}</td>
                </tr>
              </tbody>
            </table>
            </li>;
    }
    return (
        <ul className='detailWeather'>
            <li><button className="expand" onClick={() => handleExpand(cityID)}>
                {groupExpand[cityID]? "-": "+"}</button></li>
            {groupExpand[cityID]? detailWeatherList: avgWeatherList}
        </ul>
        );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        weather: state.weather
      }
    })(Expand);