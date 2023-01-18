import React from 'react';
import WeatherList from './WeatherList';



function App() {
  return (
      <WeatherList />
  );
}

/*
import React, {useState, useEffect} from 'react';
import capitalJSON from "../data/capital.json";

const tag_spliter = " ";
const API_key = "87391d7ad955bd47f528c419e1b7519d";
const icon_img = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

function App() {
  let fetchedWeatherList = [];

  
  useEffect(() => {
    // componentWillMount
    

  for (let i = 0; i < capitalJSON.capitals.length; i++) {
      const currCapital = capitalJSON.capitals[i];
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${currCapital.lat}&lon=${currCapital.lon}&units=metric&cnt=8&appid=${API_key}`
              
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod == "200") {
          const weatherOBJ = {
              id: i,
              country: currCapital.country.toUpperCase(),
              city: currCapital.city.toUpperCase(),
              lat: currCapital.lat,
              lon: currCapital.lon,
              tags: tag_spliter,
              icon: icon_img(data.list[0].weather.icon),
              curr_forecast: {
                  timestamp: data.list[0].dt_txt,
                  temp: data.list[0].main.temp,
                  feels_like: data.list[0].main.feels_like,
                  temp_min: data.list[0].main.temp_min,
                  temp_max: data.list[0].main.temp_max,
                  icon: icon_img(data.list[0].weather.icon)
              },
              detail_forecast: data.list.map(
                  ({main, weather, dt_txt}) => {
                      return {
                          timestamp: dt_txt, 
                          temp: main.temp,
                          feels_like: main.feels_like,
                          temp_min: main.temp_min,
                          temp_max: main.temp_max,
                          icon: icon_img(weather.icon),
                      };})
          }
          fetchedWeatherList.push(weatherOBJ);
          console.log(weatherList);
      }
      })
      .catch(error => console.error('Error:', error));
  }
    // return () => {// componmentWillUnmount}
}, []);


  const[weatherList, setWeatherList] = useState(fetchedWeatherList);
  console.log(weatherList);
    return (
        <WeatherList weatherList={weatherList} setWeatherList={setWeatherList}/>
    );
}
*/
export default App;