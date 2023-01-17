import React from 'react';
import '../css/Tag.css';

import { connect } from "react-redux";
import * as uiActions from "../redux/actions/uiActions";
import * as pageActions from "../redux/actions/pageActions";

const tag_spliter = " ";

function Tag(props) {
    const {cityID} = props;
    let capitals = props.weather.getIn("login.captials".split("."));

    const handleFilter = ({ target }) => {
      props.dispatch(uiActions.setTagFilter(target.innerHTML.toUpperCase()));
    }

    const updateWeatherTag = ({target, nativeEvent}) => {
      let clear = false;
      // handle case of tag_spliter exist in input value
      if (target.value.indexOf(tag_spliter) > -1) {
        alert(`No "${tag_spliter}" should include in Tag`);
        clear = true;
      }

      // handle case of invalid empty tag
      else if (nativeEvent.keyCode === 13 && target.value === "") {
          alert(`No empty tag should been add`);
          clear = true;
      }

      // saving tag iff press "enter"
      else if (nativeEvent.keyCode === 13) {
          var tag = target.value + tag_spliter;
          // Add new tag if tag is not store in current city
          if (capitals[cityID].tags.indexOf(tag_spliter + tag) === -1) {
            capitals[cityID].tags += (tag);
          } else {
              // handle case of duplicate tag
              alert(`No duplicate tag should been add`);
          }
          clear = true;
      }

      // clear text input field
      if (clear) {
          target.value = "";
      };

      props.dispatch(pageActions.pageSetWeather(capitals));
    };

    // split string tag into a list of valid tags, and remove empty tag
    var tag_lst = capitals[cityID].tags.split(tag_spliter).filter(tag => tag !== "")
                  .map((tag, i) => <button key={i} onClick={event => handleFilter(event)}>{tag}</button>);
  
    return (
        <ul>
            <li key="tags" className='tags'>{tag_lst}</li>
            <li><input type="text" onKeyUp={event => updateWeatherTag(event)} placeholder="Add a tag" /></li>
        </ul>
    );
}

export default connect (
    (state) => {
      return {
        ui: state.ui,
        weather: state.weather
      }
    })(Tag);
