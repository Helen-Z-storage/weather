import React from 'react';
import '../css/WeatherList.css';
import Weather from './Weather';
import Filter from './Filter';

import { connect } from "react-redux";
import * as uiActions from "../redux/actions/uiActions";
import * as pageActions from "../redux/actions/pageActions";

function WeatherList(props) {
    const groupExpand = props.ui.get("groupExpand");

    const city_lst = groupExpand.map((_, i) => {
        return <Weather key={i} store={props} cityID={i}/>;
    })   
    
    return (
        <table id="context_box">
            <tbody>
                <tr>
                    <Filter store={props}/>
                </tr>
                <tr>
                    <td>
                        <ul id="lst_table">{city_lst}</ul>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }

export default connect (
    (state) => {
      return {
        ui: state.ui,
        weather: state.weather
      }
    })(WeatherList);
