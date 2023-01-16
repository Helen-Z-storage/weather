import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Tag from './Tag';

// required prop data of create component
const tags = " ad ver tise Ment 339%? ";
const tag_spliter = " ";
const enter = "{enter}";
const one_char_tag = "a" + enter;
const one_char_length = one_char_tag.length - enter.length + 1;
const multi_char_tag = "A@1+" + enter;
const multi_char_length = multi_char_tag.length - enter.length + 1;
const handleFilter = jest.fn();
const setNewStudent = jest.fn();
const setNewStudent1 = jest.fn();
const setNewStudent2 = jest.fn();

describe('testing Tag component', () => {

    test("Matches the snapshot", () => {
        // create component
        const tagData = create(
            <Tag tags={tags} handleFilter={handleFilter}
                setNewStudent={setNewStudent}/>
        );

        // expecting output
        expect(tagData.toJSON()).toMatchSnapshot();
    });
    
    test("shows clicked button working", () => {
        // render component
        render(
            <Tag tags={tags} handleFilter={handleFilter}
                 setNewStudent={setNewStudent}/>
        );

        // expecting output
        for (var tag of tags.split(tag_spliter).filter(tag => tag !== "")) {
            const button = screen.getByText(tag);
            userEvent.click(button); 
        }
        expect(handleFilter).toBeCalledTimes(5);
        expect(handleFilter.mock.calls.length).toEqual(5);
        expect(handleFilter.mock.calls[0].length).toEqual(1);
    });

    test("shows tag textfield working: one char tag", () => {
        // render component
        render(
            <Tag tags={tags} handleFilter={handleFilter}
                 setNewStudent={setNewStudent1}/>
        );
        
        // expecting output
        const textfield = screen.getByPlaceholderText("Add a tag");

        // this call setNewStudent1() one time with event contain "a" 
        userEvent.type(textfield, one_char_tag);
        expect(setNewStudent1).toBeCalledTimes(one_char_length);
        expect(setNewStudent1.mock.calls.length).toEqual(one_char_length);
        expect(setNewStudent1.mock.calls[0][0].target.value).toEqual("a");
    });

    test("shows tag textfield working: multi char tag", () => {
        // render component
        render(
            <Tag tags={tags} handleFilter={handleFilter}
                 setNewStudent={setNewStudent2}/>
        );
        
        // expecting output
        const textfield = screen.getByPlaceholderText("Add a tag");

        // call function 4 more times with event contain "A", "A@", "A@1", "A@1+"
        userEvent.type(textfield, multi_char_tag);
        const sum = multi_char_length;
        expect(setNewStudent2).toBeCalledTimes(sum);
        expect(setNewStudent2.mock.calls.length).toEqual(sum);
        expect(setNewStudent2.mock.calls[sum - 1][0].target.value).toEqual("A@1+");

    });
});