import React, { useState } from 'react';

import { Container } from '@mui/material';
import ProductsTable from '../Checkout/ProductsInCard/SummaryStep/SummaryStepData/ProductsTable';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import OrderDetail from './OrderDetail';

const OrderHistory = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            date: '2023-01-01',
            total: 50.0,
            items: [{ id: 101, name: 'Product A', quantity: 2 }],
        },
        // Add more orders as needed
    ]);

    return (
        <Container sx={{ minHeight: '40vh' }}>
            <CustomTypography
                sx={{
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    mt: 4,
                    mb: 4,
                }}
            >
                Order History
            </CustomTypography>
            <OrderDetail />
        </Container>
    );
};

export default OrderHistory;
