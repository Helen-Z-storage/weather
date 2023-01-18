import React from 'react';
import '../css/Expand.css';


function Expand(props) {
  const {id, currCity, expand, handleExpand} = props;


    
    let detailWeatherList = <li></li>;
    let currWeatherList = <li></li>;

    const currWeather = currCity.curr_forecast;
    const detailWeathers = currCity.detail_forecast;
    
    // expanded 
    detailWeatherList = detailWeathers.map(
      (weatherObj, i) => 
        <li key={"weather_" + i}>
          <table>
            <tbody>
              <tr>
                <td>{`${weatherObj.timestamp}:`}</td>
                <td><img alt={`${currCity.city} ${weatherObj.timestamp} weather icon`} src={weatherObj.icon} /></td>
                <td>{`${weatherObj.temp} C`}</td>
                <td>{`${weatherObj.feels_like} C`}</td>
                <td>{`${weatherObj.temp_min} C`}</td>
                <td>{`${weatherObj.temp_max} C`}</td>
              </tr>
            </tbody>
          </table>
          </li>);

      currWeatherList = 
      <li key={"curr_weather"}>
            <table>
              <tbody>
                <tr>
                  <td>{`${currWeather.timestamp}:`}</td>
                  <td><img alt={`${currCity.city} ${currWeather.timestamp} weather icon`} src={currWeather.icon} /></td>
                  <td>{`${currWeather.temp} C`}</td>
                  <td>{`${currWeather.feels_like} C`}</td>
                  <td>{`${currWeather.temp_min} C`}</td>
                  <td>{`${currWeather.temp_max} C`}</td>
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