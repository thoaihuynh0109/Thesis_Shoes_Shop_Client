import React from 'react';
import { Box, Typography } from '@mui/material';
function Blog() {
    return (
        <Box
            sx={{
                minHeight: '80vh',
            }}
        >
            <Box
                sx={{
                    mt: 2,
                    backgroundImage: `url('https://react-coming-soon.maksv.me/default-image.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px #333',
                }}
            >
                <Typography sx={{ color: 'white', fontSize: '20px', mt: 2, fontWeight: 'bold' }}>
                    Comming Soon
                </Typography>
                <Typography sx={{ color: 'white', fontSize: '20px', mt: 2, fontWeight: 'bold' }}>
                    We are getting ready to launch a new CREATIVE site!
                </Typography>
            </Box>
        </Box>
    );
}

export default Blog;
