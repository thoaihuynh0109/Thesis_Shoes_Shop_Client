// filterActions.js
import { SET_BRAND_FILTERS, SET_PRICE_RANGE, SET_GENDER_FILTER } from '../actionsContant';
export const setBrandFilters = (brands) => ({
    type: SET_BRAND_FILTERS,
    payload: brands,
});

export const setPriceRange = (range) => ({
    type: SET_PRICE_RANGE,
    payload: range,
});

export const setGenderFilter = (gender) => ({
    type: SET_GENDER_FILTER,
    payload: gender,
});
