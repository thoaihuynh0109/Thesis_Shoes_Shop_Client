import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, styled, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

// Icon
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyIcon from '@mui/icons-material/Key';


const cx = classNames.bind(styles);
const CustomizeButton = styled(Button)({
    marginRight: 4,
    marginLeft: 4,
    fontSize: '16px',
    color: 'inherit',
    position: 'relative',
    // make divider
    '&::after': {
        content: "''",
        position: 'absolute',
        top: '50%',
        right: '-4px',
        transform: 'translateY(-50%)',
        width: '1px',
        height: '80%',
        backgroundColor: '#474747',
    },

    // hide the last divider
    '&:last-child::after': {
        display: 'none',
    },
    '&:hover': {
        color: '#e34444',
    },
});

function HeaderDesign() {
    return (
        <AppBar position="fixed" sx={{ bgcolor: 'var(--header-color)' }}>
            <Container>
                <Toolbar className={cx('custom-header')}>
                    <HomeIcon fontSize="large"></HomeIcon>

                    <Typography
                        variant="h5"
                        sx={{ flexGrow: 1, fontSize: '16px' }}
                        paddingLeft={2}
                        align="left"
                        className={cx('running-text')}
                    >
                        <span>GIMME STORE</span>
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CustomizeButton
                            component={Link}
                            to="/my-account"
                            startIcon={<PersonIcon />}
                        >
                            My Account
                        </CustomizeButton>

                        <CustomizeButton
                            component={Link}
                            to="/my-wishlist"
                            startIcon={<FavoriteBorderIcon />}
                        >
                            Wish List
                        </CustomizeButton>

                        <CustomizeButton
                            component={Link}
                            to="/checkout"
                            startIcon={<CheckCircleOutlineIcon />}
                        >
                            Checkout
                        </CustomizeButton>

                        <CustomizeButton component={Link} to="/signin" startIcon={<KeyIcon />}>
                            Sign In
                        </CustomizeButton>
                        {/* <Box sx={{ ml: 2 }}>
        <UserAuthenticated />
    </Box> */}
                    </Box>
                </Toolbar>{' '}
            </Container>
            {/* Corrected component name */}
        </AppBar>
    );
}

export default HeaderDesign;
