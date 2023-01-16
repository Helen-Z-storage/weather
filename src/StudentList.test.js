import React from 'react'
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect' // expect function
import userEvent from '@testing-library/user-event'; 

import StudentList from './StudentList';

// required prop data of create component
const tag_spliter = " ";
const pic_folder = "https://storage.googleapis.com/hatchways-app.appspot.com" + 
                   "/assessments/data/frontend/images/";
let stu_ids = [];
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

// store this student as 0 in mocked localstorage
const student_datas = [
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
student_datas.map((student, i) => {
    storage.setItem(i, JSON.stringify(student));
    stu_ids.push(i);
})
const store_length = storage.length;
const stu_names = student_datas.map(
    stu => `${stu.firstName} ${stu.lastName}`.toUpperCase());
const non_name_length = "profile".length + 1;
const test_nums = student_datas.map(
    stu => stu.grades.length);

describe('testing StudentList component', () => {
    test("Matches the snapshot", () => {
        // create component
        const student = create(
            <StudentList store_length={store_length}/>
        );

        // expecting output
        expect(student.toJSON()).toMatchSnapshot();
    });

    // testing filters
    test("test name filters", () => {
        // render component
        render(
            <StudentList store_length={store_length}/>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by name");
        // filt one students
        userEvent.type(textfield, name_filt_one);
        let filtered_stus = screen.queryAllByRole("img");
        let filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(stu_names[2]);

        // clear textfield
        userEvent.clear(textfield);
        
        // filt two students
        userEvent.type(textfield, name_filt_two);
        filtered_stus = screen.queryAllByRole("img");
        filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(stu_names[0]);
        expect(filtered_names[1]).toEqual(stu_names[2]);
        
        // clear textfield
        userEvent.clear(textfield);

        // filt all students
        userEvent.type(textfield, name_filter);
        filtered_stus = screen.queryAllByRole("img");
        filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(stu_names[0]);
        expect(filtered_names[1]).toEqual(stu_names[1]);
        expect(filtered_names[2]).toEqual(stu_names[2]);
    });

    test("test tag filters", () => {
        // render component
        render(
            <StudentList store_length={store_length}/>
        );

        // expecting output
        const textfield = screen.getByPlaceholderText("Search by tag");
        // filt one students
        userEvent.type(textfield, tag_filt_one);
        let filtered_stus = screen.queryAllByRole("img");
        let filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(stu_names[2]);

        // clear textfield
        userEvent.clear(textfield);
        
        // filt two students
        userEvent.type(textfield, tag_filt_two);
        filtered_stus = screen.queryAllByRole("img");
        filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(stu_names[0]);
        expect(filtered_names[1]).toEqual(stu_names[1]);
        
        // clear textfield
        userEvent.clear(textfield);

        // filt all students
        userEvent.type(textfield, tag_filter);
        filtered_stus = screen.queryAllByRole("img");
        filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(stu_names[0]);
        expect(filtered_names[1]).toEqual(stu_names[1]);
        expect(filtered_names[2]).toEqual(stu_names[2]);
    });

    test("test tag button", () => {
        // render component
        render(
            <StudentList store_length={store_length}/>
        );

        // expecting output
        // click tag_but_one to filt
        let button = screen.getByText(tag_but_one);
        userEvent.click(button);
        let filtered_stus = screen.queryAllByRole("img");
        let filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
            expect(filtered_names[0]).toEqual(stu_names[0]);
            expect(filtered_names[1]).toEqual(stu_names[1]);
        
        // filt two students
        button = screen.getByText(tag_but_two);
        userEvent.click(button);
        filtered_stus = screen.queryAllByRole("img");
        filtered_names = filtered_stus.map(
            stu => stu.alt.substring(0, stu.alt.length - non_name_length));
        expect(filtered_names[0]).toEqual(stu_names[0]);
        expect(filtered_names[1]).toEqual(stu_names[2]);
        
    });

    // testing expand
    test("test expand button", () => {
        // render component
        render(
            <StudentList store_length={store_length}/>
        );

        // expecting output
        // exand one student
        let buttons = screen.getAllByText(expand_F);
        userEvent.click(buttons[1]);
        let expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[1]);
        
        // exand two students
        buttons = screen.getAllByText(expand_F);
        userEvent.click(buttons[1]);
        expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[1] + test_nums[2]);

        // un-exand one student
        buttons = screen.getAllByText(expand_T);
        userEvent.click(buttons[0]);
        expanded_test = screen.getAllByText(expand_context, {exact: false});
        expect(expanded_test.length).toEqual(test_nums[2]);
    });
});