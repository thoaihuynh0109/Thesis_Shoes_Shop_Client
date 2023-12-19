import React, { useState, useEffect } from 'react';

import { Box, Button, Typography, TextField, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomizeButtonPersonalAccount } from '~/pages/ClientPages/Profile/PersonalAccount';
import useValidation from '~/components/UseValidation/useValidation';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import ShowDeliveryInformation from '../ShowDeliveryInformation';
function UpdateAddress() {
    const navigate = useNavigate();

    const [showToast, setShowToast] = useState(false);

    const location = useLocation();
    const { deliveryAddress } = location.state || {};

    // Use deliveryAddress data to set initial values of text fields
    const [fullName, setFullName] = useState(deliveryAddress?.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(deliveryAddress?.phoneNumber || '');
    const [address, setAddress] = useState(deliveryAddress?.address || '');

    // Create instances of useValidation hook
    const fullNameValidation = useValidation({ value: fullName });
    const phoneNumberValidation = useValidation({ value: phoneNumber });
    const addressValidation = useValidation({ value: address });

    const handleUpdateAddress = () => {
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
            setShowToast(true);

            // Delay the navigation to /checkout after showing the toast for 1,5 seconds
            setTimeout(() => {
                // Hide the toast before navigating
                setShowToast(false);
                // Update the address in the local state of ShowDeliveryInformation
                navigate('/checkout-page', { state: { deliveryAddress: selectedAddress } });
            }, 2500);
        } else {
            // Handle validation errors
            console.log('Validation failed. Please check again.');
        }
    };

    // Back to the previous page
    function goBack() {
        window.history.back();
    }

    return (
        <Container sx={{ minHeight: '800px', alignItems: 'center', justifyContent: 'center' }}>
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
                        textTransform: 'capitalize',
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <CustomTypography sx={{ mr: 15 }}>Số Điện Thoại</CustomTypography>
                <CustomizeTextField
                    label={'Số Điện Thoại'}
                    textField={'Số Điện Thoại'}
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
                        textTransform: 'capitalize',
                    }}
                />
            </Box>

            {/* check if these field are empty */}
            <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                <CustomizeButtonPersonalAccount
                    variant="contained"
                    onClick={handleUpdateAddress}
                    sx={{ pl: 4, pr: 4 }}
                >
                    Cập Nhật
                </CustomizeButtonPersonalAccount>

                <CustomizeButtonPersonalAccount
                    variant="outlined"
                    sx={{
                        pl: 4,
                        pr: 4,
                    }}
                    onClick={goBack}
                >
                    Quay lại
                </CustomizeButtonPersonalAccount>
            </Box>
            <ToastMessage2
                message="You just updated your shipping address"
                type="success"
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Container>
    );
}

export default UpdateAddress;
