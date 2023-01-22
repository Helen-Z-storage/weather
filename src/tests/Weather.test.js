import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Weather from '../components/Weather';

// required prop data of create component
const tag_spliter = ",";

const id = 0;
const expandT = true;
const expandF = false;
const cityFilter = "";
const filtCityFilter = "KHU";
const unfiltCityFilter = "KHS";
const countryFilter = "";
const filtCountryFilter = "KHA";
const unfiltCountryFilter = "KHB";
const tagFilter = "";
const filtTagFilter = "AD";
const unfiltTagFilter = "AW";
const duplicate_tag = "MENT{enter}";
const non_duplicate_tag = "AD{enter}";
const tag_split_tag = `R%${tag_spliter}`;
const empty_tag = "{enter}";
const handleExpand = jest.fn();
const handleFilter = jest.fn();
const storage = window.localStorage;

// store this city as 0 in mocked localstorage
const city_data = {
    country: "Abkhazia",
    city: "Sukhumi",
    lat: 43.0033629,
    lon: 41.0192741,
    tags: ",adver,tise,Ment,339%?,",
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

storage.setItem(id, JSON.stringify(city_data));

describe('testing Weather component with data', () => {
    test("Matches the snapshot: shows expanded Expand component", () => {
        // create component
        const city = create(
            <Weather id={id} expand={expandT}
                     cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(city.toJSON()).toMatchSnapshot();
    });

    test("Matches the snapshot: shows non-expanded Expand component", () => {
        // create component
        const city = create(
            <Weather id={id} expand={expandF}
                     cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(city.toJSON()).toMatchSnapshot();
    });

    // testing filters
    test("shows filt city displayed city", () => {
        // render component
        render(
            <Weather id={id} expand={expandF}
                     cityFilter={filtCityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );
        // expecting output
        expect(screen.queryByText("Sukhumi")).toBeVisible();
    });

    test("shows unfilt city displayed city", () => {
        // render component
        render(
            <Weather id={id} expand={expandF}
                     cityFilter={unfiltCityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(screen.queryByText("Sukhumi")).not.toBeVisible();
    });
    
    // testing filters
    test("shows filt country displayed city", () => {
        // render component
        render(
            <Weather id={id} expand={expandF}
                     cityFilter={cityFilter} countryFilter={filtCountryFilter} tagFilter={tagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );
        // expecting output
        expect(screen.queryByText("Sukhumi")).toBeVisible();
    });

    test("shows unfilt country displayed city", () => {
        // render component
        render(
            <Weather id={id} expand={expandF}
                     cityFilter={cityFilter} countryFilter={unfiltCountryFilter} tagFilter={tagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(screen.queryByText("Sukhumi")).not.toBeVisible();
    });

    test("shows filt tag displayed city", () => {
        // render component
        render(
            <Weather id={id} expand={expandF}
                     cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={filtTagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(screen.queryByText("Sukhumi")).toBeVisible();
    });

    test("shows unfilt tag displayed city", () => {
        // render component
        render(
            <Weather id={id} expand={expandF}
                     cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={unfiltTagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(screen.queryByText("Sukhumi")).not.toBeVisible();
    });
    
    // test custom hook
    test("tested custom hook useLocalStorage(): adding tag", async () => {
        const user = userEvent.setup();
        // render component
        render(
            <Weather id={id} expand={expandF}
                     cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );
        // expecting output
        // adding duplicate tag
        const textfield = screen.getByPlaceholderText("Add a tag");
        await user.type(textfield, duplicate_tag);
        let city = JSON.parse(storage.getItem(id));
        let tags = city_data.tags;
        expect(city.tags).toEqual(tags);
        screen.debug();
        expect(screen.queryByText(`No duplicate tag should been add`)).not.toEqual(null);
        expect(alert.mock.calls[0][0]).toEqual();

        // adding invalid empty tag
        await user.type(textfield, empty_tag);
        city = JSON.parse(storage.getItem(id));
        expect(city.tags).toEqual(tags);
        expect(alert).toBeCalledTimes(2);
        expect(alert.mock.calls[1][0]).toEqual(`No empty tag should been add`);

        // adding invalid tag_split tag
        await user.type(textfield, tag_split_tag);
        city = JSON.parse(storage.getItem(id));
        expect(city.tags).toEqual(tags);
        expect(alert).toBeCalledTimes(3);
        expect(alert.mock.calls[2][0]).toEqual(`No "${tag_spliter}" should include in Tag`);

        // adding non-duplicate tag
        await user.type(textfield, non_duplicate_tag + "{enter}");
        city = JSON.parse(storage.getItem(id));
        expect(city.tags).toEqual(tags + non_duplicate_tag + tag_spliter);
    });
});