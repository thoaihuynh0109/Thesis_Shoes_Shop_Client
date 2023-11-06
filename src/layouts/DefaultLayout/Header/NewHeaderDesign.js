import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, styled, Container } from '@mui/material';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { AccountCircle, Dashboard, ExitToApp, Person } from '@mui/icons-material';
import classNames from 'classnames/bind';
// import '../GlobalStyles/GlobalStyles.scss';
// import '~/Components/GlobalStyles';
import styles from './Header.module.scss';

// Icon
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
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

function NewHeaderDesign() {
    // sx={{bgcolor:'var(--header-color)'}}
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

                        <Box sx={{ ml: 2 }}>
                            <UserAuthenticated />
                        </Box>
                    </Box>
                </Toolbar>{' '}
                {/* Corrected component name */}
            </Container>
        </AppBar>
    );
}

export default NewHeaderDesign;

const settings = [
    { label: 'Profile', icon: <Person /> },
    { label: 'Change Password', icon: <PasswordIcon /> },
    { label: 'Dashboard', icon: <Dashboard /> },
    { label: 'Logout', icon: <ExitToApp /> },
];

function UserAuthenticated() {
    // navigate to another page. When click into lalbel of settings
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isLogoutClicked, setIsLogoutClicked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Thêm biến state isLoggedIn và khởi tạo là true

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = (setting) => {
        if (setting.label === 'Logout') {
            setIsLogoutClicked(true);
            navigate('/');
        }
        // hard code for label is Change Password
        else if (setting.label === 'Change Password') {
            navigate('/change-password'); // Điều hướng đến trang "Change Password"
        } else {
            // Điều hướng đến trang tương ứng
            navigate(`/${setting.label.toLowerCase()}`);
        }
        handleCloseUserMenu();
    };

    useEffect(() => {
        if (isLogoutClicked) {
            setIsLoggedIn(false);
            setIsLogoutClicked(false); // Đặt lại giá trị của isLogoutClicked
            window.location.reload();
        }
    }, [isLogoutClicked]);

    if (!isLoggedIn) {
        return (
            <CustomizeButton sx={{ ml: -1 }} component={Link} to="/signin" startIcon={<KeyIcon />}>
                Sign In
            </CustomizeButton>
        );
    }

    return (
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
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={() => handleLogout(setting)}>
                        <ListItemIcon>{setting.icon}</ListItemIcon>
                        <Typography textAlign="center" fontSize={'14px'} p={'0 24px 0 0'}>
                            {setting.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
