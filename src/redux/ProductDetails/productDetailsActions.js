import { STORE_PRODUCT_DETAILS } from '../actionsContant';

export const storeProductDetails = (productDetails) => ({
    type: STORE_PRODUCT_DETAILS,
    payload: productDetails,
});

export const setProductDetails = (productDetails) => ({
    type: 'SET_PRODUCT_DETAILS',
    payload: productDetails,
});
