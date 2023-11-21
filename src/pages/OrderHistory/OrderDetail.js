import React from 'react';

const OrderDetail = ({ items }) => {
    return (
        <div>
            <h4>Order Details</h4>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderDetail;
