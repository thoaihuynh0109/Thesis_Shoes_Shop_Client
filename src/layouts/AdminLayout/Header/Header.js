import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Stack } from '@mui/material';

function Header() {
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Stack
                        direction={'row'}
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        <IconButton>
                            <Badge badgeContent={1} color="error" variant="dot">
                                <NotificationsIcon
                                    sx={{ width: 24, height: 24, color: '#818181' }}
                                />
                            </Badge>
                        </IconButton>
                        <Avatar
                            alt="Admin"
                            src="https://saigonpavillon.com.vn/wp-content/uploads/2022/10/avatar-cute-nam-11.jpg"
                            sx={{ marginLeft: '16px' }}
                        />
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;
