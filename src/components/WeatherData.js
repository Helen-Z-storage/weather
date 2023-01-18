import React from 'react';
import '../css/WeatherData.css';

import { connect } from "react-redux";

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

function WeatherData(props) {
    const {cityID} = props;
    let city = props.weather.getIn("weather.captials".split("."))[cityID];
    
    if (!city || Object.keys(city).length === 0) {
        city = defaultCity;
    }
    
    return (
        <tr>
            <td>
                <img alt={`${city.city} weather icon`} src={city.icon} />
            </td>
            <td>
                <ul className='data_space'>
                    <li key="0"><div className='city_name' style={{width:"100%"}}>{city.city}</div></li>
                    <li key="1"><div className='country_name' style={{width:"100%"}}>{city.country}</div></li>
                </ul>
            </td>
        </tr>
    );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        weather: state.weather
      }
    })(WeatherData);
