import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { FavoriteSharp } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MakeProductSize from './MakeProductSize';
import RatingProductInformation from './RatingProduct';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

function ProductInformation({ flashSale }) {
    const productDetail = useSelector((state) => state.productDetail.productDetails);

    if (!productDetail) {
        // If productDetail is null, you can return a loading state or an empty component
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '550px',
                pl: 12,
                ml: 8,
                pr: 12,
                overflow: 'scroll',
            }}
            key={productDetail._id}
        >
            {/* product name */}
            {/* <img src={productDetail.image}/> */}
            <CustomTypography sx={{ fontWeight: '600', fontSize: 17, mt: 2 }}>
                {productDetail.name}
            </CustomTypography>
            {/* for who? */}

            {/* không lấy được gender */}
            {/* <CustomTypography>{productDetail.gender}'s Shoes</CustomTypography> */}

            {/* <CustomTypography>Men's Shoes</CustomTypography> */}
            {/* original price and sale price */}
            <Box sx={{ display: 'flex', mr: 4, mt: 2 }}>
                {/* amount is reduced */}
                <CustomTypography sx={{ mr: 1 }}>{productDetail.price}</CustomTypography>

                {/* original price */}
                {/* {flashSale ? (
                    <CustomTypography sx={{ textDecoration: 'line-through', color: '#333' }}>
                        {' '}
                        4,259,000₫
                    </CustomTypography>
                ) : (
                    <Typography></Typography>
                )} */}
            </Box>
            {/*  make size */}
            <CustomTypography sx={{ fontWeight: 'bold', mt: 2, mb: '4px' }}>
                Select Size
            </CustomTypography>
            <Box sx={{ maxWidth: '300px' }}>
                <MakeProductSize />
            </Box>
            {/* add to wish list */}
            <Box sx={{ mt: 4, mx: 4, minWidth: 40, width: '50%' }}>
                <Button
                    startIcon={<FavoriteSharp />}
                    variant="contained"
                    sx={{ borderRadius: '20px', width: '100%' }}
                >
                    <Typography sx={{ fontSize: '13px', p: '4px 8px' }}>Add to Favorite</Typography>
                </Button>
            </Box>

            {/* add to add to cart */}
            <Box sx={{ mt: 3, mb: 2, mx: 4, minWidth: 40, width: '50%' }}>
                <Button
                    startIcon={<AddShoppingCartIcon />}
                    variant="outlined"
                    sx={{ borderRadius: '20px', width: '100%' }}
                >
                    <Typography sx={{ fontSize: '13px', p: '6px 8px' }}>Add to Cart</Typography>
                </Button>
            </Box>

            {/* product description */}
            <Box sx={{ maxWidth: '300px', mb: 2, textAlign: 'justify' }}>
                <CustomTypography>
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
