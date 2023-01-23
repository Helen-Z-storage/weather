import React, {useState} from 'react';
import '../css/WeatherList.css';
import Weather from './Weather';
import Filter from './Filter';

function WeatherList(props) {
    const {store_length} = props;
    const [cityFilter, setCityFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const flags = new Array(store_length).fill(false);
    const [groupExpand, setGroupExpand] = useState(flags);
    
    const handleFilter = (event) => {
        if (event.target) {
            if (event.target.id === "cityFilter") {
                setCityFilter(event.target.value.toUpperCase());
            }
            if (event.target.id === "countryFilter") {
                setCountryFilter(event.target.value.toUpperCase());
            }
            if (event.target.id === "tagFilter") {
                setTagFilter(event.target.value.toUpperCase());
            }
            // handle tag's button filter
            if (event.target.type === "submit") {
                setTagFilter(event.target.innerHTML.toUpperCase());
            }
        }
    }
    
    const handleExpand = (exp_id) => {
        setGroupExpand(groupExpand.map((expand, i) => i === exp_id? !expand: expand));
    }

    const cityList = groupExpand.map((expand, i) => {
        return <Weather key={i} id={i} expand={expand}
        cityFilter={cityFilter} countryFilter={countryFilter} tagFilter={tagFilter}
        handleExpand={exp_id => handleExpand(exp_id)}
        handleFilter={(e) => handleFilter(e)} />;
    })   

    return (
            <table id="context_box">
                <tbody>
                    <tr>
                    <Filter handleFilter={(e) => handleFilter(e)}/>
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

export default WeatherList;
