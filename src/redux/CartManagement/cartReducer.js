// cartReducer.js
import {
    DECREMENT_QUANTITY,
    INCREMENT_QUANTITY,
    ADD_TO_CART,
    REMOVE_PRODUCT,
} from './actionsContant';

const initialState = {
    cartItems: [],
};

export const findProductIndex = (cartItems, productId) => {
    return cartItems.findIndex((item) => item.productId === productId);
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ADD_TO_CART:
        //     const { productId, quantity } = action.payload;
        //     // find id
        //     const existingIndex = findProductIndex(state.cartItems, productId);

        //     if (existingIndex !== -1) {
        //         // Product already exists in the cart, update quantity
        //         return {
        //             ...state,
        //             cartItems: state.cartItems.map((item, index) =>
        //                 index === existingIndex
        //                     ? { ...item, quantity: item.quantity + quantity } // update quantiy
        //                     : item,
        //             ),
        //         };
        //     } else {
        //         // Product is not in the cart, add it
        //         return {
        //             ...state,
        //             cartItems: [...state.cartItems, { ...action.payload }], // add new product to cart
        //         };
        //     }

        // case ADD_TO_CART:
        //     // Handle adding the product to the cart
        //     return {
        //         ...state,
        //         cartItems: [...state.cartItems, action.payload],
        //     };

        case ADD_TO_CART:
            // Check if the product is already in the cart
            const existingProduct = state.cartItems.find(
                (item) => item.productId === action.payload.productId,
            );

            if (existingProduct) {
                // If the product is already in the cart, update the quantity
                const updatedCartItems = state.cartItems.map((item) =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                // If the product is not in the cart, add it with quantity 1
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload }],
                };
            }

        case DECREMENT_QUANTITY:
            const { productId: decProductId } = action.payload; // Use a different variable name here
            const decExistingIndex = findProductIndex(state.cartItems, decProductId);

            if (decExistingIndex !== -1) {
                // Product exists in the cart
                return {
                    ...state,
                    cartItems: state.cartItems.map((item, index) =>
                        index === decExistingIndex
                            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                            : item,
                    ),
                };
            }
            return state;

        case INCREMENT_QUANTITY:
            const { productId: incProductId, amount: incAmount } = action.payload;
            const incExistingIndex = findProductIndex(state.cartItems, incProductId);

            if (incExistingIndex !== -1) {
                // Product exists in the cart, increment quantity
                return {
                    ...state,
                    cartItems: state.cartItems.map((item, index) =>
                        index === incExistingIndex
                            ? { ...item, quantity: item.quantity + incAmount }
                            : item,
                    ),
                };
            }
            return state;

        case REMOVE_PRODUCT:
            const { productId: removeProductId } = action.payload;
            const updatedCartItems = state.cartItems.filter(
                (item) => item.productId !== removeProductId,
            );

            return {
                ...state,
                cartItems: updatedCartItems,
            };

        default:
            return state;
    }
};

export default cartReducer;

// {
//     productId: 1,
//     img: 'https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg',
//     title: 'Jordan',
//     price: '1,600,000',
//     rating: 4,
//     label: false,
//     brand: 'Puma',
//     quantity: 1,
//     stockStatus: true,
// },
// {
//     productId: 2,
//     img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698215220/Gimme-shoes-images/Adidas/adidas-rapidmove-trainers_udkzcn.jpg',
//     title: 'RAPIDMOVE TRAINER',
//     price: '3,200,000',
//     rating: 3,
//     label: false,
//     brand: 'Puma',
//     quantity: 2,
//     stockStatus: false,
// },
