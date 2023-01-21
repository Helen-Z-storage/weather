import React, {useEffect}from 'react';
import WeatherList from './WeatherList';
import capitalJSON from '../data/capital.json';

const storage = window.localStorage;
const tag_spliter = ",";
const API_key = "87391d7ad955bd47f528c419e1b7519d";
const icon_img = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;
const timestamp2Text = (timestamp) => new Date(timestamp * 1000).toLocaleString();

function App() {
  useEffect(() => {
    // componentWillMount
    for (let i = 0; i < capitalJSON.capitals.length; i++) {
      const currCapital = capitalJSON.capitals[i];
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${currCapital.lat}&lon=${currCapital.lon}&units=metric&cnt=8&appid=${API_key}`
                
      fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === "200") {
          const timezone = data.city.timezone;
            const weatherOBJ = {
                id: i,
                country: currCapital.country,
                city: currCapital.city,
                lat: currCapital.lat,
                lon: currCapital.lon,
                tags: tag_spliter,
                icon: icon_img(data.list[0].weather[0].icon),
                curr_forecast: {
                    timestamp: data.list[0].dt + timezone,
                    time: timestamp2Text(data.list[0].dt + timezone),
                    temp: data.list[0].main.temp,
                    feels_like: data.list[0].main.feels_like,
                    temp_min: data.list[0].main.temp_min,
                    temp_max: data.list[0].main.temp_max,
                    icon: icon_img(data.list[0].weather[0].icon)
                },
                detail_forecast: data.list.map(
                    ({main, weather, dt}) => {
                        return {
                            timestamp: dt + timezone, 
                            time: timestamp2Text(dt + timezone),
                            temp: main.temp,
                            feels_like: main.feels_like,
                            temp_min: main.temp_min,
                            temp_max: main.temp_max,
                            icon: icon_img(weather[0].icon),
                        };})
            }
            storage.setItem(i, JSON.stringify(weatherOBJ));
         }
      }
      )
      .catch(error => console.error('Error:', error));
    }
    // return () => {// componmentWillUnmount}
  }, []);

  return (
      <WeatherList store_length={storage.length}/>
  );
}

export default App;