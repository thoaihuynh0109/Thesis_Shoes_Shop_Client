import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../actionsContant';
const initialState = {
    wishlistItems: [],
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlistItems: [...state.wishlistItems, action.payload],
            };
        case REMOVE_FROM_WISHLIST:
            const { productId: removeProductId } = action.payload;
            const updatedWishlistItems = state.wishlistItems.filter(
                (item) => item.productId !== removeProductId,
            );

            return {
                ...state,
                wishlistItems: updatedWishlistItems,
            };

        default:
            return state;
    }
};

export default wishlistReducer;
