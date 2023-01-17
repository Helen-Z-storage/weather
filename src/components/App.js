import React from 'react';
import WeatherList from './WeatherList';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

// global variables
// link https://openweathermap.org/forecast5#geo5
let API_key = "87391d7ad955bd47f528c419e1b7519d"
let storage = window.localStorage;
// use this tag_spliter to split tags
// tag which insert same as tag_spliter and "" tag is not included
let tag_spliter = " ";


// image `https://openweathermap.org/img/wn/${icon}@2x.png`

// fetch by GET
// since it store in localStorage, data will not lost after we close browser
if (storage.length === 0) {
    for (let i = 0; i < country_lst.length; i++) {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=8&appid=${API_key}`
        fetch(url)
        .then(response => response.json())
        .then(fetched_data => {
    
            // store every single city from fetched_data into local storage
            // useing index 0 to storage.length to find them
            // adding "tags" to store tags by string
            fetched_data.citys.map((city, i) => {
                city['tags'] = tag_spliter;
                storage.setItem(i, JSON.stringify(city));
                // DIFF
                return i;
            });
        })
        .catch(error => console.error('Error:', error));
    }

}

function App() {
    return (
        <WeatherList store_length={storage.length}/>
    );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        posts: state.posts
      }
    })(App);