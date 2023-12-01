import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { CustomTypography, CustomizeButton } from '~/Layouts/DefaultLayout';

import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';

function NewArrivals() {
    return (
        <Box
            sx={{
                display: 'flex',
                border: '1px solid #f0f0f0',
                alignItems: 'start',
                bgcolor: '#f0f0f0',
                borderRadius: '10px',
                mt: '4px',
            }}
        >
            <Box sx={{ flexGrow: 1, padding: '0 100px', objectFit: 'contain' }}>
                <img
                    src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1698238037/Gimme-shoes-images/New%20Balance/Fresh_Foam_X_More_Trail_v3.jgp_u65qgy.webp"
                    alt="New Arrivals"
                    height="380px"
                    width="360px"
                    o
                    // height="50%"
                    // width="50%"
                />
            </Box>
            <Box sx={{ flexGrow: 1, marginRight: '50px', mt: '35px' }}>
                <CustomTypography
                    variant="h2"
                    sx={{ fontSize: '24px', fontWeight: 'bold' }}
                    gutterBottom
                >
                    Fresh Foam X More Trail v3
                </CustomTypography>
                <CustomTypography variant="body2" sx={{ fontSize: '20px' }} gutterBottom>
                    New Products
                </CustomTypography>
                <CustomTypography
                    variant="body2"
                    sx={{ fontSize: '16px', textAlign: 'justify' }}
                    gutterBottom
                >
                    Whether you're hitting the trails for training or just to enjoy the scenery, you
                    can keep your feet cool, comfortable and cushioned with the New Balance Fresh
                    Foam X More Trail v3. This trail running shoe includes a synthetic/mesh upper
                    for breathability, and a two-part Fresh Foam X midsole for exceptional comfort.
                    Also featuring Toe Protect technology and our highest all-terrain stack height,
                    these shoes help keep your feet protected from debris, no matter where you roam.
                </CustomTypography>
                {/* Need to href somewhere? */}
                <CustomizeButton variant="contained" sx={{ mt: 8 }}>
                    Buy Now
                </CustomizeButton>
            </Box>
        </Box>
    );
}

export default NewArrivals;
