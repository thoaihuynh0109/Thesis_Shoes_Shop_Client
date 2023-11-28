import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
function PayPalCheckoutButton(props) {
    const { product } = props;
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        // call backend function to fulfill the order
        // if respone is success

        setPaidFor(true);
        // refresh users's account or subscription status
    };

    // paid successfully
    if (paidFor) {
        alert('Thank you for purchase');
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }

    return (
        <PayPalButtons
            style={{
                color: 'silver',
                layout: 'horizontal',
                minHeight: 48,
                width: '200px',
                tagLine: false,
                shape: 'pill',
            }}
            onClick={(data, actions) => {
                // Validate on button click, client or server side
                const hasAlreadyBoughtCourse = false;

                if (hasAlreadyBoughtCourse) {
                    setError(
                        'You already bought this course. Go to your account to view your list of courses.',
                    );

                    return actions.reject();
                } else {
                    return actions.resolve();
                }
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                value: product.price,
                            },
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log('order', order);

                handleApprove(data.orderID);
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.error('PayPal Checkout onError', err);
            }}
        />
    );
}

export default PayPalCheckoutButton;
