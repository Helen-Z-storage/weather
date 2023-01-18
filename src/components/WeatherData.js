import React from 'react';
import '../css/WeatherData.css';

function WeatherData(props) {
    const {currCity} = props;

    return (
        <tr>
            <td>
                <img className='curr_weather' alt={`${currCity.city} weather icon`} src={currCity.icon} />
            </td>
            <td>
                <ul className='data_space'>
                    <li key="0"><div className='city_name' style={{width:"100%"}}>{currCity.city}</div></li>
                    <li key="1"><div className='country_name' style={{width:"100%"}}>{currCity.country}</div></li>
                </ul>
            </td>
        </tr>
    );
}

export default WeatherData;
