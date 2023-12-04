import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress } from '@mui/material'; // loading icon
import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomizeButtonPersonalAccount } from '~/pages/ClientPages/Profile/PersonalAccount';
import useValidation from '~/components/UseValidation/useValidation';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';

import PaymentStep from './Payment/index';

function ShippingInformation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { deliveryAddress } = location.state || {};

    // show toast message
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    // wait continue loading
    const [isLoading, setIsLoading] = useState(false);

    const [fullName, setFullName] = useState(deliveryAddress?.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(deliveryAddress?.phoneNumber || '');
    const [address, setAddress] = useState(deliveryAddress?.address || '');
    // show Shipping Method
    const [isInformationFilled, setIsInformationFilled] = useState(false);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');

    // Create instances of useValidation hook -- check validation
    const fullNameValidation = useValidation({ value: fullName });
    const phoneNumberValidation = useValidation({ value: phoneNumber });
    const addressValidation = useValidation({ value: address });

    const handleContinue = async () => {
        // Set loading to true when starting the async action
        setIsLoading(true);

        // Validate each field
        const isFullNameValid = fullNameValidation.validateRequiredWithoutDigits();
        const isPhoneNumberValid = phoneNumberValidation.validatePhone();
        const isAddressValid = addressValidation.validateRequired();

        console.log('Validation Results:', {
            isFullNameValid,
            isPhoneNumberValid,
            isAddressValid,
        });

        if (isFullNameValid && isPhoneNumberValid && isAddressValid) {
            // Continue with registration logic
            console.log('Validation succeeded');
            console.log({ fullName, address, phoneNumber });

            // Save the address to local storage
            const selectedAddress = {
                fullName,
                phoneNumber,
                address,
            };

            try {
                // Simulate an asynchronous action (e.g., API call)
                await new Promise((resolve) => setTimeout(resolve, 2500));

                // Update the address in the local state of ShowDeliveryInformation
                navigate('/checkout-page', { state: { deliveryAddress: selectedAddress } });
                // Set the state to indicate that information is filled
                setIsInformationFilled(true);
            } catch (error) {
                console.error('Error during async action:', error);
                // Handle error, show error message, etc.
            } finally {
                // Set loading back to false when the async action completes (whether success or failure)
                setIsLoading(false);
            }
        } else {
            // Handle validation errors
            console.log('Validation failed. Please check again.');
            // Set loading back to false when the async action completes (whether success or failure)
            setIsLoading(false);
        }
    };

    // Back to the previous page
    function goBack() {
        window.history.back();
    }
    const handleSubmitOrder = async () => {
        // Check if a payment method is selected
        if (selectedPaymentMethod) {
            console.log('Selected Payment Method:', selectedPaymentMethod);

            setShowToast(true);
            setToastMessage('Thanks so much for your order by COD!');
            setTypeMessage('success');
            // after 2,5s clicking order button will redirect to '/shop'
            setTimeout(() => {
                navigate('/shop');
            }, 2500);

            // Check if the selected payment method is Cash On Delivery
            if (selectedPaymentMethod === 'cod') {
                try {
                    // Simulate an asynchronous action (e.g., API call)
                    await new Promise((resolve) => setTimeout(resolve, 2500));
                    console.log('Order placed successfully for Cash On Delivery');
                } catch (error) {
                    console.error('Error during async action:', error);
                    // Handle error, show error message, etc.
                }
            } else if (selectedPaymentMethod === 'paypal') {
                // Proceed with the order logic for PayPal
                console.log('Order placed successfully for PayPal');
            }
            console.log('Order placed successfully');
        } else {
            // If no payment method is selected, show an error message
            console.log('Selected Payment Method:', selectedPaymentMethod);
            // Show a toast message for not selecting a payment method
        }
    };

    return (
        <Box sx={{ minHeight: '800px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                Cập Nhật Địa Chỉ Nhận Hàng
            </Typography>

            {/* input field */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <CustomTypography sx={{ mr: 12 }}>Người Nhận Hàng</CustomTypography>
                <CustomizeTextField
                    label={'Người Nhận Hàng'}
                    textField={'Họ tên người nhận hàng'}
                    value={fullName}
                    wd={600}
                    onChange={(e) => {
                        setFullName(e.target.value);
                        fullNameValidation.setState({
                            ...fullNameValidation.state,
                            value: e.target.value,
                        });
                    }}
                    variant="outlined"
                    onBlur={fullNameValidation.validateRequiredWithoutDigits}
                    error={fullNameValidation.state.message !== ''}
                    helperText={fullNameValidation.state.message}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px', // Adjust the font size as needed
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <CustomTypography sx={{ mr: 15 }}>Số Điện Thoại</CustomTypography>
                <CustomizeTextField
                    label={'Số Điện Thoại'}
                    textField={'Số Điện Thoại'}
                    wd={600}
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        phoneNumberValidation.setState({
                            ...phoneNumberValidation.state,
                            value: e.target.value,
                        });
                    }}
                    variant="outlined"
                    onBlur={phoneNumberValidation.validatePhone}
                    error={phoneNumberValidation.state.message !== ''}
                    helperText={phoneNumberValidation.state.message}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px', // Adjust the font size as needed
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <CustomTypography sx={{ mr: 11 }}>Địa Chỉ Nhận Hàng</CustomTypography>
                <CustomizeTextField
                    label={'Địa Chỉ Nhận Hàng'}
                    textField={'Địa Chỉ Nhận Hàng'}
                    value={address}
                    wd={600}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        addressValidation.setState({
                            ...addressValidation.state,
                            value: e.target.value,
                        });
                    }}
                    variant="outlined"
                    onBlur={addressValidation.validateRequired}
                    error={addressValidation.state.message !== ''}
                    helperText={addressValidation.state.message}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px', // Adjust the font size as needed
                        },
                    }}
                />
            </Box>

            {/* check if these field are empty */}
            {isLoading ? (
                // Show a loading spinner while processing the action
                <Box>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* loading */}
                        <CircularProgress
                            sx={{
                                mt: 2,
                            }}
                        />
                    </Typography>
                    <Typography
                        sx={{ textAlign: 'center', mt: 2, fontSize: '14px', fontWeight: '600' }}
                    >
                        Loading...
                    </Typography>
                </Box>
            ) : isInformationFilled ? (
                // hide 2 buttons: Contine and Back
                <Box></Box>
            ) : (
                <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                    <CustomizeButtonPersonalAccount
                        variant="contained"
                        onClick={handleContinue}
                        sx={{ pl: 4, pr: 4 }}
                    >
                        Continue
                    </CustomizeButtonPersonalAccount>

                    <CustomizeButtonPersonalAccount
                        variant="outlined"
                        sx={{
                            p: '4px 48px',
                        }}
                        onClick={goBack}
                    >
                        Back
                    </CustomizeButtonPersonalAccount>
                </Box>
            )}

            {/* isInformationFilled is true and click button continue */}
            {isInformationFilled && (
                // show payment step
                <Box>
                    {/* choose shipping method */}
                    <Box sx={{ ml: 35 }}>
                        <PaymentStep
                            onSelectPaymentMethod={(selectedMethod) =>
                                setSelectedPaymentMethod(selectedMethod)
                            }
                        />
                    </Box>

                    {/* button continue to payment */}
                    {selectedPaymentMethod !== 'paypal' && (
                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
                            <CustomizeButtonPersonalAccount
                                variant="outlined"
                                sx={{
                                    mt: '20px',
                                    mr: 35,
                                    padding: '8px 30px',
                                    textTransform: 'capitalize',
                                }}
                                onClick={handleSubmitOrder}
                            >
                                Order
                            </CustomizeButtonPersonalAccount>
                        </Box>
                    )}
                </Box>
            )}

            {/* show toast message */}
        </Box>
    );
}

export default ShippingInformation;
