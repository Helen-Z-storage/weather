import React from 'react';
import '../css/Weather.css';
import WeatherData from './WeatherData';
import Expand from './Expand';
import Tag from './Tag';

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

function Weather(props) {
    const {cityID} = props;
    const cityFilter = props.ui.get("cityFilter");
    const countryFilter = props.ui.get("countryFilter");
    const tagFilter = props.ui.get("tagFilter");
    const city = props.weather.getIn("weather.captials".split("."))[cityID] || defaultCity;

    // check whether current city is not filter by city_filter or tag_filter
    const remove_by_city = city.city.indexOf(cityFilter) === -1;
    const remove_by_country = city.country.indexOf(countryFilter) === -1;
    const remove_by_tag = city.tags.indexOf(tagFilter) === -1;
    const disp = (remove_by_city || remove_by_country || remove_by_tag)? {display:"none"}: {};

    return (
        <li className="single_city" style={disp}>
            <table>
                <tbody>
                    <WeatherData cityID={cityID} store={props}/>
                    <tr>
                        <td></td>
                        <td>
                            <Expand cityID={cityID} store={props}/>
                            <Tag cityID={cityID} store={props}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>
    );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        weather: state.weather
      }
    })(Weather);

