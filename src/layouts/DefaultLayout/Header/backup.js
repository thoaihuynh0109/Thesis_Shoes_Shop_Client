// source code that login into website
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    styled,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    ListItemIcon,
} from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Person, Home, FavoriteBorder, CheckCircleOutline, Key } from '@mui/icons-material';
import ResponsiveAppBar from '~/Components/Authenticated/UserAuthenticated';
import Login from '~/Components/SignIn';

import { AccountCircle, Dashboard, ExitToApp } from '@mui/icons-material';
const settings = [
    { label: 'Profile', icon: <Person /> },
    { label: 'Account', icon: <AccountCircle /> },
    { label: 'Dashboard', icon: <Dashboard /> },
    { label: 'Logout', icon: <ExitToApp /> },
];
const cx = classNames.bind(styles);
const CustomizeButton = styled(Button)({
    marginRight: 4,
    marginLeft: 4,
    fontSize: '16px',
    color: 'inherit',
    position: 'relative',
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
    '&:last-child::after': {
        display: 'none',
    },
    '&:hover': {
        color: '#e34444',
    },
});

function HeaderDesign() {
    const [signedIn, setSignedIn] = useState(true);
    const [showAvatar, setShowAvatar] = useState(true);
    const [anchorElUser, setAnchorElUser] = useState(null);

    // for guest
    const handleSignIn = () => {
        setSignedIn(true);
    };

    const handleSignOut = () => {
        setSignedIn(false);
    };

    // open menu of authenticated
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed">
            <Toolbar className={cx('custom-header')}>
                <Home fontSize="large" />

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
                    {/* <CustomizeButton component={Link} to="/my-account" startIcon={<Person />}>
                        My Account
                    </CustomizeButton> */}
                    {showAvatar ? (
                        <CustomizeButton component={Link} to="/my-account" startIcon={<Person />}>
                            My Account
                        </CustomizeButton>
                    ) : (
                        <Box sx={{ ml: 2 }}>
                            <Button onClick={handleSignIn}>Sign In</Button>
                        </Box>
                    )}
                    <CustomizeButton
                        component={Link}
                        to="/my-wishlist"
                        startIcon={<FavoriteBorder />}
                    >
                        Wish List
                    </CustomizeButton>

                    <CustomizeButton
                        component={Link}
                        to="/checkout"
                        startIcon={<CheckCircleOutline />}
                    >
                        Checkout
                    </CustomizeButton>

                    {signedIn ? (
                        <>
                            {ResponsiveAppBar ? (
                                <Box sx={{ ml: 2 }}>
                                    {/* Hide the UserAuthenticated component when signed in */}
                                    {/* <ResponsiveAppBar /> */}
                                    <Button onClick={handleSignOut}>Sign Out</Button>
                                </Box>
                            ) : (
                                <Box sx={{ ml: 2 }}>
                                    <Button onClick={handleSignIn}>Sign In</Button>
                                </Box>
                            )}
                        </>
                    ) : (
                        <Box sx={{ ml: 2 }}>
                            {/* Show the UserAuthenticated component when not signed in */}
                            {ResponsiveAppBar ? (
                                // <ResponsiveAppBar />
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar
                                                alt="Rengoku Last Smile"
                                                src="https://i.ytimg.com/vi/nvU8y-bo3i4/maxresdefault.jpg"
                                            />
                                        </IconButton>
                                    </Tooltip>

                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted7845
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem
                                                key={setting.label}
                                                onClick= {
                                                    setting.label === 'Logout'
                                                        ? handleSignIn
                                                        : handleCloseUserMenu
                                                }
                                            >
                                                <ListItemIcon>{setting.icon}</ListItemIcon>
                                                <Typography
                                                    textAlign="center"
                                                    fontSize={'14px'}
                                                    p={'0 24px 0 0'}
                                                >
                                                    {setting.label}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            ) : (
                                <Login />
                            )}
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderDesign;
