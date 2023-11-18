// store.js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { cartReducer } from './CartManagement/cartReducer';
import filterReducer from './FilterManagement/filterReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    filter: filterReducer,
});

const store = createStore(rootReducer);

export default store;
