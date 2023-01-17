import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import WeatherList from '../components/WeatherList';

// required prop data of create component
const tag_spliter = " ";
const pic_folder = "https://storage.googleapis.com/hatchways-app.appspot.com" + 
                   "/assessments/data/frontend/images/";
let city_ids = [];
const name_filt_one = "NE";
const name_filt_two = "N";
const name_filter = "{enter}";
const tag_filt_one = "M";
const tag_filt_two = "%";
const tag_filter = "{enter}";
const tag_but_one = "%";
const tag_but_two = "a";
const expand_T = "-";
const expand_F = "+";
const expand_context = "Test";


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
const city_datas = [
    {
        city: "Fushë-Muhurr",
        company: "Yadel",
        email: "iorton0@imdb.com",
        firstName: "Ingaberg",
        grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
        id: "1",
        lastName: "Orto",
        pic: pic_folder + "voluptasdictablanditiis.jpg",
        skill: "Oracle",
        tags: " a ver tise 339%? "
    },
    {
        city: "Sanghan",
        company: "Avamm",
        email: "cboards1@weibo.com",
        firstName: "Clarke",
        grades: ["75","89","95","93","99","82","89","76"],
        id: "2",
        lastName: "Boards",
        pic: pic_folder + "voluptasautreprehenderit.jpg",
        skill: "Sports", 
        tags: " % 33 "
    },
    {
        city: "Kugesi",
        company: "Skalith",
        email: "lromanet2@wired.com",
        firstName: "Lucy",
        grades: ["88","90","79","82","81","99","94","73"],
        id: "3",
        lastName: "Romanet",
        pic: pic_folder + "aspernaturnonsapiente.jpg",
        skill: "Employee Handbooks",
        tags: " Ment ad "
    }
]
city_datas.map((city, i) => {
    storage.setItem(i, JSON.stringify(city));
    city_ids.push(i);
})
const store_length = storage.length;
const city_names = city_datas.map(
    city => `${city.firstName} ${city.lastName}`.toUpperCase());
const non_name_length = "profile".length + 1;
const test_nums = city_datas.map(
    city => city.grades.length);

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
    test("test name filters", () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by name");
        // filt one citys
        userEvent.type(textfield, name_filt_one);
        let filtered_citys = screen.queryAllByRole("img");
        let filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(city_names[2]);

        // clear textfield
        userEvent.clear(textfield);
        
        // filt two citys
        userEvent.type(textfield, name_filt_two);
        filtered_citys = screen.queryAllByRole("img");
        filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(city_names[0]);
        expect(filtered_names[1]).toEqual(city_names[2]);
        
        // clear textfield
        userEvent.clear(textfield);

        // filt all citys
        userEvent.type(textfield, name_filter);
        filtered_citys = screen.queryAllByRole("img");
        filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(city_names[0]);
        expect(filtered_names[1]).toEqual(city_names[1]);
        expect(filtered_names[2]).toEqual(city_names[2]);
    });

    test("test tag filters", () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by tag");
        // filt one citys
        userEvent.type(textfield, tag_filt_one);
        let filtered_citys = screen.queryAllByRole("img");
        let filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(city_names[2]);

        // clear textfield
        userEvent.clear(textfield);
        
        // filt two citys
        userEvent.type(textfield, tag_filt_two);
        filtered_citys = screen.queryAllByRole("img");
        filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(city_names[0]);
        expect(filtered_names[1]).toEqual(city_names[1]);
        
        // clear textfield
        userEvent.clear(textfield);

        // filt all citys
        userEvent.type(textfield, tag_filter);
        filtered_citys = screen.queryAllByRole("img");
        filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(city_names[0]);
        expect(filtered_names[1]).toEqual(city_names[1]);
        expect(filtered_names[2]).toEqual(city_names[2]);
    });

    test("test tag button", () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        // click tag_but_one to filt
        let button = screen.getByText(tag_but_one);
        userEvent.click(button);
        let filtered_citys = screen.queryAllByRole("img");
        let filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
            expect(filtered_names[0]).toEqual(city_names[0]);
            expect(filtered_names[1]).toEqual(city_names[1]);
        
        // filt two citys
        button = screen.getByText(tag_but_two);
        userEvent.click(button);
        filtered_citys = screen.queryAllByRole("img");
        filtered_names = filtered_citys.map(
            city => city.alt.substring(0, city.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(city_names[0]);
        expect(filtered_names[1]).toEqual(city_names[2]);
        
    });

    // testing expand
    test("test expand button", () => {
        // render component
        render(
            <WeatherList store_length={store_length}/>
        );

        // expecting output
        // exand one city
        let buttons = screen.getAllByText(expand_F);
        userEvent.click(buttons[1]);
        let expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[1]);
        
        // exand two citys
        buttons = screen.getAllByText(expand_F);
        userEvent.click(buttons[1]);
        expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[1] + test_nums[2]);

        // un-exand one city
        buttons = screen.getAllByText(expand_T);
        userEvent.click(buttons[0]);
        expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[2]);
    });
});