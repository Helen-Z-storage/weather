import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Expand from '../components/Expand';

// required prop data of create component
const user = userEvent.setup();

const id = 3;
const currCity = {
    "country": "Algeria",
    "city": "Algiers",
    "lat": 36.7753606,
    "lon": 3.0601882,
    "tags": ",",
    "icon": "https://openweathermap.org/img/wn/10d@2x.png",
    "curr_forecast": {
        "timestamp": "2023-01-18 09:00:00",
        "temp": 12.01,
        "feels_like": 11.12,
        "temp_min": 9.79,
        "temp_max": 12.01,
        "icon": "https://openweathermap.org/img/wn/10d@2x.png"
    },
    "detail_forecast": [
        {
            "timestamp": "2023-01-18 09:00:00",
            "temp": 12.01,
            "feels_like": 11.12,
            "temp_min": 9.79,
            "temp_max": 12.01,
            "icon": "https://openweathermap.org/img/wn/10d@2x.png"
        },
        {
            "timestamp": "2023-01-18 12:00:00",
            "temp": 11.35,
            "feels_like": 10.42,
            "temp_min": 10.47,
            "temp_max": 11.35,
            "icon": "https://openweathermap.org/img/wn/10d@2x.png"
        },
        {
            "timestamp": "2023-01-18 15:00:00",
            "temp": 11.8,
            "feels_like": 10.52,
            "temp_min": 11.8,
            "temp_max": 11.8,
            "icon": "https://openweathermap.org/img/wn/10d@2x.png"
        },
        {
            "timestamp": "2023-01-18 18:00:00",
            "temp": 11.07,
            "feels_like": 9.8,
            "temp_min": 11.07,
            "temp_max": 11.07,
            "icon": "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            "timestamp": "2023-01-18 21:00:00",
            "temp": 11.57,
            "feels_like": 10.24,
            "temp_min": 11.57,
            "temp_max": 11.57,
            "icon": "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            "timestamp": "2023-01-19 00:00:00",
            "temp": 11.42,
            "feels_like": 9.95,
            "temp_min": 11.42,
            "temp_max": 11.42,
            "icon": "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            "timestamp": "2023-01-19 03:00:00",
            "temp": 10.93,
            "feels_like": 9.54,
            "temp_min": 10.93,
            "temp_max": 10.93,
            "icon": "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            "timestamp": "2023-01-19 06:00:00",
            "temp": 10.43,
            "feels_like": 9.12,
            "temp_min": 10.43,
            "temp_max": 10.43,
            "icon": "https://openweathermap.org/img/wn/10n@2x.png"
        }
    ]
};
const expandT = true;
const expandF = false;
const handleExpand = jest.fn();

describe('testing Expand component', () => {

    test("Matches the snapshot: shows expanded Expand component", () => {
        // create component
        const expandData = create(
            <Expand id={id} currCity={currCity}
                    expand={expandT} handleExpand={handleExpand} />
        );

        // expecting output
        expect(expandData.toJSON()).toMatchSnapshot();
    });

    test("Matches the snapshot: shows non-expanded Expand component", () => {
        // create component
        const expandData = create(
            <Expand id={id} currCity={currCity}
                    expand={expandF} handleExpand={handleExpand} />
        );

        // expecting output
        expect(expandData.toJSON()).toMatchSnapshot();
    });

    test("Matches the snapshot: shows empty city", () => {
        // create component
        const expandData = create(
            <Expand id={id} currCity={{}}
                    expand={expandF} handleExpand={handleExpand} />
        );

        // expecting output
        expect(expandData.toJSON()).toMatchSnapshot();
    });

    test("shows clicked button working", async () => {
        // render component
        render(
            <Expand id={id} currCity={currCity}
                    expand={expandF} handleExpand={handleExpand} />
        );

        // expecting output
        const button = screen.getByText('+');
        await user.click(button); 
        expect(handleExpand).toBeCalledTimes(1);
        expect(handleExpand.mock.calls[0][0]).toEqual(id);
    });
});