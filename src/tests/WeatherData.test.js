import React from 'react'
import { create } from "react-test-renderer";

import '@testing-library/jest-dom/extend-expect' // expect function

import WeatherData from '../components/WeatherData';

// required prop data of create component
const city = {
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
const name = `${city.firstName} ${city.lastName}`.toUpperCase();
const avg = city.grades.map(grade => parseInt(grade, 10))
                            .reduce((a, b) => a + b, 0)
                            / city.grades.length;

describe('testing WeatherData component', () => {
    // snampshot testing, for non-state component only
    test("Matches the snapshot", () => {
        // create component
        const cityData = create(
            <WeatherData city={city} name={name} avg={avg}/>
        );

        // expecting output
        expect(cityData.toJSON()).toMatchSnapshot();
    });
});