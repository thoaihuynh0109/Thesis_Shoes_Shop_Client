import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductPageForGender from './Pagination/ProductPageForGender';
import MakeUIForMenAndWomenPage from './Pagination/MakeUIForMenAndWomenPage';

function Men() {
    return (
        <Box sx={{ minHeight: '80vh', mt: 2, mb: 4 }}>
            <MakeUIForMenAndWomenPage forWomen={false} />
            {/* get product by Gender in database */}
            <ProductPageForGender selectedGender={'Nam'} />
            {/* <ProductPageForGender /> */}
        </Box>
    );
}
export default Men;
