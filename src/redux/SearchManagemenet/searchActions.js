import { SET_SEARCH_TERM, SET_MATCHING_PRODUCTS } from '../actionsContant';

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term,
});

export const setMatchingProducts = (products) => ({
    type: SET_MATCHING_PRODUCTS,
    payload: products,
});
