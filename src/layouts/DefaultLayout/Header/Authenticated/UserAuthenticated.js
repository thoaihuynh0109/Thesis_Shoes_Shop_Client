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

const settings = [
    { label: 'Profile', icon: <Person /> },
    { label: 'Account', icon: <AccountCircle /> },
    { label: 'Dashboard', icon: <Dashboard /> },
    { label: 'Logout', icon: <ExitToApp /> },
];

function UserAuthenticated({onLogout}) {

  const handleLogout = () => {
    onLogout(); // Gọi hàm callback onLogout từ props
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
                {settings.map((setting) => (
                  // <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                   <MenuItem key={setting.label} onClick={handleLogout}>
                  
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

export default UserAuthenticated;
