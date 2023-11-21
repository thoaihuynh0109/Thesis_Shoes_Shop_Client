import { SET_SEARCH_TERM, SET_MATCHING_PRODUCTS } from '../actionsContant';

const initialState = {
    searchTerm: '',
    matchingProducts: [], // Add this line to include matchingProducts in the state
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            };
        case SET_MATCHING_PRODUCTS:
            return {
                ...state,
                matchingProducts: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
