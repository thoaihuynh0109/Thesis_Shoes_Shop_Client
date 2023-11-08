<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
import { Container, Box } from '@mui/material';
import EmptyCard from './EmptyCard/EmptyCard';
import ProductsInCard from '~/pages/Checkout/ProductsInCard/ProductsInCard';

function Checkout() {
<<<<<<< HEAD
    return (
        <Container>
            <ProductsInCard />
            <EmptyCard />
        </Container>
    );
=======
    const [checked, setChecked] = useState(true);
    return <Container>{checked ? <ProductsInCard /> : <EmptyCard />}</Container>;
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
}

export default Checkout;
