import React, { useState } from 'react';
import { Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import TestPagination from './Pagination/WomenShopPage';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

function Women() {
    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4, ml: 4 }}>
            <CustomTypography sx={{ fontSize: '28px', fontWeight: 'bold' }}>
                Women Shop Page
            </CustomTypography>
            <MakeUIForWomenPage />
            <TestPagination />
        </Box>
    );
}

export default Women;

function MakeUIForWomenPage() {
    return (
        <Box>
            <CustomTypography>Featured</CustomTypography>
            <Box
                sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box borderRadius={'10px'}>
                            <img
                                src={
                                    'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700285598/Gimme-shoes-images/Men-Shop-Page/adidas-sneakers.jpg'
                                }
                                alt={'Adidas '}
                                height="500px"
                                width="90%"
                                style={{ borderRadius: '10px' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box borderRadius={'10px'}>
                            <img
                                src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1700285597/Gimme-shoes-images/Men-Shop-Page/men-nike-air-max.webp"
                                alt="Nike "
                                height="500px"
                                width="90%"
                                style={{ borderRadius: '10px' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
