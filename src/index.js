import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StudentList from './StudentList';
import reportWebVitals from './reportWebVitals';

// global variables
let url = "https://api.hatchways.io/assessment/students";
let storage = window.localStorage;
// use this tag_spliter to split tags
// tag which insert same as tag_spliter and "" tag is not included
let tag_spliter = " ";

// fetch by GET
// since it store in localStorage, data will not lost after we close browser
if (storage.length === 0) {
    fetch(url)
    .then(response => response.json())
    .then(fetched_data => {

        // store every single student from fetched_data into local storage
        // useing index 0 to storage.length to find them
        // adding "tags" to store tags by string
        fetched_data.students.map((stu, i) => {
            stu['tags'] = tag_spliter;
            storage.setItem(i, JSON.stringify(stu));
            // DIFF
            return i;
        });
    })
    .catch(error => console.error('Error:', error));
}

ReactDOM.render(
    //<StudentList store_length={storage.length}/>,
    <StudentList store_length={storage.length}/>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
