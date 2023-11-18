// Order.js
import React, { useState } from 'react';
import OrderDetail from './OrderDetail';

const Order = ({ order }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div>
            <div onClick={toggleDetails}>
                <p>Date: {order.date}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
            </div>
            {showDetails && <OrderDetail items={order.items} />}
        </div>
    );
};

export default Order;
