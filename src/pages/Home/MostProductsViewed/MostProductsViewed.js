import React, { useState } from 'react';
import { ArrowBackIos } from '@mui/icons-material';
// import GridProducts, { ResponsiveGrid, products} from './GridProducts';
import { Box, styled, Paper, Grid, IconButton, Button, Typography, Container, Divider} from '@mui/material';
import ResponsiveViewedProducts from './GridProducts';



export default function MostProductsViewed() {
    

    return (
        <Box sx={{ mt: 10 }}>
            <ResponsiveViewedProducts/>
        </Box>
    );
}

