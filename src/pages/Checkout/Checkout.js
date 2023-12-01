import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import EmptyCard from './EmptyCard/EmptyCard';
import ProductsInCard from '~/pages/Checkout/ProductsInCard/ProductsInCard';

function Checkout() {
    const [checked, setChecked] = useState(true);
    return (
        <Box sx={{ mt: 2 }}>
            {checked ? <ProductsInCard /> : <EmptyCard text={'Your shopping cart is empty.'} />}
        </Box>
    );
}

export default Checkout;
