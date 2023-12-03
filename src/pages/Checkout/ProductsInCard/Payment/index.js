import React, { useState } from 'react';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import {
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Typography,
    Snackbar, // Import Snackbar for displaying messages
} from '@mui/material';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import CashOnDeliveryMethod from './CashOnDelivery/CashOnDeliveryMethod';
import PayPalMethod from './PayPal/PayPalMethod';

// function PaymentStep({ onSelectPaymentMethod }) {
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

//     const handlePaymentMethodChange = (event) => {
//         setSelectedPaymentMethod(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Pass the selected payment method to the parent component
//         onSelectPaymentMethod(selectedPaymentMethod);
//     };

//     const handleSelectPaymentMethod = (selectedMethod) => {
//         onSelectPaymentMethod(selectedMethod);
//     };

//     return (
//         <Box>
//             <CustomTypography sx={{ textTransform: 'capitalize', fontSize: '16px' }}>
//                 Chọn phương thức thanh toán
//             </CustomTypography>
//             <Box>
//                 {/* <PaymentMethod2 onSelectPaymentMethod={handleSelectPaymentMethod} /> */}
//                 <Box sx={{ ml: 2 }}>
//                     <form onSubmit={handleSubmit}>
//                         <RadioGroup
//                             aria-label="payment-method"
//                             name="payment-method"
//                             value={selectedPaymentMethod}
//                             onChange={handlePaymentMethodChange}
//                         >
//                             <FormControlLabel
//                                 value="paypal"
//                                 control={<Radio size="medium" />}
//                                 label={
//                                     <img
//                                         src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1701186085/Gimme-shoes-images/Logo/PayPal-Logo-png_wabrm3.png"
//                                         alt="PayPal Logo"
//                                         width={'100px'}
//                                     />
//                                 }
//                             />
//                             <FormControlLabel
//                                 value="COD"
//                                 control={<Radio size="medium" />}
//                                 label={
//                                     <img
//                                         src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1701186085/Gimme-shoes-images/Logo/cod-logo_o2ek2f.webp"
//                                         alt="COD Logo"
//                                         width={'100px'}
//                                         height={'80px'}
//                                     />
//                                 }
//                             />
//                             {/* Add more payment methods as needed */}
//                         </RadioGroup>

//                         {/* <Button type="submit" variant="contained" color="primary">
//                     Continue
//                 </Button> */}
//                     </form>

//                     {/* Conditionally render UI based on the selected payment method */}
//                     <Box sx={{ cursor: 'pointer' }}>
//                         {selectedPaymentMethod === 'paypal' && <PayPalMethod />}
//                         {/* {selectedPaymentMethod === 'paypal' && <Paypal />} */}
//                         {selectedPaymentMethod === 'COD' && <CashOnDeliveryMethod />}
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// }

// export default PaymentStep;

function PaymentStep({ onSelectPaymentMethod }) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if a payment method is selected
        if (!selectedPaymentMethod) {
            // If no payment method is selected, show an error message
            setShowErrorMessage(true);
        } else {
            // Pass the selected payment method to the parent component
            onSelectPaymentMethod(selectedPaymentMethod);
        }
    };

    const handleSelectPaymentMethod = (selectedMethod) => {
        onSelectPaymentMethod(selectedMethod);
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
                                value="COD"
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
                    </form>

                    {/* Conditionally render UI based on the selected payment method */}
                    <Box sx={{ cursor: 'pointer' }}>
                        {selectedPaymentMethod === 'paypal' && <PayPalMethod />}
                        {selectedPaymentMethod === 'COD' && <CashOnDeliveryMethod />}
                    </Box>
                </Box>
            </Box>

            {/* Snackbar for displaying error message */}
            <Snackbar
                open={showErrorMessage}
                autoHideDuration={6000}
                onClose={handleCloseErrorMessage}
                message="Vui lòng chọn phương thức thanh toán trước khi hoàn thành."
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Box>
    );
}

export default PaymentStep;
