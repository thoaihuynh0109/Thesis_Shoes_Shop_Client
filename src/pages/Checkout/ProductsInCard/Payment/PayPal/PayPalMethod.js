import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Button, Typography } from '@mui/material';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import PayPalCheckoutButton from './PayPalCheckoutButton';
// Separate UI components for each payment method

export default function PayPalMethod() {
    const product = {
        description: 'Desgin PayPal',
        price: 990,
    };
    return (
        <Box>
            <Typography sx={{ mt: 2, fontSize: '16px', fontWeight: 'bold', mb: 2 }}>
                Pay with PayPal
            </Typography>
            <Box>
                <PayPalCheckoutButton product={product}></PayPalCheckoutButton>
            </Box>
        </Box>
    );
}
