import React from 'react'
import { create } from "react-test-renderer";

import '@testing-library/jest-dom/extend-expect' // expect function

import StudentData from './StudentData';

// required prop data of create component
const student = {
    city: "Fushë-Muhurr",
    company: "Yadel",
    email: "iorton0@imdb.com",
    firstName: "Ingaberg",
    grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
    id: "1",
    lastName: "Orton",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/" + 
            "ssessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
    tags: " "
};
const name = `${student.firstName} ${student.lastName}`.toUpperCase();
const avg = student.grades.map(grade => parseInt(grade, 10))
                            .reduce((a, b) => a + b, 0)
                            / student.grades.length;

describe('testing StudentData component', () => {
    // snampshot testing, for non-state component only
    test("Matches the snapshot", () => {
        // create component
        const studentData = create(
            <StudentData student={student} name={name} avg={avg}/>
        );

        // expecting output
        expect(studentData.toJSON()).toMatchSnapshot();
    });
});