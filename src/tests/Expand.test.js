import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Expand from '../components/Expand';
import weather from "../data/weather.json";

// required prop data of create component
const user = userEvent.setup();

const id = 3;
const currCity = weather[id];
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