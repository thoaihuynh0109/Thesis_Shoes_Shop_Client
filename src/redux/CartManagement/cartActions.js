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

export const decrementQuantity = (productId, amount) => ({
    type: DECREMENT_QUANTITY,
    payload: { productId, amount },
});

export const incrementQuantity = (productId, amount) => ({
    type: INCREMENT_QUANTITY,
    payload: { productId, amount },
});

export const removeProduct = (productId) => ({
    type: REMOVE_PRODUCT,
    payload: { productId },
});
