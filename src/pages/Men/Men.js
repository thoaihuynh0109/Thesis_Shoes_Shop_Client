import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductPageForGender from './Pagination/ProductPageForGender';
import MakeUIForMenAndWomenPage from './Pagination/MakeUIForMenAndWomenPage';

function Men() {
    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4, ml: 5, mr: 4 }}>
            <MakeUIForMenAndWomenPage forWomen={false} />
            <ProductPageForGender selectedGender={'Male'} />
        </Box>
    );
}
export default Men;
