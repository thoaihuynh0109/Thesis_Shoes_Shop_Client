import React, { useState } from 'react';
import Order from './Order';
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
        <Container>
            <CustomTypography
                sx={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '24px' }}
            >
                lịch sử giao hàng
            </CustomTypography>
            <OrderDetail />
        </Container>
    );
};

export default OrderHistory;
