import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductPageForGender from '../Men/Pagination/ProductPageForGender';
import MakeUIForMenAndWomenPage from '../Men/Pagination/MakeUIForMenAndWomenPage';

function Women() {
    return (
        // <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4, ml: 5, mr: 4 }}>
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 2 }}>
            <MakeUIForMenAndWomenPage forWomen={true} />
            <ProductPageForGender selectedGender={'Female'} />
        </Box>
    );
}
export default Women;
