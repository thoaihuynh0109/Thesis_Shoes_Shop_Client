import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { FavoriteSharp } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MakeProductSize from './MakeProductSize';
import RatingProductInformation from './RatingProduct';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { addToCart, incrementQuantity } from '~/redux/CartManagement/cartActions';
import { addToWishlist } from '~/redux/WishListManagement/wishlistActions';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { setProductDetails } from '~/redux/ProductDetails/productDetailsActions';

function ProductInformation({ product }) {
    const productDetail = useSelector((state) => state.productDetail.productDetails);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [sizeSelected, setSizeSelected] = useState('');

    const handleOptionClick = (size) => {
        setSizeSelected(size);
    };
    // console.log('Product size is selected: ', selectedValue);

    // add to cart action
    // add to cart action with product exist in cart
    // const handleAddToCart = (product) => {
    //     const productToAdd = {
    //         _id: productDetail._id,
    //         images: productDetail.images,
    //         name: productDetail.name,
    //         price: productDetail.price,
    //         size: sizeSelected,
    //         quantity: 1,
    //     };

    //     // Check if the product is already in the cart
    //     const existingProduct = cartItems.find((item) => item._id === product._id);
    //     console.log('Product Information just added to cart: ', productToAdd);

    //     // Simulate a delay of 2 seconds before showing the toast
    //     setTimeout(() => {
    //         if (existingProduct) {
    //             // If the product is already in the cart, update the quantity
    //             dispatch(incrementQuantity(product._id, 1));
    //         } else {
    //             // If the product is not in the cart, add it with quantity 1
    //             dispatch(addToCart(productToAdd));
    //         }

    //         // Show the toast message
    //         setToastMessage('Product added to shopping cart successfully!');
    //         setShowToast(true);

    //         // Reset toast after 3 seconds
    //         setTimeout(() => {
    //             setShowToast(false);
    //         }, 3000);
    //     }, 100);
    // };

    const handleAddToCart = () => {
        // Ensure that a size is selected before adding to the cart
        if (!sizeSelected) {
            // Handle the case where no size is selected (show an error, etc.)
            console.error('Please select a size before adding to the cart.');
            return;
        }

        const productToAdd = {
            _id: productDetail._id,
            images: productDetail.images,
            name: productDetail.name,
            price: productDetail.price,
            size: sizeSelected,
            quantity: 1,
        };

        // Check if the product is already in the cart
        const existingProduct = cartItems.find(
            (item) =>
                item._id === product._id &&
                // check item.size === selected?
                item.size === sizeSelected,
        );
        console.log(existingProduct);
        // Simulate a delay of 2 seconds before showing the toast
        setTimeout(() => {
            if (existingProduct) {
                // If the product is already in the cart, update the quantity
                dispatch(incrementQuantity(product._id, 1, sizeSelected));
            } else {
                // If the product is not in the cart, add it with quantity 1
                dispatch(addToCart(productToAdd));
            }

            // Show the toast message
            setToastMessage('Product added to shopping cart successfully!');
            setShowToast(true);
            console.log('Product information just added to cart: ', productToAdd);
            // Reset toast after 3 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }, 100);
    };

    const handleAddToWishlist = () => {
        const productToAddToWishlist = {
            _id: productDetail._id,
            images: productDetail.images, // Replace with the actual property name
            name: productDetail.name,
            price: productDetail.price,
            size: sizeSelected,
            countInStock: productDetail.countInStock, // Replace with the actual property name
        };

        dispatch(addToWishlist(productToAddToWishlist));

        // Show the toast message
        setToastMessage('Sản Phẩm Đã Được Thêm Vào Danh Sách Yêu Thích');
        setShowToast(true);

        // Reset toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 100);
    };

    if (!productDetail) {
        // If productDetail is null, you can return a loading state or an empty component
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '550px',
                pl: 12,
                ml: 8,
                pr: 12,
                overflow: 'scroll',
            }}
            key={product._id}
        >
            {/* product name */}
            <CustomTypography sx={{ fontWeight: '600', fontSize: 17, mt: 2 }}>
                {product.name}
            </CustomTypography>
            {/* for who? */}

            {/* original price and sale price */}
            <Box sx={{ display: 'flex', mr: 4, mt: 2 }}>
                {/* amount is reduced */}
                <CustomTypography sx={{ mr: 1, fontSize: '15px' }}>
                    {product.price.toLocaleString()} VND
                </CustomTypography>

                {/* original price */}
                {/* {flashSale ? (
                    <CustomTypography sx={{ textDecoration: 'line-through', color: '#333' }}>
                        {' '}
                        4,259,000₫
                    </CustomTypography>
                ) : (
                    <Typography></Typography>
                )} */}
            </Box>
            {/*  make size */}
            <CustomTypography sx={{ fontWeight: 'bold', mt: 2, mb: '4px' }}>
                Select Size
            </CustomTypography>
            <Box sx={{ maxWidth: '300px' }}>
                {/* <MakeProductSize data={product.sizes} /> */}
                <Grid container spacing={2}>
                    {product.sizes.length > 0 &&
                        product.sizes.map((size) => (
                            <Grid item xs={4} key={size}>
                                <Box>
                                    <Button
                                        variant={sizeSelected === size ? 'contained' : 'outlined'}
                                        onClick={() => handleOptionClick(size)}
                                        sx={{
                                            width: '80px',
                                            height: '40px',
                                            borderRadius: '4px',
                                            textTransform: 'none',
                                            backgroundColor:
                                                sizeSelected === size ? '#4CAF50' : 'transparent', // Set the background color for the selected button
                                            border:
                                                sizeSelected === size
                                                    ? 'none'
                                                    : '1px solid #4CAF50', // Remove border for the selected button
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                fontSize: '16px',
                                                color: sizeSelected === size ? '#fff' : '#000',
                                            }}
                                        >
                                            {size}
                                        </Box>
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                </Grid>
            </Box>

            {/* add to add to cart */}
            <Box sx={{ mt: 3, mb: 2, mx: 4, minWidth: 40, width: '50%' }}>
                {/* <Button
                    startIcon={<AddShoppingCartIcon />}
                    variant="outlined"
                    sx={{ borderRadius: '20px', width: '100%' }}
                    onClick={handleAddToCart}
                >
                    <Typography sx={{ fontSize: '13px', p: '6px 8px' }}>Add to Cart</Typography>
                </Button> */}
                <Button
                    startIcon={<AddShoppingCartIcon />}
                    variant="outlined"
                    sx={{ borderRadius: '20px', width: '100%' }}
                    onClick={handleAddToCart}
                    disabled={!sizeSelected} // Disable the button if no size is selected
                >
                    <Typography sx={{ fontSize: '13px', p: '6px 8px' }}>Add to Cart</Typography>
                </Button>
            </Box>

            {/* add to wish list */}
            <Box sx={{ mt: 4, mx: 4, minWidth: 40, width: '50%', mb: 4 }}>
                <Button
                    startIcon={<FavoriteSharp />}
                    variant="contained"
                    sx={{ borderRadius: '20px', width: '100%' }}
                    onClick={handleAddToWishlist}
                >
                    <Typography sx={{ fontSize: '13px', p: '4px 8px' }}>Add to Favorite</Typography>
                </Button>
            </Box>

            {/* product description */}
            <Box sx={{ maxWidth: '300px', mb: 2, textAlign: 'justify' }}>
                <CustomTypography>
                    Celebrate MJ's legacy with this shout-out to Chicago's 312 area code. With
                    elements from three iconic Jordans (the AJ3, AJ1 and Air Alpha Force), it's a
                    modern mash-up that reps the best.
                </CustomTypography>
            </Box>

            {/* Reviews */}
            <Box>
                {/* amount of reviews */}
                <RatingProductInformation />
            </Box>
            <ToastMessage2
                message={toastMessage}
                type="success"
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Box>
    );
}

export default ProductInformation;
