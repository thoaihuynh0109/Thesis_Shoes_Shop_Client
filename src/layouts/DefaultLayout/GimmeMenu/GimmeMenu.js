import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Badge from '@mui/material/Badge';
import { Typography, Button, Box, Container, Stack, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DividerDesign from './DividerDesign/DividerDesign';
import Breadcrumbs from '~/components/BreadCrumb/BreadCrumb';
import styles from './GimmeMenu.module.scss';
import '~/components/GlobalStyles';
import SearchAppBar from './SearchDesgin';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

const cx = classNames.bind(styles);
function GimmeMenu() {
    // show search field when user hover the pointer to search icon
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    // update the number of products in cart
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

    return (
        <Box className={cx('gimme-mainnav_wrapper')}>
            <DividerDesign />
            <Box
                className={cx('gimme_mainnav')}
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
                <Stack direction="row" spacing={8} className={cx('menu-list-item')}>
                    <Link color="inherit" component={Link} to="/" className={cx('menu-child-item')}>
                        HOME
                    </Link>
                    <Link
                        color="inherit"
                        component={Link}
                        to="/men"
                        className={cx('menu-child-item')}
                    >
                        MEN
                    </Link>

                    <Link
                        color="inherit"
                        component={Link}
                        to="/women"
                        className={cx('menu-child-item')}
                    >
                        WOMEN
                    </Link>
                    <Link
                        color="inherit"
                        component={Link}
                        to="/shop"
                        className={cx('menu-child-item')}
                    >
                        SHOP
                    </Link>

                    <Link
                        color="inherit"
                        component={Link}
                        to="/blog"
                        className={cx('menu-child-item')}
                    >
                        BLOG
                    </Link>
                    <Link
                        color="inherit"
                        component={Link}
                        to="/contact"
                        className={cx('menu-child-item')}
                    >
                        CONTACT{' '}
                    </Link>
                    <Link
                        color="inherit"
                        component={Link}
                        to="/order-history"
                        className={cx('menu-child-item')}
                    >
                        ORDER
                    </Link>
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SearchAppBar />
                </Box>

                {/* card item */}
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
            </Box>
            <DividerDesign />
            {/* <Breadcrumbs /> */}
            <Breadcrumbs />
        </Box>
    );
}

export default GimmeMenu;
