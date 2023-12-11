import React, { useState, useEffect, useRef } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Button, Typography } from '@mui/material';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { useNavigate } from 'react-router-dom';
import orderService from '~/services/orderServices';
// import PayPalCheckoutButton from './PayPalCheckoutButton';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '~/redux/CartManagement/cartActions';
// // Separate UI components for each payment method

export default function PayPalMethod() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('user')) || '';

    const cartItems = useSelector((state) => state.cart.cartItems);

    const tax = 2;

    const getTotalPriceVND = () => {
        const totalPriceVND = cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price.replace(/,/g, '')) * item.quantity;
            return total + itemPrice;
        }, 48600);
        return totalPriceVND;
    };
    const getTotalPrice = () => {
        // Assuming the current currency is VND and you want to convert it to USD
        const exchangeRate = 24300; // Replace with your actual exchange rate

        const totalPriceVND = cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price.replace(/,/g, '')) * item.quantity;
            return total + itemPrice;
        }, 48600);

        // console.log('Price in VND:', totalPriceVND);
        // const totalWithTaxVND = totalPriceVND * (1 + tax / 100);
        const totalWithTaxVND = Math.ceil((totalPriceVND * (1 + tax / 100)) / 1000) * 1000;
        // console.log('Price VND with Tax:', totalWithTaxVND.toLocaleString());

        // Convert totalPriceVND to USD
        const totalPriceUSD = (totalWithTaxVND / exchangeRate).toFixed(2);
        // console.log('Price in USD:', totalPriceUSD);
        return totalPriceUSD;
    };

    // get user data from local storage
    // Fetch user data from local storage

    // creates a paypal order
    const createOrder = (data, actions) => {
        console.log(user);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: getTotalPrice(),
                    },

                    owner: user._id,

                    totalAmount: getTotalPrice(),
                    paymentMethod: 'paypal',
                    shippingFee: 48600,
                    status: 'processing',
                },
            ],
        });
    };

    // check Approval
    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        handleSubmitOrder();
        console.log('order', order);
        console.log('data', data);

        setShowToast(true);
        setToastMessage('Thanks so much for your order by PayPal!');
        setTypeMessage('success');
        // handleApprove(data.orderID);
    };

    //capture likely error
    const onError = (data, actions) => {
        console.error('An error occurred with the PayPal payment:', data);
        // Handle the error, display an error message, etc.
    };

    // tiến hành thanh toán
    const handleSubmitOrder = async () => {
        // Check if a payment method is selected

        const order = {
            owner: user._id,
            items: cartItems.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.size,
                images: item.images,
            })),
            totalAmount: getTotalPriceVND(),
            paymentMethod: 'paypal',
            shippingFee: 48600,
            status: 'processing',
        };

        console.log('information of order by PAYPAL: ', order);
        try {
            const checkoutOrder = await orderService.createOrder(order);
            console.log('checkoutOrder: ', checkoutOrder);
            if (checkoutOrder.status === 201) {
                // Order paypal thành công
                dispatch(removeCart());
                console.log('order paypal thành công');
                // sau khi order thành công thì phải xóa cart đi

                // after 2,5s clicking order button will redirect to '/' Home
                setTimeout(() => {
                    navigate('/');
                }, 2500);
                // Check if the selected payment method is Cash On Delivery
            }
        } catch (error) {
            console.error('Error during order creation:', error);
            // Xử lý lỗi, hiển thị thông báo lỗi, v.v.
        }
    };

    return (
        <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <Box sx={{ ml: '132px', width: '600px' }}>
                <Typography sx={{ mt: 2, fontSize: '16px', fontWeight: 'bold', mb: 2 }}>
                    Pay with PayPal
                </Typography>
                <Box>
                    {/* <PayPalCheckoutButton product={product}></PayPalCheckoutButton> */}
                    <PayPalButtons
                        style={{ layout: 'vertical' }}
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                    ></PayPalButtons>
                </Box>
            </Box>
            <ToastMessage2
                message={toastMessage}
                type={typeMessage}
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </PayPalScriptProvider>
    );
}
