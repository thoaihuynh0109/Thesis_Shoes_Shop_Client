// store.js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { cartReducer } from './CartManagement/cartReducer';
import filterReducer from './FilterManagement/filterReducer';
import wishlistReducer from './WishListManagement/wishlistReducer';
import productDetailsReducer from './ProductDetails/productDetailsReducer';
import searchReducer from './SearchManagemenet/searchReducer';
const rootReducer = combineReducers({
    cart: cartReducer,
    filter: filterReducer,
    wishlist: wishlistReducer,
    productDetail: productDetailsReducer,
    search: searchReducer,
});

const store = createStore(rootReducer);

export default store;
