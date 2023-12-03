import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { useDispatch, useSelector } from 'react-redux';

function PayPalCheckoutButton(props) {
    const { product } = props;
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const handleApprove = (orderId) => {
        // call backend function to fulfill the order
        // if respone is success

        // setPaidFor(true);
        setShowToast(true);
        // refresh users's account or subscription status
    };

    return (
        <>
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
                    setShowToast(true);
                    setToastMessage('Order Successfully!!!');
                    setTypeMessage('success');
                    handleApprove(data.orderID);
                }}
                onCancel={() => {}}
                onError={(err) => {
                    setError(err);
                    setShowToast(true);
                    setToastMessage('There Is No Product To Checkout!!!');
                    setTypeMessage('warning');
                    console.error('PayPal Checkout onError', err);
                }}
            />
            <ToastMessage2
                message={toastMessage}
                type={typeMessage}
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </>
    );
}

export default PayPalCheckoutButton;
