import React from 'react';
import '../css/Weather.css';
import WeatherData from './WeatherData';
import Expand from './Expand';
import Tag from './Tag';
import weatherList from "../data/weather.json";
const fileSystem = require("browserify-fs");

const tag_spliter = ",";
// adding valid tags in localStorage's current student data
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

        // Add new tag if tag is not store in current student
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

function Weather(props) {
    const {id, expand, cityFilter, countryFilter, tagFilter, 
        handleExpand, handleFilter} = props;

    const setNewCity = tagEvent => {
        const newWeatherList = weatherList.map(
            (weather, i) => {
                if (id === i){
                    const [clear, new_tags] = addNewTag(tagEvent.target.value, tagEvent.nativeEvent.keyCode, weather.tags);
                    if (clear) {
                        const newWeather = {...weather};
                        tagEvent.target.value = "";
                        newWeather.tags = new_tags;
                        return newWeather
                    }
                }
                return weather;
            })
        const data = JSON.stringify(newWeatherList);
        console.log(data);
        fileSystem.writeFile("weather.json", data, err=>{
            if(err){
                console.log("Error writing file" ,err)
            } else {
                console.log('JSON data is written to the file successfully')
            }
        });
    }
    /*
    const {id, weatherList, expand, cityFilter, countryFilter, tagFilter, 
        handleExpand, handleFilter, setWeatherList} = props;

    const setNewCity = tagEvent => {
        setWeatherList(weatherList.map(
            (weather, i) => {
                if (id === i){
                    const [clear, new_tags] = addNewTag(tagEvent.target.value, tagEvent.nativeEvent.keyCode, weather.tags);
                    if (clear) {
                        const newWeather = {...weather};
                        tagEvent.target.value = "";
                        newWeather.tags = new_tags;
                        return newWeather
                    }
                }
                return weather;
            })
        )
    }
    */
    
    let currCity, removeByCity, removeByCountry, removeByTag, disp;
    currCity = weatherList[id];
    removeByCity = currCity.city.indexOf(cityFilter) === -1;
    removeByCountry = currCity.country.indexOf(countryFilter) === -1;
    removeByTag = currCity.tags.indexOf(tagFilter) === -1;

    disp = (removeByCity || removeByCountry || removeByTag)? {display:"none"}: {};

    return (
        <li className="single_city" style={disp}>
            <table>
                <tbody>
                    <WeatherData currCity={currCity}/>
                    <tr>
                        <td></td>
                        <td>
                            <Expand id={id} currCity={currCity}
                                expand={expand} handleExpand={handleExpand} />
                            <Tag tags={currCity.tags} handleFilter={handleFilter}
                                setNewCity={setNewCity}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>
    );
}

export default Weather;

