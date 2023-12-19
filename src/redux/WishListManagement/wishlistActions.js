// add favorite products to wish list
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../actionsContant';
export const addToWishlist = (productId) => ({
    type: ADD_TO_WISHLIST,
    payload: productId,
});

export const removeFromWishlist = (productId) => ({
    type: REMOVE_FROM_WISHLIST,
    payload: { productId },
});
