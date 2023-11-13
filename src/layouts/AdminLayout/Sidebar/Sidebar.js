import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar(props) {
    // const { window } = props;
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    // const handleDrawerToggle = () => {
    //     setMobileOpen(!mobileOpen);
    // };

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link to={'/dashboard'}>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={() => handleListItemClick(0)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Dashboard"
                                primaryTypographyProps={{ fontSize: '1.6rem' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'/manage-user'}>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={() => handleListItemClick(1)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="User"
                                primaryTypographyProps={{ fontSize: '1.6rem' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'/manage-product'}>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={() => handleListItemClick(2)}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Product"
                                primaryTypographyProps={{ fontSize: '1.6rem' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'/manage-category'}>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={() => handleListItemClick(3)}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Category"
                                primaryTypographyProps={{ fontSize: '1.6rem' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to={'/manage-order'}>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 4}
                            onClick={() => handleListItemClick(4)}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Order"
                                primaryTypographyProps={{ fontSize: '1.6rem' }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
            <Typography variant="h2">Tên user</Typography>
            <Typography variant="h2">Email</Typography>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                {/* <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer> */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            {/* <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget
                </Typography>
            </Box> */}
        </Box>
    );
}

export default Sidebar;
