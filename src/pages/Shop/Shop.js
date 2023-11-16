import React, { useState } from 'react';
import { styled, Box, Paper, Grid, Typography, Divider, IconButton } from '@mui/material';

import TestPagination from './Pagination/TestProductPagination';

function Shop() {
    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4, ml: 4 }}>
            <TestPagination />
        </Box>
    );
}

export default Shop;
