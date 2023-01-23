import React from 'react';
import '../css/Tag.css';

const tag_spliter = ",";

function Tag(props) {
  const {tags, tagErrorMsg, handleFilter, setNewCity} = props;


    // split string tag into a list of valid tags, and remove empty tag
    var tag_lst = tags? tags.split(tag_spliter).filter(tag => tag !== "")
                  .map((tag, i) => <button key={i} onClick={e => handleFilter(e)}>{tag}</button>): [];
  
    return (
        <ul>
            <li key="tags" className='tags'>{tag_lst}</li>
            <li className='tagError'>{tagErrorMsg}</li>
            <li><input type="text" onKeyUp={event => setNewCity(event)} placeholder="Add a tag" /></li>
        </ul>
    );
}

export default Tag;
