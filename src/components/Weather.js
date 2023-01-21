import React, {useState} from 'react';
import '../css/Weather.css';
import WeatherData from './WeatherData';
import Expand from './Expand';
import Tag from './Tag';
const fileSystem = require("browserify-fs");

const storage = window.localStorage;

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

// LocalStorage Hook
function useLocalStorage(cityID) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [prevState, setPrevState] = useState([]);
    const [city, setCity] = useState(() => {
        try {
            // Get from local storage by cityID
            const existCity = storage.getItem(cityID);
            return existCity ? JSON.parse(existCity) : {};
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    });

    // update student's tag by value of input tagEvent
    const setNewCity = tagEvent => {
        try {
            // adding tag and clear tag adding field by cases
            const [clear, new_tags] = addNewTag(tagEvent.target.value, tagEvent.nativeEvent.keyCode, city.tags);
            if (clear) {
                tagEvent.target.value = "";
                city.tags = new_tags;
            };

            // Save new student in state and update new state for synchronize render
            setCity(city);
            setPrevState([...prevState]);

            // Save new student to local storage
            storage.setItem(cityID, JSON.stringify(city));

        } catch (error) {
            console.error('Error:', error);
        }
      };

    return [city, setNewCity];
}

function Weather(props) {
    const {id, expand, cityFilter, countryFilter, tagFilter, 
        handleExpand, handleFilter} = props;

    
    // init student local storage update hook
    const [city, setNewCity] = useLocalStorage(id);
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
    
    let removeByCity, removeByCountry, removeByTag, disp;
    removeByCity = city.city.toUpperCase().indexOf(cityFilter) === -1;
    removeByCountry = city.country.toUpperCase().indexOf(countryFilter) === -1;
    removeByTag = city.tags.toUpperCase().indexOf(tagFilter) === -1;
    console.log(cityFilter, countryFilter, tagFilter);

    disp = (removeByCity || removeByCountry || removeByTag)? {display:"none"}: {};

    return (
        <li className="single_city" style={disp}>
            <table>
                <tbody>
                    <WeatherData currCity={city}/>
                    <tr>
                        <td></td>
                        <td>
                            <Expand id={id} currCity={city}
                                expand={expand} handleExpand={handleExpand} />
                            <Tag tags={city.tags} handleFilter={handleFilter}
                                setNewCity={setNewCity}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>
    );
}

export default Weather;

