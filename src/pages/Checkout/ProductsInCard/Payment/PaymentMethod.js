import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import CreditCard from './CreditCard/CreditCard';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Paypal from './PayPal/PayPal';
// Separate UI components for each payment method

function PaypalUI() {
    const [checkout, setCheckOut] = useState(false);
    return (
        <Box>
            {checkout ? (
                <Paypal />
            ) : (
                <button
                    onClick={() => {
                        setCheckOut(true);
                    }}
                >
                    Checkout
                </button>
            )}
        </Box>
    );
}

const CashOnDeliveryUI = () => <Box>UI for Cash On Delivery</Box>;

const PaymentMethod = ({ onSelectPaymentMethod }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass the selected payment method to the parent component
        onSelectPaymentMethod(selectedPaymentMethod);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                >
                    <FormControlLabel value="credit-card" control={<Radio />} label="Credit Card" />
                    <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                    <FormControlLabel value="COD" control={<Radio />} label="Cash On Delivery" />
                    {/* Add more payment methods as needed */}
                </RadioGroup>

                <Button type="submit" variant="contained" color="primary">
                    Continue
                </Button>
            </form>

            {/* Conditionally render UI based on the selected payment method */}
            {selectedPaymentMethod === 'credit-card' && <CreditCard />}
            {selectedPaymentMethod === 'paypal' && <PaypalUI />}
            {selectedPaymentMethod === 'COD' && <CashOnDeliveryUI />}
        </Box>
    );
};

export default PaymentMethod;
