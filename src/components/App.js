import React from 'react';
import WeatherList from './WeatherList';

import { connect } from "react-redux";

function App(props) {
    
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