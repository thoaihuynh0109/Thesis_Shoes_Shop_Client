import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductPageForGender from './Pagination/ProductPageForGender';
import MakeUIForMenAndWomenPage from './Pagination/MakeUIForMenAndWomenPage';

function Men() {
    return (
        // <Box sx={{ minHeight: '50vh', mt: 4, ml: 5, mr: 4 }}>
        <Box sx={{ minHeight: '50vh', mt: 2 }}>
            <MakeUIForMenAndWomenPage forWomen={false} />
            <ProductPageForGender selectedGender={'Male'} />
        </Box>
    );
}
export default Men;
