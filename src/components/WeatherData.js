import React from 'react';
import '../css/WeatherData.css';

import { connect } from "react-redux";

function WeatherData(props) {
    const {cityID} = props;
    const city = props.weather.getIn("login.captials".split("."))[cityID];

    return (
        <tr>
            <td>
                <img alt={`${city.city} weather icon`} src={city.icon} />
            </td>
            <td>
                <ul className='data_space'>
                    <li key="0"><div className='city_name' style={{width:"100%"}}>{city.city}</div></li>
                    <li key="0"><div className='country_name' style={{width:"100%"}}>{city.country}</div></li>
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
