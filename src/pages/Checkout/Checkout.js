import React from 'react';
import { Container, Box } from '@mui/material';
import EmptyCard from './EmptyCard/EmptyCard';
import ProductsInCard from '~/pages/Checkout/ProductsInCard/ProductsInCard';

function Checkout() {
    return (
        <Container>
            <ProductsInCard />
            <EmptyCard />
        </Container>
    );
}

export default Checkout;
