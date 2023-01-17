import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Weather from '../components/Weather';

// required prop data of create component
const tag_spliter = " ";

const city_id = 0;
const expandT = true;
const expandF = false;
const name_filter = "";
const filt_name_filter = "ING";
const unfilt_name_filter = "INS";
const tag_filter = "";
const filt_tag_filter = "ad";
const unfilt_tag_filter = "aw";
const duplicate_tag = "Ment{enter}";
const non_duplicate_tag = "AD";
const tag_split_tag = `R%${tag_spliter}`;
const empty_tag = "{enter}";
const handleExpand = jest.fn();
const handleFilter = jest.fn();
const storage = window.localStorage;
const jsdomAlert = window.alert;

// store this city as 0 in mocked localstorage
const city_data = {
    city: "Fushë-Muhurr",
    company: "Yadel",
    email: "iorton0@imdb.com",
    firstName: "Ingaberg",
    grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
    id: "1",
    lastName: "Orton",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com" + 
         "/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
    tags: " ad ver tise Ment 339%? "
}
storage.setItem(city_id, JSON.stringify(city_data));

describe('testing Weather component with data', () => {
    // mock window.alert
    beforeEach(() => {
        window.alert = jest.fn();
    });

    afterEach(() => {
        window.alert = jsdomAlert;
    })

    test("Matches the snapshot: shows expanded Expand component", () => {
        // create component
        const city = create(
            <Weather city_id={city_id} expand={expandT}
                     name_filter={name_filter} tag_filter={tag_filter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(city.toJSON()).toMatchSnapshot();
    });

    test("Matches the snapshot: shows non-expanded Expand component", () => {
        // create component
        const city = create(
            <Weather city_id={city_id} expand={expandF}
                     name_filter={name_filter} tag_filter={tag_filter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(city.toJSON()).toMatchSnapshot();
    });

    // testing filters
    test("shows filt name displayed city", () => {
        // render component
        render(
            <Weather city_id={city_id} expand={expandF}
                     name_filter={filt_name_filter} tag_filter={tag_filter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );
        // expecting output
        const city = screen.queryByRole("table");
        expect(city).not.toEqual(null);
    });

    test("shows unfilt name displayed city", () => {
        // render component
        render(
            <Weather city_id={city_id} expand={expandF}
                     name_filter={unfilt_name_filter} tag_filter={tag_filter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        const city = screen.queryByRole("table");
        expect(city).toEqual(null);
    });

    test("shows filt tag displayed city", () => {
        // render component
        render(
            <Weather city_id={city_id} expand={expandF}
                     name_filter={name_filter} tag_filter={filt_tag_filter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        const city = screen.queryByRole("table");
        expect(city).not.toEqual(null);
    });

    test("shows unfilt tag displayed city", () => {
        // render component
        render(
            <Weather city_id={city_id} expand={expandF}
                     name_filter={name_filter} tag_filter={unfilt_tag_filter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        const city = screen.queryByRole("table");
        expect(city).toEqual(null);
    });
    
    // test custom hook
    test("tested custom hook useLocalStorage(): adding tag", () => {
        // render component
        render(
            <Weather city_id={city_id} expand={expandF}
                     name_filter={name_filter} tag_filter={tag_filter}
                     handleExpand={exp_id => handleExpand(exp_id)}
                     handleFilter={(e) => handleFilter(e)}/>
        );
        // expecting output
        // adding duplicate tag
        const textfield = screen.getByPlaceholderText("Add a tag");
        userEvent.type(textfield, duplicate_tag);
        let city = JSON.parse(storage.getItem(city_id));
        let tags = city_data.tags;
        expect(city.tags).toEqual(tags);
        expect(alert).toBeCalledTimes(1);
        expect(alert.mock.calls[0][0]).toEqual(`No duplicate tag should been add`);

        // adding invalid empty tag
        userEvent.type(textfield, empty_tag);
        city = JSON.parse(storage.getItem(city_id));
        expect(city.tags).toEqual(tags);
        expect(alert).toBeCalledTimes(2);
        expect(alert.mock.calls[1][0]).toEqual(`No empty tag should been add`);

        // adding invalid tag_split tag
        userEvent.type(textfield, tag_split_tag);
        city = JSON.parse(storage.getItem(city_id));
        expect(city.tags).toEqual(tags);
        expect(alert).toBeCalledTimes(3);
        expect(alert.mock.calls[2][0]).toEqual(`No "${tag_spliter}" should include in Tag`);

        // adding non-duplicate tag
        userEvent.type(textfield, non_duplicate_tag + "{enter}");
        city = JSON.parse(storage.getItem(city_id));
        expect(city.tags).toEqual(tags + non_duplicate_tag + tag_spliter);
    });
});