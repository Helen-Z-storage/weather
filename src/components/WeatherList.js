import React from 'react';
import '../css/WeatherList.css';
import Weather from './Weather';
import Filter from './Filter';
import weatherList from "../data/weather.json";

const storage = window.localStorage;

class WeatherList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cityFilter: "",
            countryFilter: "",
            tagFilter: "",
            groupExpand: new Array(this.props.store_length).fill(false)
        };
    }
    
    handleFilter(event) {
        // handle name's text filter
        let {cityFilter, countryFilter, tagFilter, groupExpand} = this.state;
        
        if (event.target.id === "cityFilter") {
            cityFilter = event.target.value.toUpperCase();
        }
        if (event.target.id === "countryFilter") {
            countryFilter = event.target.value.toUpperCase();
        }
        if (event.target.id === "tagFilter") {
            tagFilter = event.target.value.toUpperCase();
        }
        // handle tag's button filter
        if (event.target.type === "submit") {
            tagFilter = event.target.innerHTML;
        }
        this.setState({cityFilter, countryFilter, tagFilter, groupExpand});
    }
    
    handleExpand(exp_id) {
        let {cityFilter, countryFilter, tagFilter, groupExpand} = this.state;
        groupExpand[exp_id] = !groupExpand[exp_id] 
        this.setState({cityFilter, countryFilter, tagFilter, groupExpand});
    }

    render(){
        // handle whether current student should expand
        let {cityFilter, countryFilter, tagFilter, groupExpand} = this.state;

        const cityList = groupExpand.map((expand, i) => {
            return <Weather key={i} id={i} expand={expand}
            cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
            handleExpand={exp_id => this.handleExpand(exp_id)}
            handleFilter={(e) => this.handleFilter(e)} />;
            /*
            return <Weather key={i} id={i} weatherList={this.props.weatherList} expand={expand}
            cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
            handleExpand={exp_id => this.handleExpand(exp_id)}
            handleFilter={(e) => this.handleFilter(e)}
            setWeatherList={this.props.setWeatherList}/>;
            */
        })   
        
        return (
            <table id="context_box">
                <tbody>
                    <tr>
                    <Filter handleFilter={(e) => this.handleFilter(e)}/>
                    </tr>
                    <tr>
                        <td>
                            <ul id="lst_table">{cityList}</ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default WeatherList;
