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
import { findProductIndex } from '~/redux/CartManagement/cartReducer';
import { ToastMessage } from '~/pages/Checkout/ProductsInCard/SummaryStep/SummaryStepData/ProductsTable';
// Make Products Card Item for Home Page
export function MakeProductsCard({
    productId,
    image,
    title,
    price,
    rating,
    label,
    labelNew,
    minWidthCard,
    maxHeightCard,
    imgHeight,
    imgWidth,
    marginRight,
    // gender,
    onClick,
    showToast,
    setToast,
}) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [hoverCard, setHoverCard] = useState(false);
    const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false); // Separate loading state
    const [checkAddToWishList, setCheckAddToWishList] = useState(false);
    const [isLoadingWishList, setIsLoadingWishList] = useState(false); // Separate loading state
    const [valueRating, setValueRating] = useState(rating);

    // const [cartItemsCount, setCartItemsCount] = useState(0);
    // const cartItems = useSelector((state) => state.cart.cartItems);
    // const selectWishlistItems = (state) => state.wishlist.wishlistItems;
    // const selectProductDetails = useSelector((state) => state.productDetail.productDetails);

    // add to cart action
    const handleAddToCart = (product) => {
        setIsLoadingAddToCart(true);
        // Simulate a delay of 2 second before showing the toast
        setTimeout(() => {
            setIsLoadingAddToCart(false);
            dispatch(addToCart(product));

            // Show the toast message
            setToast(true);
            // Reset toast after 3 seconds
            setTimeout(() => {
                setToast(false);
            }, 3000);
        }, 2000);
    };

    // add to wish list action
    const handleAddProductToWishList = (product) => {
        setIsLoadingWishList(true);

        // Simulate a delay of 2 seconds before updating wishlist
        setTimeout(() => {
            dispatch(addToWishlist(product));
            setCheckAddToWishList(true);
            setIsLoadingWishList(false);

            // Show the toast message
            setToast(true);

            // Reset toast after 3 seconds
            setTimeout(() => {
                setToast(false);
            }, 3000);
        }, 2000);
    };

    const handleNavigateToProductDetails = () => {
        // Dispatch the action to store product details
        dispatch(storeProductDetails({ productId, image, title, price }));
        // Navigate to the product detail page
        navigate(`/product-details`);
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
    };

    // handle navigating to the product detail page - without productID
    // const handleNavigateToProductDetails = () => {
    //     navigate('/product-details');
    // };

    return (
        <Box>
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
                key={productId}
                onMouseEnter={handleHover}
                onMouseLeave={handleUnhover}
            >
                {label && (
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
                    image={image}
                    alt="Product Image"
                    key={productId}
                    // onClick={onClick}
                    onClick={handleNavigateToProductDetails}
                    style={{ objectFit: 'contain', width: imgWidth || '194px', margin: '0 auto' }}
                />

                {/* buttons in card products */}
                <CardActions disableSpacing sx={{ display: 'block' }}>
                    {/* button for add to cart  */}
                    <Zoom in={hoverCard}>
                        <Box>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() =>
                                    handleAddToCart({ productId, image, title, price, quantity: 1 })
                                }
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
                    </Zoom>

                    {/* button for add to wisth list */}
                    {/* appear after 0.5 of Add to Cart */}
                    <Zoom in={hoverCard} style={{ transitionDelay: hoverCard ? '500ms' : '0ms' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                mb: '2px',
                            }}
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
                                            productId,
                                            image,
                                            title,
                                            price,
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
                                        // onClick={() =>
                                        //     handleNavigateToProductDetails({
                                        //         productId,
                                        //         title,
                                        //         price,
                                        //         image,
                                        //     })
                                        // }
                                    />
                                </CustomTooltip>
                            </IconButton>
                        </Box>
                    </Zoom>
                </CardActions>
            </Card>
            <Box maxWidth={minWidthCard} sx={{ textAlign: 'center', mt: 1 }}>
                <Typography sx={{ fontSize: '15px' }}>{title}</Typography>
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
