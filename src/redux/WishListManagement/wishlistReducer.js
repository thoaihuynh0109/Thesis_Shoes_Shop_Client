import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../actionsContant';
const initialState = {
    wishlistItems: localStorage.getItem('wishlistItems')
        ? JSON.parse(localStorage.getItem('wishlistItems'))
        : [],
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            const newWishlistItems = [...state.wishlistItems, action.payload];

            localStorage.setItem('wishlistItems', JSON.stringify(newWishlistItems));

            return {
                ...state,
                wishlistItems: newWishlistItems,
            };
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
