import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Stack } from '@mui/material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

function Header() {
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${240}px)` },
                    ml: { sm: `${240}px` },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <CustomTypography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ fontSize: ' 1.6rem' }}
                        >
                            Responsive drawer
                        </CustomTypography>
                    </div>

                    <Stack
                        direction={'row'}
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        <NotificationsIcon fontSize="large" sx={{ width: 24, height: 24 }} />
                        <Avatar
                            alt="Remy Sharp"
                            src=""
                            sx={{ width: 40, height: 40, marginLeft: 2 }}
                        />
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;
