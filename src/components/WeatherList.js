import React from 'react';
import '../css/WeatherList.css';
import Weather from './Weather';
import Filter from './Filter';
import { v4 as uuidv4 } from 'uuid';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

class WeatherList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name_filter: "",
            tag_filter: "",
            group_expand: new Array(this.props.store_length).fill(false)
        };
    }
  
    // handle filter's input
    handleFilter(event) {
        // Declare variables
        var name_filter, tag_filter, group_expand;
        ({name_filter, tag_filter, group_expand} = this.state);
    
        // handle name's text filter
        if (event.target.id === "name_filter") {
            name_filter = event.target.value.toUpperCase();
        }
        
        // handle tag's text filter
        if (event.target.id === "tag_filter") {
            tag_filter = event.target.value;
        }
    
        // handle tag's button filter
        if (event.target.type === "submit") {
            tag_filter = event.target.innerHTML;
        }
    
        this.setState({name_filter, tag_filter, group_expand});
    }
  
    // handle whether current city should expand
    handleExpand(exp_id) {
        var name_filter, tag_filter, group_expand;
        ({name_filter, tag_filter, group_expand} = this.state);
    
        group_expand[exp_id] = !group_expand[exp_id];
    
        this.setState({name_filter, tag_filter, group_expand});
    }
  
    render(){
        var name_filter, tag_filter, group_expand;
        ({name_filter, tag_filter, group_expand} = this.state);
        
        let city_lst = group_expand.map((expand, i) => {
            return <Weather key={uuidv4()} city_id={i} expand={expand}
                            name_filter={name_filter} tag_filter={tag_filter}
                            handleExpand={exp_id => this.handleExpand(exp_id)}
                            handleFilter={(e) => this.handleFilter(e)}/>;
        })   
  
        return (
            <table id="context_box">
                <tbody>
                    <tr>
                        <Filter handleFilter={(e) => this.handleFilter(e)}/>
                    </tr>
                    <tr>
                        <td>
                            <ul id="lst_table">{city_lst}</ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
  }
  

export default connect (
    (state) => {
      return {
        ui: state.ui,
        posts: state.posts
      }
    })(WeatherList);
