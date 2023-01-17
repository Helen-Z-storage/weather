import React from 'react';
import '../css/WeatherData.css';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

function WeatherData(props) {
    const {city, city_name, avg} = props;

    return (
        <tr>
            <td>
                <img alt={`${city_name} profile`} src={city.pic} />
            </td>
            <td>
                <ul className='data_space'>
                    <li key="0"><div className='city_name' style={{width:"100%"}}>{city_name}</div></li>
                    <li key="1" className='city_data'>{`Email: ${city.email}`}</li>
                    <li key="2" className='city_data'>{`Company: ${city.company}`}</li>
                    <li key="3" className='city_data'>{`Skill: ${city.skill}`}</li>
                    <li key="4" className='city_data'>{`Average: ${Math.round(avg * 1000) / 1000}%`}</li>
                </ul>
            </td>
        </tr>
    );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        posts: state.posts
      }
    })(WeatherData);
