import React, { useState } from 'react';
import '../css/Weather.css';
import WeatherData from './WeatherData';
import Expand from './Expand';
import Tag from './Tag';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

let storage = window.localStorage;
let tag_spliter = " ";

// adding valid tags in localStorage's current city data
const addNewTag = (filter, keyCode, new_tags) => {
    var clear = false;

    // handle case of tag_spliter exist in input value
    if (filter.indexOf(tag_spliter) > -1) {
        alert(`No "${tag_spliter}" should include in Tag`);
        clear = true;
    }

    // handle case of invalid empty tag
    else if (keyCode === 13 && filter === "") {
        alert(`No empty tag should been add`);
        clear = true;
    }

    // saving tag iff press "enter"
    else if (keyCode === 13) {

        var tag = filter + tag_spliter;

        // Add new tag if tag is not store in current city
        if (new_tags.indexOf(tag_spliter + tag) === -1) {
            new_tags += (tag);
        } else {
            // handle case of duplicate tag
            alert(`No duplicate tag should been add`);
        }
        // clear text input field
        clear = true;
    }
    return [clear, new_tags];
}

// LocalStorage Hook
function useLocalStorage(stu_id) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [prevState, setPrevState] = useState([]);
    const [city, setWeather] = useState(() => {
        try {
            // Get from local storage by stu_id
            const exist_stu = storage.getItem(stu_id);
            return exist_stu ? JSON.parse(exist_stu) : {};
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    });

    // update city's tag by value of input tagEvent
    const setNewWeather = tagEvent => {
        try {
            // adding tag and clear tag adding field by cases
            const [clear, new_tags] = addNewTag(tagEvent.target.value, tagEvent.nativeEvent.keyCode, city.tags);
            if (clear) {
                tagEvent.target.value = "";
                city.tags = new_tags;
            };

            // Save new city in state and update new state for synchronize render
            setWeather(city);
            setPrevState([...prevState]);

            // Save new city to local storage
            storage.setItem(stu_id, JSON.stringify(city));

        } catch (error) {
            console.error('Error:', error);
        }
      };

    return [city, setNewWeather];
}

function Weather(props) {
    const {stu_id, expand, city_filter, tag_filter, 
        handleExpand, handleFilter} = props;
    var city_name, grades, avg, remove_by_city, remove_by_tag, disp;

    // init city local storage update hook
    const [city, setNewWeather] = useLocalStorage(stu_id);

    // getting useful data from city
    city_name = `${city.firstName} ${city.lastName}`.toUpperCase();
    grades = city.grades.map(grade => parseInt(grade, 10));
    avg = grades.reduce((a, b) => a + b, 0) / grades.length;

    // check whether current city is not filter by city_filter or tag_filter
    remove_by_city = city_name.indexOf(city_filter) === -1;
    remove_by_tag = city.tags.indexOf(tag_filter) === -1;
    disp = (remove_by_city || remove_by_tag)? {display:"none"}: {};

    return (
        <li className="single_city" style={disp}>
            <table>
                <tbody>
                    <WeatherData city={city} city_name={city_name} avg={avg}/>
                    <tr>
                        <td></td>
                        <td>
                            <Expand stu_id={stu_id} grades={grades}
                                expand={expand} handleExpand={handleExpand} />
                            <Tag tags={city.tags} handleFilter={handleFilter}
                                setNewWeather={setNewWeather}/>
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
        posts: state.posts
      }
    })(Weather);

