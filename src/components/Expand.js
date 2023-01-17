import React from 'react';
import '../css/Expand.css';

function Expand(props) {
    const {stu_id, grades, expand, handleExpand} = props;
    var grade_lst = grades.map((grade, i) => 
                        <li key={"grade_" + i}>
                            {`Test ${i+1}:`}&emsp;&ensp;{`${grade}%`}</li>);

    return (
        <ul className='grade_lst'>
            <li><button className="expand" onClick={() => handleExpand(stu_id)}>
                {expand? "-": "+"}</button></li>
            {expand? grade_lst: <li></li>}
        </ul>
        );
}

export default Expand;