import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { FavoriteSharp } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MakeProductSize from './MakeProductSize';
import RatingProductInformation from './RatingProduct';

// make product description
function CustomTypography({ children, ...rest }) {
    return (
        <Box component="span" {...rest}>
            {children}
        </Box>
    );
}

function ProductInformation({ flashSale }) {
    return (
        <Box
            sx={{
                width: '100%',
                height: '550px',
                pl: 12,
                pr: 12,
                // bgcolor: 'yellowgreen',
                overflow: 'scroll',
            }}
        >
            {/* product name */}
            <CustomTypography sx={{ fontWeight: '600', fontSize: 17, mt: 2 }}>
                Jordan 1 Low Alt
            </CustomTypography>
            {/* for who? */}
            <CustomTypography>Men's Shoes</CustomTypography>
            {/* originial price and sale price */}
            <Box sx={{ display: 'flex', mr: 4 }}>
                {/* amount is reduced */}
                <CustomTypography sx={{ mr: 1 }}>3,620,149₫</CustomTypography>

                {/* original price */}
                {flashSale ? (
                    <CustomTypography sx={{ textDecoration: 'line-through', color: '#333' }}>
                        {' '}
                        4,259,000₫
                    </CustomTypography>
                ) : (
                    <Typography></Typography>
                )}
            </Box>
            {/*  make size */}
            <CustomTypography sx={{ fontWeight: 'bold', mt: 2, mb: '4px' }}>
                Select Size
            </CustomTypography>
            <Box sx={{ maxWidth: '300px' }}>
                <MakeProductSize />
            </Box>
            {/* add to wish list */}
            <Box sx={{ mt: 4, mx: 8, minWidth: 40, width: '50%' }}>
                <Button
                    startIcon={<FavoriteSharp />}
                    variant="contained"
                    sx={{ borderRadius: '20px', width: '100%' }}
                >
                    <CustomTypography sx={{ fontSize: '13px', p: '4px 8px' }}>
                        Add to Favorite
                    </CustomTypography>
                </Button>
            </Box>

            {/* add to add to cart */}
            <Box sx={{ mt: 3, mb: 2, mx: 8, minWidth: 40, width: '50%' }}>
                <Button
                    startIcon={<AddShoppingCartIcon />}
                    variant="outlined"
                    sx={{ borderRadius: '20px', width: '100%' }}
                >
                    <CustomTypography sx={{ fontSize: '13px', p: '6px 8px' }}>
                        Add to Cart
                    </CustomTypography>
                </Button>
            </Box>

            {/*product description  */}
            <Box sx={{ maxWidth: '300px', mb: 2 }}>
                <CustomTypography sx={{ textAlign: 'justify', lineHeight: '1.4' }}>
                    Celebrate MJ's legacy with this shout-out to Chicago's 312 area code. With
                    elements from three iconic Jordans (the AJ3, AJ1 and Air Alpha Force), it's a
                    modern mash-up that reps the best.
                </CustomTypography>
            </Box>

            {/* Reviews */}
            <Box>
                {/* amount of reviews */}
                <RatingProductInformation />
            </Box>
        </Box>
    );
}

export default ProductInformation;
