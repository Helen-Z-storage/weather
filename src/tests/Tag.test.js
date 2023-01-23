import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import Tag from '../components/Tag';

const user = userEvent.setup();

// required prop data of create component
const tags = ",ad,ver,tise,Ment,339%?,";
const tag_spliter = ",";
const enter = "{enter}";
const one_char_tag = "a" + enter;
const one_char_length = one_char_tag.length - enter.length + 1;
const multi_char_tag = "A@1+" + enter;
const multi_char_length = multi_char_tag.length - enter.length + 1;
const handleFilter = jest.fn();
const setNewCity = jest.fn();
const setNewCity1 = jest.fn();
const setNewCity2 = jest.fn();
const tagErrorMsg = "";
const tagErrorMsg2 = "Error";

// patching the respective key events in the test suites for legacy code
// from https://github.com/testing-library/user-event/issues/946
const keyCodes = {
    Enter: 13,
  }
  function patchKeyEvent(e) {
    Object.defineProperty(e, 'keyCode', {
      get: () => keyCodes[e.code] ?? 0,
    })
  }

describe('testing Tag component', () => {

    beforeAll(() => {
        document.addEventListener('keyup', patchKeyEvent, {capture: true})
      })

    test("Matches the snapshot", () => {
        // create component
        const tagData = create(
            <Tag tags={tags} tagErrorMsg={tagErrorMsg} handleFilter={handleFilter}
                setNewCity={setNewCity}/>
        );

        // expecting output
        expect(tagData.toJSON()).toMatchSnapshot();
    });

    test("Matches the snapshot with error message", () => {
        // create component
        const tagData = create(
            <Tag tags={tags} tagErrorMsg={tagErrorMsg2} handleFilter={handleFilter}
                setNewCity={setNewCity}/>
        );

        // expecting output
        expect(tagData.toJSON()).toMatchSnapshot();
    });

    
    test("Matches the snapshot with undefined tags", () => {
        // render component
        const tagData = create(
            <Tag tags={undefined} tagErrorMsg={tagErrorMsg} handleFilter={handleFilter}
                 setNewCity={setNewCity2}/>
        );
        expect(tagData.toJSON()).toMatchSnapshot();
    });

    test("shows clicked button working", async () => {
        // render component
        render(
            <Tag tags={tags} tagErrorMsg={tagErrorMsg} handleFilter={handleFilter}
                 setNewCity={setNewCity}/>
        );

        // expecting output
        for (var tag of tags.split(tag_spliter).filter(tag => tag !== "")) {
            const button = screen.getByText(tag);
            await user.click(button); 
        }
        expect(handleFilter).toBeCalledTimes(5);
        expect(handleFilter.mock.calls.length).toEqual(5);
        expect(handleFilter.mock.calls[0].length).toEqual(1);
    });

    test("shows tag textfield working: one char tag", async () => {
        // render component
        render(
            <Tag tags={tags} tagErrorMsg={tagErrorMsg} handleFilter={handleFilter}
                 setNewCity={setNewCity1}/>
        );
        
        // expecting output
        const textfield = screen.getByPlaceholderText("Add a tag");

        // this call setNewCity1() one time with event contain "a" 
        await user.type(textfield, one_char_tag);
        expect(setNewCity1).toBeCalledTimes(one_char_length);
        expect(setNewCity1.mock.calls.length).toEqual(one_char_length);
        expect(setNewCity1.mock.calls[0][0].target.value).toEqual("a");
    });

    test("shows tag textfield working: multi char tag", async () => {
        // render component
        render(
            <Tag tags={tags} tagErrorMsg={tagErrorMsg} handleFilter={handleFilter}
                 setNewCity={setNewCity2}/>
        );
        
        // expecting output
        const textfield = screen.getByPlaceholderText("Add a tag");

        // call function 4 more times with event contain "A", "A@", "A@1", "A@1+"
        await user.type(textfield, multi_char_tag);
        const sum = multi_char_length;
        expect(setNewCity2).toBeCalledTimes(sum);
        expect(setNewCity2.mock.calls.length).toEqual(sum);
        expect(setNewCity2.mock.calls[sum - 1][0].target.value).toEqual("A@1+");

    });
});