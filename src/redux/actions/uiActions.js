import { actionType } from "./actionType";

export const setCityFilter = (cityFilter) => {
    return {
        type: actionType.ui.setCityFilter,
        payload: cityFilter
    }
}

export const setCountryFilter = (countryFilter) => {
    return {
        type: actionType.ui.setCountryFilter,
        payload: countryFilter
    }
}

export const setTagFilter = (tagFilter) => {
    return {
        type: actionType.ui.setTagFilter,
        payload: tagFilter
    }
}

export const setGroupExpand = (groupExpand) => {
    return {
        type: actionType.ui.setGroupExpand,
        payload: groupExpand
    }
}
