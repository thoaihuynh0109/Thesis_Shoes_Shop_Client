import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Button, Typography } from '@mui/material';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { useDispatch, useSelector } from 'react-redux';
import PayPalCheckoutButton from './PayPalCheckoutButton';
// Separate UI components for each payment method

export default function PayPalMethod() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showToast, setShowToast] = useState(false);
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    // message for after ordering
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const tax = 8.75;
    const getTotalPrice = () => {
        // Assuming the current currency is VND and you want to convert it to USD
        const exchangeRate = 24300; // Replace with your actual exchange rate

        const totalPriceVND = cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price.replace(/,/g, '')) * item.quantity;
            return total + itemPrice;
        }, 0);

        console.log('Price in VND:', totalPriceVND);
        const totalWithTaxVND = totalPriceVND * (1 + tax / 100);
        console.log('Price with Tax:', totalWithTaxVND);
        // Convert totalPriceVND to USD
        const totalPriceUSD = (totalWithTaxVND / exchangeRate).toFixed(2);
        console.log('Price in USD:', totalPriceUSD);
        return totalPriceUSD;
    };

    // paid successfully
    if (paidFor) {
        // Set showToast to true to display the toast
        setShowToast(true);
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        setShowToast(true);
    }

    const product = {
        description: 'Checkout at Gimme Stores',
        price: getTotalPrice(),
    };
    return (
        <Box>
            <Typography sx={{ mt: 2, fontSize: '16px', fontWeight: 'bold', mb: 2 }}>
                Pay with PayPal
            </Typography>
            <Box>
                <PayPalCheckoutButton product={product}></PayPalCheckoutButton>
            </Box>
        </Box>
    );
}
