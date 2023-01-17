import React from 'react';
import '../css/Expand.css';

import { connect } from "react-redux";
import * as uiActions from "../redux/actions/uiActions";

function Expand(props) {
    const {cityID} = props;
    const groupExpand = props.ui.get("groupExpand");
    const avgWeather = props.weather.getIn("login.captials".split("."))[cityID].avg_forecast;
    const detailWeathers = props.weather.getIn("login.captials".split("."))[cityID].detail_forecast;

    const handleExpand = (cityID) => {
      props.dispatch(uiActions.setGroupExpand(groupExpand.map(
          (expand, i) => i === cityID ? !expand: expand)));
    }

    // expanded 
    const detailWeatherList = detailWeathers.map(
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

    const avgWeatherList = 
    <li key={"avg_weather"}>
          <table>
            <tr>
              <td>{`${avgWeather.timestamp}:`}</td>
              <td>{avgWeather.icon}</td>
              <td>{`${avgWeather.temp} C`}</td>
              <td>{`${avgWeather.feels_like} C`}</td>
              <td>{`${avgWeather.temp_min} C`}</td>
              <td>{`${avgWeather.temp_max} C`}</td>
            </tr>
          </table>
          </li>;
    
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