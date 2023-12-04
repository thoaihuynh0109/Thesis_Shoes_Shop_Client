import React, { useState } from 'react';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import PayPalMethod from './PayPal/PayPalMethod';

function PaymentStep({ onSelectPaymentMethod }) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if a payment method is selected
        if (!selectedPaymentMethod) {
            // If no payment method is selected, show an error message
            setShowErrorMessage(true);
        } else {
            // Pass the selected payment method to the parent component
            onSelectPaymentMethod(selectedPaymentMethod);

            // // Simulate an asynchronous action (e.g., API call)
            // try {
            //     await new Promise((resolve) => setTimeout(resolve, 2500));

            //     // Call the callback for order success
            // } catch (error) {
            //     console.error('Error during async action:', error);
            //     // Handle error, show error message, etc.
            // }
        }
    };

    const handleSelectPaymentMethod = (selectedMethod) => {
        // Check if a payment method is selected
        if (!selectedMethod) {
            // If no payment method is selected, show an error message
            setShowErrorMessage(true);
        } else {
            // Pass the selected payment method to the parent component
            onSelectPaymentMethod(selectedMethod);

            // You can also log the selected payment method
            console.log('Selected Payment Method:', selectedMethod);
        }
    };

    const handleCloseErrorMessage = () => {
        setShowErrorMessage(false);
    };

    return (
        <Box>
            <CustomTypography sx={{ textTransform: 'capitalize', fontSize: '16px' }}>
                Chọn phương thức thanh toán
            </CustomTypography>
            <Box>
                <Box sx={{ ml: 10 }}>
                    <form onSubmit={handleSubmit}>
                        <RadioGroup
                            aria-label="payment-method"
                            name="payment-method"
                            value={selectedPaymentMethod}
                            onChange={(event) => {
                                handlePaymentMethodChange(event);
                                handleSelectPaymentMethod(event.target.value);
                            }}
                        >
                            <FormControlLabel
                                value="COD"
                                control={<Radio size="medium" />}
                                defaultChecked
                                label={
                                    <img
                                        src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1701186085/Gimme-shoes-images/Logo/cod-logo_o2ek2f.webp"
                                        alt="COD Logo"
                                        width={'100px'}
                                        height={'80px'}
                                    />
                                }
                            />
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
                        </RadioGroup>
                    </form>

                    {/* Conditionally render UI based on the selected payment method */}
                    <Box sx={{ cursor: 'pointer' }}>
                        {selectedPaymentMethod === 'COD' && (
                            <ToastMessage2
                                message={toastMessage}
                                type={typeMessage}
                                showToast={showToast}
                                setShowToast={setShowToast}
                            />
                        )}

                        {selectedPaymentMethod === 'paypal' && <PayPalMethod />}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default PaymentStep;
