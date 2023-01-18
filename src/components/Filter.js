import React from 'react';
import '../css/Filter.css';

function Filter(props) {
    const {handleFilter} = props;
  
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

export default Filter;