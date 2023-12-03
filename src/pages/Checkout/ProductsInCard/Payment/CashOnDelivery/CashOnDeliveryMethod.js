import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Button, Typography } from '@mui/material';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import SummaryStep from '../../SummaryStep';

// Separate UI components for each payment method

function CashOnDeliveryMethod() {
    return <Box sx={{ mb: 2, mt: 4, ml: 2 }}>{/* <SummaryStep></SummaryStep> */}</Box>;
}

export default CashOnDeliveryMethod;
