import React, { useState } from 'react';
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    ListItemIcon,
} from '@mui/material';
import { AccountCircle, Dashboard, ExitToApp, Person } from '@mui/icons-material';
import authService from '~/services/authServices';
import { useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import { useDispatch } from 'react-redux';
import { removeUser } from '~/redux/User/userSlice';

// const settings = [
//     { label: 'Profile', icon: <Person /> },
//     { label: 'Account', icon: <AccountCircle /> },
//     { label: 'Dashboard', icon: <Dashboard /> },
//     { label: 'Logout', icon: <ExitToApp /> },
// ];

function UserAuthenticated() {
    const dispatch = useDispatch();
    const user = localStorage.getItem('user') || {};
    const dataUser = JSON.parse(user);
    const isAdmin = dataUser.isAdmin;

    const navigate = useNavigate();
    const handleLogout = async () => {
        // call api  to logout
        await authService.logout(dataUser);
        // delete data from local storage
        // localStorage.removeItem('user');
        dispatch(removeUser());

        navigate('/signin');
    };

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                {user && isAdmin ? (
                    <MenuItem
                        onClick={() => {
                            navigate('/dashboard');
                            handleCloseUserMenu();
                        }}
                    >
                        <ListItemIcon>
                            <Dashboard fontSize="large" />
                        </ListItemIcon>
                        <Typography
                            textAlign="center"
                            fontSize={'14px'}
                            p={'0 24px 0 0'}
                            sx={{ ml: 2 }}
                        >
                            Dashboard
                        </Typography>
                    </MenuItem>
                ) : (
                    console.log(dataUser)
                )}
                <MenuItem
                    onClick={() => {
                        navigate('/profile');
                        //close menu after user chooses
                        handleCloseUserMenu();
                        // console.log('user _id: ', dataUser._id);
                        // navigate('/profile', { state: { user: dataUser._id } });
                    }}
                >
                    <ListItemIcon>
                        <Person fontSize="large" />
                    </ListItemIcon>
                    <Typography
                        textAlign="center"
                        fontSize={'14px'}
                        p={'0 24px 0 0'}
                        sx={{ ml: 2 }}
                    >
                        Profile
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        navigate('/change-password');
                        handleCloseUserMenu();
                    }}
                >
                    <ListItemIcon>
                        <AccountCircle fontSize="large" />
                    </ListItemIcon>
                    <Typography
                        textAlign="center"
                        fontSize={'14px'}
                        p={'0 24px 0 0'}
                        sx={{ ml: 2 }}
                    >
                        Change Password
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        navigate('/order-history');
                        handleCloseUserMenu();
                    }}
                >
                    <ListItemIcon>
                        <HistoryIcon fontSize="large" />
                    </ListItemIcon>
                    <Typography
                        textAlign="center"
                        fontSize={'14px'}
                        p={'0 24px 0 0'}
                        sx={{ ml: 2 }}
                    >
                        Order
                    </Typography>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToApp fontSize="large" />
                    </ListItemIcon>
                    <Typography
                        textAlign="center"
                        fontSize={'14px'}
                        p={'0 24px 0 0'}
                        sx={{ ml: 2 }}
                    >
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default UserAuthenticated;
