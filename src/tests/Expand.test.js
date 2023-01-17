import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Expand from '../components/Expand';

// required prop data of create component
const stu_id = 3;
const grades = [78, 100, 92, 86, 89, 88, 91, 87];
const expandT = true;
const expandF = false;
const handleExpand = jest.fn();

describe('testing Expand component', () => {

    test("Matches the snapshot: shows expanded Expand component", () => {
        // create component
        const expandData = create(
            <Expand stu_id={stu_id} grades={grades}
                    expand={expandT} handleExpand={handleExpand} />
        );

        // expecting output
        expect(expandData.toJSON()).toMatchSnapshot();
    });

    test("Matches the snapshot: shows non-expanded Expand component", () => {
        // create component
        const expandData = create(
            <Expand stu_id={stu_id} grades={grades}
                    expand={expandF} handleExpand={handleExpand} />
        );

        // expecting output
        expect(expandData.toJSON()).toMatchSnapshot();
    });
    
    test("shows clicked button working", () => {
        // render component
        render(
            <Expand stu_id={stu_id} grades={grades}
                    expand={expandF} handleExpand={handleExpand} />
        );

        // expecting output
        const button = screen.getByText('+');
        userEvent.click(button); 
        expect(handleExpand).toBeCalledTimes(1);
        expect(handleExpand.mock.calls[0][0]).toEqual(stu_id);
    });
});