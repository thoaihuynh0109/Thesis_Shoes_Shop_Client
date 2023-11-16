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
    Badge,
    Avatar,
} from '@mui/material';

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
import { findProductIndex } from '~/redux/CartManagement/cartReducer';

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
    onClick,
}) {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [hoverCard, setHoverCard] = useState(false);
    const [checkAddToWishList, setCheckAddToWishList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [valueRating, setValueRating] = useState(rating);

    const [cartItemsCount, setCartItemsCount] = useState(0);
    const cartItems = useSelector((state) => state.cart.cartItems);

    //

    const handleAddToCart = (product) => {
        console.log('Cart Items:', cartItems);
        console.log('Adding Product:', product);

        const existingProduct = cartItems.find((item) => item.productId === product.productId);

        console.log('Existing Product:', existingProduct);

        if (existingProduct) {
            // If the product is already in the cart, update the quantity
            console.log('Updating Quantity:', existingProduct.quantity + 1);
            dispatch(incrementQuantity(product.productId, existingProduct.quantity + 1));
        } else {
            // If the product is not in the cart, add it with quantity 1
            console.log('Adding New Product to Cart');
            dispatch(addToCart(product));
        }
    };

    // mouse enter and leave event handlers
    const handleHover = () => {
        setHoverCard(true);
    };

    const handleUnhover = () => {
        setHoverCard(false);
    };

    // handle adding product to the wish list
    const handleAddProductToWishList = () => {
        setIsLoading(true);
        setTimeout(() => {
            setCheckAddToWishList(true);
            setIsLoading(false);
        }, 2000);
    };

    // handle navigating to the wishlist page
    const handleNavigateToWishlist = () => {
        navigate('/my-wishlist');
    };

    // handle navigating to the product detail page
    const handleNavigateToProductDetails = () => {
        navigate('/product-details');
    };

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
                    mr: 2,
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
                    onClick={onClick}
                    style={{ objectFit: 'contain', width: imgWidth || '194px', margin: '0 auto' }}
                />

                <CardActions disableSpacing sx={{ display: 'block' }}>
                    <Zoom in={hoverCard}>
                        <Box>
                            <Button
                                variant="contained"
                                fullWidth
                                // onClick={() => handleAddToCart({ image, title, price })}
                                onClick={() =>
                                    handleAddToCart({ productId, image, title, price, quantity: 1 })
                                }
                                // onClick={handleAddToCart}
                            >
                                <AddShoppingCartIcon sx={{ mr: 2, fontSize: '16px' }} />
                                <Typography sx={{ fontSize: '14px' }}>Add to Cart</Typography>
                            </Button>
                        </Box>
                    </Zoom>
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
                            {/*  */}
                            {isLoading ? (
                                <CircularProgress size={20} />
                            ) : checkAddToWishList ? (
                                <IconButton
                                    aria-label="added to favorites"
                                    onClick={handleNavigateToWishlist}
                                >
                                    <CustomTooltip title="Browse WishList">
                                        <CheckIcon
                                            sx={{
                                                fontSize: '20px',
                                                '&:hover': {
                                                    color: 'var( --icon-hover)',
                                                },
                                            }}
                                        />
                                    </CustomTooltip>
                                </IconButton>
                            ) : (
                                <IconButton aria-label="add to favorites">
                                    <CustomTooltip title="Add to Wish List">
                                        <FavoriteIcon
                                            sx={{
                                                fontSize: '20px',
                                                '&:hover': {
                                                    color: 'var( --icon-hover)',
                                                },
                                            }}
                                            onClick={handleAddProductToWishList}
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
                                        onClick={handleNavigateToProductDetails}
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
        </Box>
    );
}
