// cartActions.js

import {
    ADD_TO_CART,
    DECREMENT_QUANTITY,
    INCREMENT_QUANTITY,
    REMOVE_PRODUCT,
} from '../actionsContant';

// Action Creators
// export const addToCart = (productId, quantity) => ({
//     type: ADD_TO_CART,
//     payload: { productId, quantity },
// });

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const decrementQuantity = (productId, amount, sizeSelectedDesc) => ({
    type: DECREMENT_QUANTITY,
    payload: { productId, amount, sizeSelectedDesc },
});

export const incrementQuantity = (productId, amount, sizeSelected) => ({
    type: INCREMENT_QUANTITY,
    payload: { productId, amount, sizeSelected },
});

export const removeProduct = (productId, sizeSelectedRm) => ({
    type: REMOVE_PRODUCT,
    payload: { productId, sizeSelectedRm },
});

export const removeCart = () => ({
    type: 'REMOVE_CART',
});

export const setStoreSizeSelected = (sizeSelected) => ({
    type: 'SET_STORE_SIZE_SELECTED',
    payload: sizeSelected,
});
