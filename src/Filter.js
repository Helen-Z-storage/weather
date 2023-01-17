import React from 'react';
import './Filter.css';

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

export default Filter;