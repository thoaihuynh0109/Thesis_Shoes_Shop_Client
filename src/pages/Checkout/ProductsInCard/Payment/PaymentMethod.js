import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Button, Typography } from '@mui/material';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import CashOnDeliveryMethod from './CashOnDelivery/CashOnDeliveryMethod';
import PayPalMethod from './PayPal/PayPalMethod';
import Paypal from './PayPal/PayPal';
// Separate UI components for each payment method

const PaymentMethod = ({ onSelectPaymentMethod }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass the selected payment method to the parent component
        onSelectPaymentMethod(selectedPaymentMethod);

        // Log the selected payment method to the console
        console.log('Selected Payment Method:', selectedPaymentMethod);
    };

    return (
        <Box sx={{ ml: 2 }}>
            <form onSubmit={handleSubmit}>
                <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                >
                    <FormControlLabel
                        value="paypal"
                        control={<Radio size="medium" />}
                        label={
                            <img
                                src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1701186085/Gimme-shoes-images/Logo/PayPal-Logo-png_wabrm3.png"
                                alt="PayPal Logo"
                                width={'100px'}
                            />
                        }
                    />
                    <FormControlLabel
                        value="cod"
                        control={<Radio size="medium" />}
                        label={
                            <img
                                src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1701186085/Gimme-shoes-images/Logo/cod-logo_o2ek2f.webp"
                                alt="COD Logo"
                                width={'100px'}
                                height={'80px'}
                            />
                        }
                    />
                    {/* Add more payment methods as needed */}
                </RadioGroup>

                {/* <Button type="submit" variant="contained" color="primary">
                    Continue
                </Button> */}
            </form>

            {/* Conditionally render UI based on the selected payment method */}
            <Box sx={{ cursor: 'pointer' }}>
                {selectedPaymentMethod === 'paypal' && <PayPalMethod />}
                {/* {selectedPaymentMethod === 'paypal' && <Paypal />} */}
                {selectedPaymentMethod === 'cod' && <CashOnDeliveryMethod />}
            </Box>
        </Box>
    );
};

export default PaymentMethod;
