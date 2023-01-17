import React from 'react';
import '../css/Weather.css';
import WeatherData from './WeatherData';
import Expand from './Expand';
import Tag from './Tag';

import { connect } from "react-redux";

function Weather(props) {
    const {cityID} = props;
    const cityFilter = props.ui.get("cityFilter");
    const countryFilter = props.ui.get("countryFilter");
    const tagFilter = props.ui.get("tagFilter");
    const city = props.weather.getIn("weather.captials".split("."))[cityID];

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

