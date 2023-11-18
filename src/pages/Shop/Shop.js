import React, { useState } from 'react';

import { Box } from '@mui/material';

import TestProductPagination from './Pagination/TestProductPagination';

function Shop() {
    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4, ml: 4 }}>
            <TestProductPagination />
        </Box>
    );
}

export default Shop;
