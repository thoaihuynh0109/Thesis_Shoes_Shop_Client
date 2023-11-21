// filterReducer to filter product which many options
import {
    SET_BRAND_FILTERS,
    SET_PRICE_RANGE,
    SET_GENDER_FILTER,
    APPLY_FILTERS,
} from '../actionsContant';
import shopData from '~/pages/Shop/Pagination/shop.json';
// filterReducer.js
const initialState = {
    brandFilters: [],
    priceRange: '',
    genderFilter: 'All',
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BRAND_FILTERS:
            return { ...state, brandFilters: action.payload };

        case SET_PRICE_RANGE:
            return { ...state, priceRange: action.payload };

        case SET_GENDER_FILTER:
            return { ...state, genderFilter: action.payload };

        case APPLY_FILTERS:
            // Add your filtering logic here
            const { brandFilters, priceRange, genderFilter } = state;
            const filteredProducts = shopData.filter((product) => {
                // Check brand
                const brandFilterPassed =
                    brandFilters.length === 0 || brandFilters.includes(product.brand);
                // Check price
                const priceFilterPassed =
                    priceRange === '' ||
                    (product.price >= priceRange[0] && product.price <= priceRange[1]);
                // Check gender
                const genderFilterPassed =
                    genderFilter === 'All' || product.gender === genderFilter;

                return brandFilterPassed && priceFilterPassed && genderFilterPassed;
            });

            return { ...state, filteredProducts };

        default:
            return state;
    }
};

export default filterReducer;
