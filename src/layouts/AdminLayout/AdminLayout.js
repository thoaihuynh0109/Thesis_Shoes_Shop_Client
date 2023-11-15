import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import './AdminLayout.module.scss';
import { Box, Container } from '@mui/material';

function AdminLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <Sidebar></Sidebar>
            <Box
                sx={{
                    padding: '64px 0px 64px 240px',
                    width: '100%',
                    overflow: 'auto',
                }}
            >
                <Container sx={{ paddingTop: '64px', margin: 0 }} maxWidth="false">
                    {children}
                </Container>
            </Box>
        </div>
    );
}

export default AdminLayout;
