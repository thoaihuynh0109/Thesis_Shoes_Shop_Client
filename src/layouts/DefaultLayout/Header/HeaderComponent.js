import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, styled, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

// Icon
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyIcon from '@mui/icons-material/Key';
import UserAuthenticated from './Authenticated/UserAuthenticated';

const cx = classNames.bind(styles);
const CustomizeButton = styled(Button)({
    marginRight: 4,
    marginLeft: 4,
    fontSize: '14px',
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
    const user = localStorage.getItem('user');
    return (
        <AppBar position="fixed" sx={{ bgcolor: 'var(--header-color)' }}>
            <Box sx={{ ml: '54px', mr: '42px' }}>
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
                            to="/my-wishlist"
                            sx={window.scrollTo({ top: 0, behavior: 'smooth' })}
                            startIcon={<FavoriteBorderIcon />}
                        >
                            Wish List
                        </CustomizeButton>

                        <CustomizeButton
                            component={Link}
                            // to="/checkout"
                            to="/shopping-cart"
                            sx={window.scrollTo({ top: 0, behavior: 'smooth' })}
                            startIcon={<CheckCircleOutlineIcon />}
                        >
                            Checkout
                        </CustomizeButton>

                        {user ? (
                            <Box sx={{ ml: 2, mr: 2 }}>
                                <UserAuthenticated />
                            </Box>
                        ) : (
                            <CustomizeButton
                                sx={window.scrollTo({ top: 0, behavior: 'smooth' })}
                                component={Link}
                                to="/signin"
                                startIcon={<KeyIcon />}
                            >
                                Sign In
                            </CustomizeButton>
                        )}
                        {/* <Box sx={{ ml: 2 }}>
        <UserAuthenticated />
    </Box> */}
                    </Box>
                </Toolbar>{' '}
            </Box>
            {/* Corrected component name */}
        </AppBar>
    );
}

export default HeaderDesign;
