import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Typography, Button, Box, Container, Stack, IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    Search as SearchIcon,
    ShoppingCartOutlined as ShoppingCartIcon,
} from '@mui/icons-material';
import DividerDesign from './DividerDesign/DividerDesign';
import Breadcrumbs from '~/components/BreadCrumb/BreadCrumb';
import styles from './GimmeMenu.module.scss';
import '~/components/GlobalStyles';
import SearchAppBar from './SearchDesgin';

const cx = classNames.bind(styles);
function GimmeMenu() {
    // show search field when user hover the pointer to search icon
    const [isSearchHovered, setIsSearchHovered] = useState(false);

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

                {/* card item */}
                <IconButton color="inherit" component={Link} to="/checkout">
                    <Badge badgeContent={0} color="error">
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
