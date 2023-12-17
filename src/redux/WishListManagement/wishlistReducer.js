import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../actionsContant';
const initialState = {
    wishlistItems: localStorage.getItem('wishlistItems')
        ? JSON.parse(localStorage.getItem('wishlistItems'))
        : [],
};

export const findProductIndex = (wishlistItems, productId) => {
    return wishlistItems.findIndex((item) => item._id === productId);
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            const existingProductIndex = findProductIndex(
                state.wishlistItems,
                action.payload.productId,
            );

            if (existingProductIndex === -1) {
                // Product doesn't exist in the wishlist, add it
                const newWishlistItems = [...state.wishlistItems, action.payload];
                localStorage.setItem('wishlistItems', JSON.stringify(newWishlistItems));

                return {
                    ...state,
                    wishlistItems: newWishlistItems,
                };
            } else {
                // Product already exists in the wishlist
                return state;
            }
        case REMOVE_FROM_WISHLIST:
            const { productId: removeProductId } = action.payload;
            const updatedWishlistItems = state.wishlistItems.filter(
                (item) => item._id !== removeProductId,
            );

            localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));

            return {
                ...state,
                wishlistItems: updatedWishlistItems,
            };

        default:
            return state;
    }
};

export default wishlistReducer;
