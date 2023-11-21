import React, { useState } from 'react';
import Order from './Order';

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
        <div>
            <h2>Order History</h2>
            {orders.map((order) => (
                <Order key={order.id} order={order} />
            ))}
        </div>
    );
};

export default OrderHistory;
