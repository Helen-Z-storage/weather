import React from 'react';
import './WeatherData.css';

function WeatherData(props) {
    const {city, name, avg} = props;

    return (
        <tr>
            <td>
                <img alt={`${name} profile`} src={city.pic} />
            </td>
            <td>
                <ul className='data_space'>
                    <li key="0"><div className='stu_name' style={{width:"100%"}}>{name}</div></li>
                    <li key="1" className='stu_data'>{`Email: ${city.email}`}</li>
                    <li key="2" className='stu_data'>{`Company: ${city.company}`}</li>
                    <li key="3" className='stu_data'>{`Skill: ${city.skill}`}</li>
                    <li key="4" className='stu_data'>{`Average: ${Math.round(avg * 1000) / 1000}%`}</li>
                </ul>
            </td>
        </tr>
    );
}

export default WeatherData;
