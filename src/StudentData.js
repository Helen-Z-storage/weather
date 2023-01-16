import React from 'react';
import './StudentData.css';

function StudentData(props) {
    const {student, name, avg} = props;

    return (
        <tr>
            <td>
                <img alt={`${name} profile`} src={student.pic} />
            </td>
            <td>
                <ul className='data_space'>
                    <li key="0"><div className='stu_name' style={{width:"100%"}}>{name}</div></li>
                    <li key="1" className='stu_data'>{`Email: ${student.email}`}</li>
                    <li key="2" className='stu_data'>{`Company: ${student.company}`}</li>
                    <li key="3" className='stu_data'>{`Skill: ${student.skill}`}</li>
                    <li key="4" className='stu_data'>{`Average: ${Math.round(avg * 1000) / 1000}%`}</li>
                </ul>
            </td>
        </tr>
    );
}

export default StudentData;
