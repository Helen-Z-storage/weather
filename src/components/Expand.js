import React from 'react';
import '../css/Expand.css';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

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

export default connect (
    (state) => {
      return {
        ui: state.ui,
        posts: state.posts
      }
    })(Expand);