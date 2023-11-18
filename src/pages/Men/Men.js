import React, { useState } from 'react';
import { Box } from '@mui/material';

import TestPagination from './Pagination/MenShopPage';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

function Women() {
    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4, ml: 4 }}>
            <CustomTypography sx={{ fontSize: '28px', fontWeight: 'bold' }}>
                Women Shop Page
            </CustomTypography>
            <TestPagination />
        </Box>
    );
}

export default Women;
