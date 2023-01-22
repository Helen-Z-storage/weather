import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import WeatherList from '../components/WeatherList';

// required prop data of create component
const user = userEvent.setup();

const tag_spliter = " ";
const pic_folder = "https://storage.googleapis.com/hatchways-app.appspot.com" + 
                   "/assessments/data/frontend/images/";
let city_ids = [];
const city_filt_one = "UL";
const city_filt_two = "U";
const city_filter = "{Enter}";
const country_filt_one = "HAN";
const country_filt_two = "AN";
const country_filter = "{enter}";
const tag_filt_one = "M";
const tag_filt_two = "%";
const tag_filter = "{Enter}";
const tag_but_one = "Ment";
const tag_but_two = "%";
const expand_T = "-";
const expand_F = "+";
const expand_context = "Forcast";

const storage = window.localStorage;

// store this city as 0 in mocked localstorage
const city_datas = [{
    country: "Abkhazia",
    city: "Sukhumi",
    lat: 43.0033629,
    lon: 41.0192741,
    tags: ",a,ver,tise,339?%,",
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
},
{
    country: "Afghanistan",
    city: "Kabul",
    lat: 34.5260109,
    lon: 69.1776838,
    tags: ",%,33,",
    icon: "https://openweathermap.org/img/wn/04d@2x.png",
    curr_forecast: {
        timestamp: "2023-01-18 09:00:00",
        temp: -1.35,
        feels_like: -1.35,
        temp_min: -1.35,
        temp_max: -0.24,
        icon: "https://openweathermap.org/img/wn/04d@2x.png"
    },
    detail_forecast: [
        {
            timestamp: "2023-01-18 09:00:00",
            temp: -1.35,
            feels_like: -1.35,
            temp_min: -1.35,
            temp_max: -0.24,
            icon: "https://openweathermap.org/img/wn/04d@2x.png"
        },
        {
            timestamp: "2023-01-18 12:00:00",
            temp: -1.16,
            feels_like: -1.16,
            temp_min: -1.16,
            temp_max: -0.79,
            icon: "https://openweathermap.org/img/wn/13d@2x.png"
        },
        {
            timestamp: "2023-01-18 15:00:00",
            temp: -1.71,
            feels_like: -4.17,
            temp_min: -1.71,
            temp_max: -1.71,
            icon: "https://openweathermap.org/img/wn/13n@2x.png"
        },
        {
            timestamp: "2023-01-18 18:00:00",
            temp: -2.49,
            feels_like: -5.18,
            temp_min: -2.49,
            temp_max: -2.49,
            icon: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            timestamp: "2023-01-18 21:00:00",
            temp: -3.49,
            feels_like: -6.29,
            temp_min: -3.49,
            temp_max: -3.49,
            icon: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            timestamp: "2023-01-19 00:00:00",
            temp: -4.41,
            feels_like: -7.79,
            temp_min: -4.41,
            temp_max: -4.41,
            icon: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            timestamp: "2023-01-19 03:00:00",
            temp: -4.27,
            feels_like: -7.58,
            temp_min: -4.27,
            temp_max: -4.27,
            icon: "https://openweathermap.org/img/wn/04d@2x.png"
        },
        {
            timestamp: "2023-01-19 06:00:00",
            temp: -0.45,
            feels_like: -2.74,
            temp_min: -0.45,
            temp_max: -0.45,
            icon: "https://openweathermap.org/img/wn/04d@2x.png"
        }
    ]
},
{
    country: "Albania",
    city: "Tirana",
    lat: 41.3305141,
    lon: 19.825562857582966,
    tags: ",Ment,ad,",
    icon: "https://openweathermap.org/img/wn/10d@2x.png",
    curr_forecast: {
        timestamp: "2023-01-18 09:00:00",
        temp: 14.27,
        feels_like: 13.58,
        temp_min: 13.88,
        temp_max: 14.27,
        icon: "https://openweathermap.org/img/wn/10d@2x.png"
    },
    detail_forecast: [
        {
            timestamp: "2023-01-18 09:00:00",
            temp: 14.27,
            feels_like: 13.58,
            temp_min: 13.88,
            temp_max: 14.27,
            icon: "https://openweathermap.org/img/wn/10d@2x.png"
        },
        {
            timestamp: "2023-01-18 12:00:00",
            temp: 14.01,
            feels_like: 13.4,
            temp_min: 13.78,
            temp_max: 14.01,
            icon: "https://openweathermap.org/img/wn/10d@2x.png"
        },
        {
            timestamp: "2023-01-18 15:00:00",
            temp: 13.36,
            feels_like: 12.74,
            temp_min: 13.36,
            temp_max: 13.36,
            icon: "https://openweathermap.org/img/wn/10d@2x.png"
        },
        {
            timestamp: "2023-01-18 18:00:00",
            temp: 11.84,
            feels_like: 11.12,
            temp_min: 11.84,
            temp_max: 11.84,
            icon: "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            timestamp: "2023-01-18 21:00:00",
            temp: 12.82,
            feels_like: 12.17,
            temp_min: 12.82,
            temp_max: 12.82,
            icon: "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            timestamp: "2023-01-19 00:00:00",
            temp: 12.55,
            feels_like: 11.9,
            temp_min: 12.55,
            temp_max: 12.55,
            icon: "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            timestamp: "2023-01-19 03:00:00",
            temp: 12.68,
            feels_like: 12.01,
            temp_min: 12.68,
            temp_max: 12.68,
            icon: "https://openweathermap.org/img/wn/10n@2x.png"
        },
        {
            timestamp: "2023-01-19 06:00:00",
            temp: 12.58,
            feels_like: 11.85,
            temp_min: 12.58,
            temp_max: 12.58,
            icon: "https://openweathermap.org/img/wn/10n@2x.png"
        }
    ]
}];

city_datas.map((city, i) => {
    storage.setItem(i, JSON.stringify(city));
    city_ids.push(i);
})
const store_length = storage.length;
const city_names = city_datas.map(
    city => `${city.city}`);
const test_nums = city_datas.map(
    _ => 5);

describe('testing WeatherList component', () => {
    test("Matches the snapshot", () => {
        // create component
        const city = create(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        expect(city.toJSON()).toMatchSnapshot();
    });

    // testing filters
    test("test city filters", async () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by city");
        // filt one citys
        await user.type(textfield, city_filt_one);
        
        expect(screen.queryByText(city_names[0])).not.toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).not.toBeVisible();

        // clear textfield
        await user.clear(textfield);
        
        // filt two citys
        await user.type(textfield, city_filt_two);

        expect(screen.queryByText(city_names[0])).toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).not.toBeVisible();

        // clear textfield
        await user.clear(textfield);

        // filt all citys
        await user.type(textfield, city_filter);

        expect(screen.queryByText(city_names[0])).toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).toBeVisible();
    });

        // testing filters
    test("test country filters", async () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by country");
        // filt one citys
        await user.type(textfield, country_filt_one);
        
        expect(screen.queryByText(city_names[0])).not.toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).not.toBeVisible();

        // clear textfield
        await user.clear(textfield);
        
        // filt two citys
        await user.type(textfield, country_filt_two);
        
        expect(screen.queryByText(city_names[0])).not.toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).toBeVisible();
        
        // clear textfield
        await user.clear(textfield);

        // filt all citys
        await user.type(textfield, country_filter);
        
        expect(screen.queryByText(city_names[0])).toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).toBeVisible();
    });

    test("test tag filters", async () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by tag");
        // filt one citys
        await user.type(textfield, tag_filt_one);
        expect(screen.queryByText(city_names[0])).not.toBeVisible();
        expect(screen.queryByText(city_names[1])).not.toBeVisible();
        expect(screen.queryByText(city_names[2])).toBeVisible();

        // clear textfield
        await user.clear(textfield);
        
        // filt two citys
        await user.type(textfield, tag_filt_two);
        expect(screen.queryByText(city_names[0])).toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).not.toBeVisible();
        
        // clear textfield
        await user.clear(textfield);

        // filt all citys
        await user.type(textfield, tag_filter);
        expect(screen.queryByText(city_names[0])).toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).toBeVisible();
    });

    test("test tag button", async () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        // click tag_but_one to filt
        let button = screen.getByText(tag_but_one);
        await user.click(button);
        expect(screen.queryByText(city_names[0])).not.toBeVisible();
        expect(screen.queryByText(city_names[1])).not.toBeVisible();
        expect(screen.queryByText(city_names[2])).toBeVisible();
        
        // filt two citys
        button = screen.getByText(tag_but_two);
        await user.click(button);
        expect(screen.queryByText(city_names[0])).toBeVisible();
        expect(screen.queryByText(city_names[1])).toBeVisible();
        expect(screen.queryByText(city_names[2])).not.toBeVisible(); 
    });

    // testing expand
    test("test expand button", async () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        // exand one city
        let buttons = screen.getAllByText(expand_F);
        await user.click(buttons[1]);
        let expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[1]);
        expect(buttons[1].textContent).toEqual(expand_T);
        
        // exand two citys
        buttons = screen.getAllByText(expand_F);
        await user.click(buttons[1]);
        expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[1] + test_nums[2]);

        // un-exand one city
        buttons = screen.getAllByText(expand_T);
        await user.click(buttons[0]);
        expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[2]);
        expect(buttons[0].textContent).toEqual(expand_F);
    });
});