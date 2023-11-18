import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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

const cx = classNames.bind(styles);
function GimmeMenu() {
    // show search field when user hover the pointer to search icon
    const [isSearchHovered, setIsSearchHovered] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    // Function to handle adding items to the cart
    const handleAddToCart = () => {
        setCartItemsCount((prevCount) => prevCount + 1);
    };

    const handleSearchHover = () => {
        setIsSearchHovered(true);
    };

    const handleSearchHoverExit = () => {
        setIsSearchHovered(false);
    };

    return (
        <Container className={cx('gimme-mainnav_wrapper')}>
            <DividerDesign />
            <Box className={cx('gimme_mainnav')} sx={{ display: 'flex', alignItems: 'center' }}>
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
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SearchAppBar />
                </Box>
                {/* <AddTC handleAddToCart={handleAddToCart} /> */}

                {/* card item */}
                <IconButton color="inherit" component={Link} to="/checkout">
                    <Badge badgeContent={cartItemsCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Box>
            <DividerDesign />
            {/* <Breadcrumbs /> */}
            <Breadcrumbs />
        </Container>
    );
}

export default GimmeMenu;

export function AddTC({ handleAddToCart }) {
    return (
        <Box>
            <Button variant="contained" fullWidth onClick={handleAddToCart}>
                <AddShoppingCartIcon sx={{ mr: 2, fontSize: '16px' }} />
                <Typography sx={{ fontSize: '14px' }}>Add to Cart</Typography>
            </Button>
        </Box>
    );
}
