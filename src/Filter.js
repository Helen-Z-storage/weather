import React from 'react';
import './Filter.css';

function Filter(props) {
    const {handleFilter} = props;
  
    return (
        <td id="filter_space">
            <input type="text" id="name_filter"
                onKeyUp={handleFilter} placeholder="Search by name" />
            <input type="text" id="tag_filter"
                onKeyUp={handleFilter} placeholder="Search by tag" />
        </td>
    );
}

export default Filter;