import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Badge from '@mui/material/Badge';
import { Typography, Box, Stack, IconButton, Avatar, Tooltip, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DividerDesign from './DividerDesign/DividerDesign';
import Breadcrumbs from '~/components/BreadCrumb/BreadCrumb';
import styles from './GimmeMenu.module.scss';
import '~/components/GlobalStyles';
import SearchAppBar from './SearchDesgin';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';

const cx = classNames.bind(styles);

// desgin tool tip
const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

function GimmeMenu() {
    const location = useLocation();
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const totalProductsInCart = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleSearchHover = () => {
        setIsSearchHovered(true);
    };

    const handleSearchHoverExit = () => {
        setIsSearchHovered(false);
    };

    const isLinkActive = (path) => location.pathname === path;

    const handleCartIconClick = () => {
        setIsCartPopupOpen(true);
    };

    const handleCloseCartPopup = () => {
        setIsCartPopupOpen(false);
    };

    return (
        <Box className={cx('gimme-mainnav_wrapper')}>
            <DividerDesign />
            <Box
                className={cx('gimme_mainnav')}
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
                <Stack direction="row" spacing={8} className={cx('menu-list-item')}>
                    <Link
                        to="/"
                        className={cx('menu-child-item', { 'active-link': isLinkActive('/') })}
                    >
                        HOME
                    </Link>
                    <Link
                        to="/men"
                        className={cx('menu-child-item', { 'active-link': isLinkActive('/men') })}
                    >
                        MEN
                    </Link>
                    <Link
                        to="/women"
                        className={cx('menu-child-item', { 'active-link': isLinkActive('/women') })}
                    >
                        WOMEN
                    </Link>
                    <Link
                        to="/shop"
                        className={cx('menu-child-item', { 'active-link': isLinkActive('/shop') })}
                    >
                        SHOP
                    </Link>
                    <Link
                        to="/blog"
                        className={cx('menu-child-item', { 'active-link': isLinkActive('/blog') })}
                    >
                        BLOG
                    </Link>
                    <Link
                        to="/contact"
                        className={cx('menu-child-item', {
                            'active-link': isLinkActive('/contact'),
                        })}
                    >
                        CONTACT
                    </Link>
                    <Link
                        to="/order-history"
                        className={cx('menu-child-item', {
                            'active-link': isLinkActive('/order-history'),
                        })}
                    >
                        ORDER
                    </Link>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SearchAppBar />
                </Box>
                {/* card item */}
                {/* <IconButton color="inherit" component={Link} to="/checkout">
                    <Badge
                        badgeContent={
                            <Typography fontSize={'12px'}>{totalProductsInCart()}</Typography>
                        }
                        color="warning"
                    >
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </IconButton> */}
                <Tooltip title={<CartTooltip />} arrow enterTouchDelay={0} leaveTouchDelay={1500}>
                    <IconButton color="inherit" component={Link} to="/checkout">
                        <Badge
                            badgeContent={
                                <Typography fontSize={'12px'}>{totalProductsInCart()}</Typography>
                            }
                            color="warning"
                        >
                            <ShoppingCartIcon fontSize="large" />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <DividerDesign />
            <Breadcrumbs />
        </Box>
    );
}

export default GimmeMenu;
function CartTooltip() {
    const cartItems = useSelector((state) => state.cart.cartItems);

    const displayItems = cartItems.slice(0, 4); // Display only the first 4 items

    return (
        <Box>
            <Box sx={{ minWidth: '10px', minHeight: '10px' }}>
                {displayItems.length === 0 ? (
                    <EmptyCard message={'There is nothing in the cart!'} />
                ) : (
                    displayItems.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Avatar src={item.image} alt={item.title} sx={{ mr: 1 }} />
                            <CustomTypography sx={{ ml: 2, mr: 2 }}>{item.title}</CustomTypography>
                            <CustomTypography>{item.price}</CustomTypography>
                        </Box>
                    ))
                )}

                {/* show the numbers of max products in quick view for cart  */}
                {/* max value = 4 */}
                {cartItems.length > 4 && (
                    <Typography
                        variant="body2"
                        sx={{ textAlign: 'center', mt: 2, fontSize: '12px', mb: 2 }}
                    >
                        Còn {cartItems.length - 4} sản phẩm trong giỏ hàng
                    </Typography>
                )}
            </Box>
            <Button
                color="warning"
                sx={{ display: 'flex', alignItems: 'right', fontSize: '12px' }}
                variant="contained"
                component={Link}
                to="/checkout"
            >
                View Cart
            </Button>
        </Box>
    );
}
