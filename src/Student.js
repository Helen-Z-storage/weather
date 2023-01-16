import React, { useState } from 'react';
import './Student.css';
import StudentData from './StudentData';
import Expand from './Expand';
import Tag from './Tag';

let storage = window.localStorage;
let tag_spliter = " ";

// adding valid tags in localStorage's current student data
const addNewTag = (filter, keyCode, new_tags) => {
    var clear = false;

    // handle case of tag_spliter exist in input value
    if (filter.indexOf(tag_spliter) > -1) {
        alert(`No "${tag_spliter}" should include in Tag`);
        clear = true;
    }

    // handle case of invalid empty tag
    else if (keyCode === 13 && filter === "") {
        alert(`No empty tag should been add`);
        clear = true;
    }

    // saving tag iff press "enter"
    else if (keyCode === 13) {

        var tag = filter + tag_spliter;

        // Add new tag if tag is not store in current student
        if (new_tags.indexOf(tag_spliter + tag) === -1) {
            new_tags += (tag);
        } else {
            // handle case of duplicate tag
            alert(`No duplicate tag should been add`);
        }
        // clear text input field
        clear = true;
    }
    return [clear, new_tags];
}

// LocalStorage Hook
function useLocalStorage(stu_id) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [prevState, setPrevState] = useState([]);
    const [student, setStudent] = useState(() => {
        try {
            // Get from local storage by stu_id
            const exist_stu = storage.getItem(stu_id);
            return exist_stu ? JSON.parse(exist_stu) : {};
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    });

    // update student's tag by value of input tagEvent
    const setNewStudent = tagEvent => {
        try {
            // adding tag and clear tag adding field by cases
            const [clear, new_tags] = addNewTag(tagEvent.target.value, tagEvent.nativeEvent.keyCode, student.tags);
            if (clear) {
                tagEvent.target.value = "";
                student.tags = new_tags;
            };

            // Save new student in state and update new state for synchronize render
            setStudent(student);
            setPrevState([...prevState]);

            // Save new student to local storage
            storage.setItem(stu_id, JSON.stringify(student));

        } catch (error) {
            console.error('Error:', error);
        }
      };

    return [student, setNewStudent];
}

function Student(props) {
    const {stu_id, expand, name_filter, tag_filter, 
        handleExpand, handleFilter} = props;
    var name, grades, avg, remove_by_name, remove_by_tag, disp;

    // init student local storage update hook
    const [student, setNewStudent] = useLocalStorage(stu_id);

    // getting useful data from student
    name = `${student.firstName} ${student.lastName}`.toUpperCase();
    grades = student.grades.map(grade => parseInt(grade, 10));
    avg = grades.reduce((a, b) => a + b, 0) / grades.length;

    // check whether current student is not filter by name_filter or tag_filter
    remove_by_name = name.indexOf(name_filter) === -1;
    remove_by_tag = student.tags.indexOf(tag_filter) === -1;
    disp = (remove_by_name || remove_by_tag)? {display:"none"}: {};

    return (
        <li className="single_student" style={disp}>
            <table>
                <tbody>
                    <StudentData student={student} name={name} avg={avg}/>
                    <tr>
                        <td></td>
                        <td>
                            <Expand stu_id={stu_id} grades={grades}
                                expand={expand} handleExpand={handleExpand} />
                            <Tag tags={student.tags} handleFilter={handleFilter}
                                setNewStudent={setNewStudent}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </li>
    );
}

export default Student;

