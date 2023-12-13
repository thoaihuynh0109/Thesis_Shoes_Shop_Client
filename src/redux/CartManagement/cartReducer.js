// cartReducer.js
import {
    DECREMENT_QUANTITY,
    INCREMENT_QUANTITY,
    ADD_TO_CART,
    REMOVE_PRODUCT,
} from '../actionsContant';

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
};

export const findProductIndex = (cartItems, productId, sizeSelected) => {
    return cartItems.findIndex((item) => item._id === productId && item.size === sizeSelected);
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Check if the product is already in the cart
            const existingProduct = state.cartItems.find(
                (item) => item._id === action.payload.productId,
            );

            if (existingProduct) {
                // If the product is already in the cart, update the quantity
                const updatedCartItems = state.cartItems.map((item) =>
                    item._id === action.payload.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                // If the product is not in the cart, add it with quantity 1
                const newCartItems = [...state.cartItems, { ...action.payload }];
                localStorage.setItem('cartItems', JSON.stringify(newCartItems));
                return {
                    ...state,
                    cartItems: newCartItems,
                };
            }

        case DECREMENT_QUANTITY:
            // desc quantity contrainst by: productID and product size selected
            const { productId: decProductId, sizeSelectedDesc } = action.payload; // Use a different variable name here
            const decExistingIndex = findProductIndex(
                state.cartItems,
                decProductId,
                sizeSelectedDesc,
            );

            if (decExistingIndex !== -1) {
                // Product exists in the cart
                const updatedCartItems = state.cartItems.map((item, index) =>
                    index === decExistingIndex
                        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                        : item,
                );

                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
            return state;

        case INCREMENT_QUANTITY:
            // incs quantity contrainst by: productID and product size selected
            const { productId: incProductId, amount: incAmount, sizeSelected } = action.payload;
            const incExistingIndex = findProductIndex(state.cartItems, incProductId, sizeSelected);

            if (incExistingIndex !== -1) {
                // Product exists in the cart, increment quantity
                const updatedCartItems = state.cartItems.map((item, index) =>
                    index === incExistingIndex && item.size === sizeSelected
                        ? { ...item, quantity: item.quantity + incAmount }
                        : item,
                );

                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
            return state;

        case REMOVE_PRODUCT:
            const { productId: removeProductId, sizeSelectedRm } = action.payload;
            const updatedCartItems = state.cartItems.filter(
                (item) => item._id !== removeProductId || item.size !== sizeSelectedRm,
            );

            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

            return {
                ...state,
                cartItems: updatedCartItems,
            };
        case 'REMOVE_CART':
            localStorage.setItem('cartItems', []);
            return {
                ...state,
                cartItems: [],
            };
        case 'SET_STORE_SIZE_SELECTED':
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
};

export default cartReducer;
