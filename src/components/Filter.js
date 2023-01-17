import React from 'react';
import '../css/Filter.css';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

function Filter(props) {
    const {handleFilter} = props;
  
    return (
        <td id="filter_space">
            <input type="text" id="city_filter"
                onKeyUp={handleFilter} placeholder="Search by city" />
            <input type="text" id="tag_filter"
                onKeyUp={handleFilter} placeholder="Search by tag" />
        </td>
    );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        posts: state.posts
      }
    })(Filter);