import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductPageForGender from '../Men/Pagination/ProductPageForGender';
import MakeUIForMenAndWomenPage from '../Men/Pagination/MakeUIForMenAndWomenPage';

function Women() {
    return (
        <Box sx={{ minHeight: '80vh', mt: 2, mb: 4 }}>
            <MakeUIForMenAndWomenPage forWomen={true} />
            <ProductPageForGender selectedGender={'Female'} />
        </Box>
    );
}
export default Women;
