import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Filter from '../components/Filter';

// required prop data of create component

const empty_filter = "{Enter}";
const empty_event_num = 1;
const filt_city = "INGK";
const filt_country = "LISWG";
const filt_tag = "INS";
const handleFilter = jest.fn();
const handleFilter1 = jest.fn();
const handleFilter2 = jest.fn();
const handleFilter3 = jest.fn();

describe('testing Filter component', () => {

    test("Matches the snapshot", () => {
        // create component
        const expandData = create(
            <Filter handleFilter={(e) => handleFilter(e)}/>
        );

        // expecting output
        expect(expandData.toJSON()).toMatchSnapshot();
    });

    test("shows city_filter textfield working", async () => {
        const user = userEvent.setup();
        // render component
        render(
            <table>
                <tbody>
                    <tr>
                        <Filter handleFilter={(e) => handleFilter1(e)}/>
                    </tr>
                </tbody>
            </table>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by city");

        // filter by press enter only
        await user.type(textfield, empty_filter);
        expect(handleFilter1).toBeCalledTimes(empty_event_num);
        expect(handleFilter1.mock.calls.length).toEqual(empty_event_num);
        expect(handleFilter1.mock.calls[0][0].target.value).toEqual("");
        expect(handleFilter1.mock.calls[0][0].code).toEqual("Enter");

        // filter by press word keys
        await user.type(textfield, filt_city);
        const sum = filt_city.length + empty_event_num
        expect(handleFilter1).toBeCalledTimes(sum);
        expect(handleFilter1.mock.calls.length).toEqual(sum);
        expect(handleFilter1.mock.calls[sum - 1][0].target.value).toEqual(filt_city);

        let keyCodes = [];
        for (var i = 1; i < sum; i++) {
            keyCodes.push(handleFilter1.mock.calls[i][0].nativeEvent.keyCode);
        }
        // every code in keyCodes shows word or number input
        expect(keyCodes.every(code => 49 < code < 90 || code === 186)).toEqual(true);
    });
    
    test("shows country_filter textfield working", async () => {
        const user = userEvent.setup();
        // render component
        render(
            <table>
                <tbody>
                    <tr>
                        <Filter handleFilter={(e) => handleFilter2(e)}/>
                    </tr>
                </tbody>
            </table>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by country");

        // filter by press enter only
        await user.type(textfield, empty_filter);
        expect(handleFilter2).toBeCalledTimes(empty_event_num);
        expect(handleFilter2.mock.calls.length).toEqual(empty_event_num);
        expect(handleFilter2.mock.calls[0][0].target.value).toEqual("");
        expect(handleFilter1.mock.calls[0][0].code).toEqual("Enter");

        // filter by press word keys
        await user.type(textfield, filt_country);
        const sum = filt_country.length + empty_event_num
        expect(handleFilter2).toBeCalledTimes(sum);
        expect(handleFilter2.mock.calls.length).toEqual(sum);
        expect(handleFilter2.mock.calls[sum - 1][0].target.value).toEqual(filt_country);

        let keyCodes = [];
        for (var i = 1; i < sum; i++) {
            keyCodes.push(handleFilter2.mock.calls[i][0].nativeEvent.keyCode);
        }
        // every code in keyCodes shows word or number input
        expect(keyCodes.every(code => 49 < code < 90 || code === 186)).toEqual(true);
    });

    test("shows tag_filter textfield working", async () => {
        const user = userEvent.setup();
        // render component
        render(
            <table>
                <tbody>
                    <tr>
                        <Filter handleFilter={(e) => handleFilter3(e)}/>
                    </tr>
                </tbody>
            </table>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by tag");

        // filter by press enter only
        await user.type(textfield, empty_filter);
        expect(handleFilter3).toBeCalledTimes(empty_event_num);
        expect(handleFilter3.mock.calls.length).toEqual(empty_event_num);
        expect(handleFilter3.mock.calls[0][0].target.value).toEqual("");
        expect(handleFilter1.mock.calls[0][0].code).toEqual("Enter");


        // filter by press word keys
        await user.type(textfield, filt_tag);
        const sum = filt_tag.length + empty_event_num
        expect(handleFilter3).toBeCalledTimes(sum);
        expect(handleFilter3.mock.calls.length).toEqual(sum);
        expect(handleFilter3.mock.calls[sum - 1][0].target.value).toEqual(filt_tag);

        let keyCodes = [];
        for (var i = 1; i < sum; i++) {
            keyCodes.push(handleFilter3.mock.calls[i][0].nativeEvent.keyCode);
        }
        // every code in keyCodes shows word or number input
        expect(keyCodes.every(code => 49 < code < 90 || code === 186)).toEqual(true);
    });
});