import React, { useEffect } from 'react';
import WeatherList from './WeatherList';

import { connect } from "react-redux";
import * as pageActions from "../redux/actions/pageActions";

function App(props) {
    
  useEffect(() => {
    props.dispatch(pageActions.pageLoadWeather());
  }, []);
    return (
        <WeatherList store={props}/>
    );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        weather: state.weather
      }
    })(App);