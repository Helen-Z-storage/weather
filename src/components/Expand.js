import React from 'react';
import '../css/Expand.css';


function Expand(props) {
  const {id, currCity, expand, handleExpand} = props;


    
    let detailWeatherList = <li></li>;
    let currWeatherList = <li></li>;

    const currWeather = currCity.curr_forecast;
    const detailWeathers = currCity.detail_forecast;
    
    // expanded 
    detailWeatherList = 
    <li key={"forcast_weather"}>
      <table>
        <thead>
              <tr>
                  <td>{"Date & time"}</td>
                  <td>{"Forcast Weather"}</td>
                  <td>{"Forcast Temp"}</td>
                  <td>{"Forcast Body Temp"}</td>
                  <td>{"Forcast Max Temp"}</td>
                  <td>{"Forcast Min Temp"}</td>
                </tr>
            </thead>
            <tbody>
        {detailWeathers.map(
      (weatherObj, i) => 
              <tr key={i}>
                <td>{`${weatherObj.time}`}</td>
                <td><img className='expand_img' alt={`${currCity.city} ${weatherObj.timestamp} weather icon`} src={weatherObj.icon} /></td>
                <td>{`${weatherObj.temp} °C`}</td>
                <td>{`${weatherObj.feels_like} °C`}</td>
                <td>{`${weatherObj.temp_min} °C`}</td>
                <td>{`${weatherObj.temp_max} °C`}</td>
              </tr>)}
              
            </tbody>
          </table>
          </li>

      currWeatherList = 
      <li key={"curr_weather"}>
            <table>
              <thead>
                <tr>
                    <td>{"Date & time"}</td>
                    <td>{"Current Weather"}</td>
                    <td>{"Current Temp"}</td>
                    <td>{"Current Body Temp"}</td>
                    <td>{"Current Max Temp"}</td>
                    <td>{"Current Min Temp"}</td>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`${currWeather.time}`}</td>
                  <td><img className='expand_img' alt={`${currCity.city} ${currWeather.timestamp} weather icon`} src={currWeather.icon} /></td>
                  <td>{`${currWeather.temp} °C`}</td>
                  <td>{`${currWeather.feels_like} °C`}</td>
                  <td>{`${currWeather.temp_min} °C`}</td>
                  <td>{`${currWeather.temp_max} °C`}</td>
                </tr>
              </tbody>
            </table>
            </li>;
    return (
        <ul className='detailWeather'>
            <li><button className="expand" onClick={() => handleExpand(id)}>
                {expand? "-": "+"}</button></li>
            {expand? detailWeatherList: currWeatherList}
        </ul>
        );
}

export default Expand;