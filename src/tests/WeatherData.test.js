import React from 'react'
import { create } from "react-test-renderer";

import '@testing-library/jest-dom/extend-expect' // expect function

import WeatherData from '../components/WeatherData';

// required prop data of create component
const currCity =  {
    country: "Abkhazia",
    city: "Sukhumi",
    lat: 43.0033629,
    lon: 41.0192741,
    tags: ",",
    icon: "https://openweathermap.org/img/wn/03d@2x.png",
    curr_forecast: {
        timestamp: "2023-01-18 09:00:00",
        temp: 11.57,
        feels_like: 10.06,
        temp_min: 11.57,
        temp_max: 14.54,
        icon: "https://openweathermap.org/img/wn/03d@2x.png"
    },
    detail_forecast: [
        {
            timestamp: "2023-01-18 09:00:00",
            temp: 11.57,
            feels_like: 10.06,
            temp_min: 11.57,
            temp_max: 14.54,
            icon: "https://openweathermap.org/img/wn/03d@2x.png"
        },
        {
            timestamp: "2023-01-18 12:00:00",
            temp: 13.2,
            feels_like: 11.83,
            temp_min: 13.2,
            temp_max: 14.75,
            icon: "https://openweathermap.org/img/wn/03d@2x.png"
        },
        {
            timestamp: "2023-01-18 15:00:00",
            temp: 12.26,
            feels_like: 10.95,
            temp_min: 12.26,
            temp_max: 12.26,
            icon: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            timestamp: "2023-01-18 18:00:00",
            temp: 11.37,
            feels_like: 9.97,
            temp_min: 11.37,
            temp_max: 11.37,
            icon: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            timestamp: "2023-01-18 21:00:00",
            temp: 11.01,
            feels_like: 9.55,
            temp_min: 11.01,
            temp_max: 11.01,
            icon: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            timestamp: "2023-01-19 00:00:00",
            temp: 10.28,
            feels_like: 8.7,
            temp_min: 10.28,
            temp_max: 10.28,
            icon: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            timestamp: "2023-01-19 03:00:00",
            temp: 9.95,
            feels_like: 8.9,
            temp_min: 9.95,
            temp_max: 9.95,
            icon: "https://openweathermap.org/img/wn/02n@2x.png"
        },
        {
            timestamp: "2023-01-19 06:00:00",
            temp: 11.08,
            feels_like: 9.47,
            temp_min: 11.08,
            temp_max: 11.08,
            icon: "https://openweathermap.org/img/wn/02d@2x.png"
        }
    ]
};

describe('testing WeatherData component', () => {
    // snampshot testing, for non-state component only
    test("Matches the snapshot", () => {
        // create component
        const cityData = create(
            <WeatherData currCity={currCity}/>
        );

        // expecting output
        expect(cityData.toJSON()).toMatchSnapshot();
    });
});