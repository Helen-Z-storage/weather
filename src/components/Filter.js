import React from 'react';
import '../css/Filter.css';

import { connect } from "react-redux";
import * as uiActions from "../redux/actions/uiActions";

function Filter(props) {
    const handleFilter = ({ target }) => {
        const formattedVal = target.value.toUpperCase();
        if (target.id === "cityFilter") {
            props.dispatch(uiActions.setCityFilter(formattedVal));
        }
        if (target.id === "countryFilter") {
            props.dispatch(uiActions.setCountryFilter(formattedVal));
        }
        if (target.id === "tagFilter") {
            props.dispatch(uiActions.setTagFilter(formattedVal));
        }
    }
  
    return (
        <td id="filter_space">
            <input type="text" id="cityFilter"
                onKeyUp={(e) => handleFilter(e)} placeholder="Search by city" />
            <input type="text" id="countryFilter"
                onKeyUp={(e) => handleFilter(e)} placeholder="Search by country" />
            <input type="text" id="tagFilter"
                onKeyUp={(e) => handleFilter(e)} placeholder="Search by tag" />
        </td>
    );
}

export default connect()(Filter);