import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardActions,
    CardMedia,
    Button,
    Typography,
    Zoom,
    IconButton,
    CircularProgress,
    Stack,
    Badge,
    Avatar,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import Rating from '@mui/material/Rating';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CustomTooltip } from '~/pages/Home/TabProducts/ProductsCard';
import CustomTypography from '../CustomTyporaphy/CustomTyporaphy';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity } from '~/redux/CartManagement/cartActions';
import { addToWishlist } from '~/redux/WishListManagement/wishlistActions';
import { storeProductDetails } from '~/redux/ProductDetails/productDetailsActions';
// Make Products Card Item for Home Page

export function MakeProductsCard({
    _id,
    images,
    name,
    price,
    rating,
    label,
    labelNew,
    minWidthCard,
    maxHeightCard,
    imgHeight,
    imgWidth,
    marginRight,
    countInStock = 20,
    // gender,
    onClick,
    showToast,
    setShowToast,
    //message for what actions are clicking!
    toastMessage,
    setToastMessage,
    // setToast,
}) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    const navigate = useNavigate();

    const [hoverCard, setHoverCard] = useState(false);
    const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false); // Separate loading state
    const [checkAddToWishList, setCheckAddToWishList] = useState(false);
    const [isLoadingWishList, setIsLoadingWishList] = useState(false); // Separate loading state
    const [valueRating, setValueRating] = useState(rating);

    // add to cart action
    // add to cart action with product exist in cart
    const handleAddToCart = (product) => {
        setIsLoadingAddToCart(true);

        // Check if the product is already in the cart
        const existingProduct = cartItems.find((item) => item._id === product._id);

        // Simulate a delay of 2 seconds before showing the toast
        setTimeout(() => {
            setIsLoadingAddToCart(false);

            if (existingProduct) {
                // If the product is already in the cart, update the quantity
                dispatch(incrementQuantity(product._id, 1));
            } else {
                // If the product is not in the cart, add it with quantity 1
                dispatch(addToCart(product));
            }

            // Show the toast message
            setToastMessage('Product added to shopping cart successfully!');
            setShowToast(true);

            // Reset toast after 3 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }, 2000);
    };

    // add to wish list action
    // const handleAddProductToWishList = (product) => {
    //     setIsLoadingWishList(true);

    //     // Simulate a delay of 2 seconds before updating wishlist
    //     setTimeout(() => {
    //         dispatch(addToWishlist(product));
    //         setCheckAddToWishList(true);
    //         setIsLoadingWishList(false);
    //         setToastMessage('Sản Phẩm Đã Được Thêm Vào Danh Sách Yêu Thích');
    //         // Show the toast message
    //         setShowToast(true);

    //         // Reset toast after 3 seconds
    //         setTimeout(() => {
    //             setShowToast(false);
    //         }, 3000);
    //     }, 2000);
    // };
    // add to wish list action
    const handleAddProductToWishList = (product) => {
        setIsLoadingWishList(true);

        // Check if the product is already in the wishlist
        const existingProduct = wishlistItems.find((item) => item._id === product._id);

        // Simulate a delay of 2 seconds before updating wishlist
        setTimeout(() => {
            if (existingProduct) {
                setIsLoadingWishList(false);
                setToastMessage('Sản Phẩm Đã Tồn Tại Trong Danh Sách Yêu Thích');
            } else {
                // Product already exists in the wishlist
                dispatch(addToWishlist(product));
                setCheckAddToWishList(true);
                setIsLoadingWishList(false);
                console.log('thông tin sản phảm được add vào trong wishlist: ', product);
                setToastMessage('Sản Phẩm Đã Được Thêm Vào Danh Sách Yêu Thích');
            }

            // Show the toast message
            setShowToast(true);

            // Reset toast after 3 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }, 2000);
    };

    const handleNavigateToProductDetails = () => {
        // Dispatch the action to store product details
        dispatch(storeProductDetails({ _id, images, name, price }));
        // Navigate to the product detail page
        navigate(`/product-details/${_id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // mouse enter and leave event handlers
    const handleHover = () => {
        setHoverCard(true);
    };

    const handleUnhover = () => {
        setHoverCard(false);
    };

    // handle navigating to the wishlist page
    const handleNavigateToWishlist = () => {
        navigate('/my-wishlist');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ mb: 2, ml: 1 }}>
            <Card
                sx={{
                    minWidth: minWidthCard || '270px',
                    maxHeight: maxHeightCard || '285px',
                    cursor: 'pointer',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: 'rotateY(0deg)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                    mr: marginRight || 2,
                }}
                key={_id}
                onMouseEnter={handleHover}
                onMouseLeave={handleUnhover}
            >
                {label ? (
                    // show sale label
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            transform: 'translate(30%, -10%) rotate(45deg)',
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '4px 16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {/* {label} */}
                        Sale
                    </Box>
                ) : (
                    // price not sale
                    <Box></Box>
                )}

                {labelNew && (
                    <Avatar
                        sx={{
                            background: 'linear-gradient(45deg, #ff8a00, #e52e71)',
                            width: '50px',
                            height: '50px',
                            position: 'absolute',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                top: '33%',
                                left: '63%',
                                transform: 'translate(-50%, -50%)',
                                color: 'white',
                                padding: '4px 16px',
                                fontWeight: 'bold',
                            }}
                        >
                            <CustomTypography textAlign={'center'}>New</CustomTypography>
                        </Box>
                    </Avatar>
                )}

                <CardMedia
                    component="img"
                    height={imgHeight || '194'}
                    // width={'194px'}
                    image={images}
                    alt="Product Image"
                    key={_id}
                    // onClick={onClick}
                    onClick={handleNavigateToProductDetails}
                    style={{ objectFit: 'contain', width: imgWidth || '194px', margin: '0 auto' }}
                />

                {/* buttons in card products */}
                <CardActions disableSpacing sx={{ display: 'block' }}>
                    {/* button for add to cart  */}
                    {/* <Zoom in={hoverCard}>
                        <Box>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() =>
                                    handleAddToCart({
                                        _id,
                                        images,
                                        name,
                                        price,
                                        quantity: 1,
                                        countInStock,
                                    })
                                }
                                disabled={isLoadingAddToCart}
                            >
                                {isLoadingAddToCart ? (
                                    <>
                                        <CircularProgress size={20} sx={{ mr: 2 }} />
                                        <Typography sx={{ fontSize: '14px' }}>
                                            Adding to Cart
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <AddShoppingCartIcon sx={{ mr: 2, fontSize: '16px' }} />
                                        <Typography sx={{ fontSize: '14px' }}>
                                            Add to Cart
                                        </Typography>
                                    </>
                                )}
                            </Button>
                        </Box>
                    </Zoom> */}

                    {/* button for add to wisth list */}
                    {/* appear after 0.5 of Add to Cart */}
                    <Zoom in={hoverCard} style={{ transitionDelay: hoverCard ? '200ms' : '0ms' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                mb: '2px',
                            }}
                            disabled={isLoadingWishList}
                        >
                            {isLoadingWishList ? (
                                <CircularProgress size={20} />
                            ) : checkAddToWishList ? (
                                <IconButton
                                    aria-label="added to favorites"
                                    onClick={handleNavigateToWishlist}
                                >
                                    <CustomTooltip title="Browse Wishlist">
                                        <CheckIcon
                                            sx={{
                                                fontSize: '20px',
                                                '&:hover': {
                                                    color: 'var(--icon-hover)',
                                                },
                                            }}
                                        />
                                    </CustomTooltip>
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={() =>
                                        handleAddProductToWishList({
                                            _id,
                                            images,
                                            name,
                                            price,
                                            countInStock,
                                        })
                                    }
                                >
                                    <CustomTooltip title="Add to Wishlist">
                                        <FavoriteIcon
                                            sx={{
                                                fontSize: '20px',
                                                '&:hover': {
                                                    color: 'var(--icon-hover)',
                                                },
                                            }}
                                        />
                                    </CustomTooltip>
                                </IconButton>
                            )}

                            <IconButton aria-label="Quick View">
                                <CustomTooltip title="Quick View">
                                    <VisibilityIcon
                                        sx={{
                                            fontSize: '20px',
                                            '&:hover': {
                                                color: 'var( --icon-hover)',
                                            },
                                        }}
                                    />
                                </CustomTooltip>
                            </IconButton>
                        </Box>
                    </Zoom>
                </CardActions>
            </Card>
            <Box maxWidth={minWidthCard} sx={{ textAlign: 'center', mt: 1 }}>
                {/* Hide Name of product when it's too long */}
                <Typography
                    sx={{
                        fontSize: '15px',
                        textTransform: 'capitalize',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {name}
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                    <strong>{price} VND</strong>
                </Typography>
                <Rating name="read-only" value={valueRating} readOnly size="large" />
            </Box>

            {/* Toast message */}
        </Box>
    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function ToastMessage2({ message, type, showToast, setShowToast }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (showToast) {
            setOpen(true);
        }
    }, [showToast]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        // Reset toast state
        setShowToast(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            // Adjust anchorOrigin for centering
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                <CustomTypography>{message}</CustomTypography>
            </Alert>
        </Snackbar>
    );
}
