import React, { useState } from 'react';

import { Box } from '@mui/material';

import TestProductPagination from './Pagination/TestProductPagination';

function Shop() {
    return (
        // <Box sx={{ flexGrow: 1, mt: 4, ml: 4 }}>
        <Box sx={{ flexGrow: 1, mt: 4 }}>
            <TestProductPagination />
        </Box>
    );
}

export default Shop;
