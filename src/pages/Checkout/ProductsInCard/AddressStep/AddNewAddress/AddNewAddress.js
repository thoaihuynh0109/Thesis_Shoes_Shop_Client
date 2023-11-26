import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomizeButtonPersonalAccount } from '~/pages/ClientPages/Profile/PersonalAccount';
import useValidation from '~/components/UseValidation/useValidation';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';

function AddNewAddress() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Create instances of useValidation hook
    const fullNameValidation = useValidation({ value: fullName });
    const phoneNumberValidation = useValidation({ value: phoneNumber });
    const addressValidation = useValidation({ value: address });

    const handleUpdateAddress = useCallback(() => {
        // Validate each field
        const isFullNameValid = fullNameValidation.validateRequired();
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

            // Save the new address to local storage
            const newAddress = {
                fullName,
                phoneNumber,
                address,
            };

            const userId = '123'; // Replace with your logic to get userId
            if (!userId) {
                console.error('User ID not found. Redirect or handle accordingly.');
                return;
            }

            const key = `address_${userId}`;
            const existingAddresses = JSON.parse(localStorage.getItem(key)) || [];
            const updatedAddresses = [...existingAddresses, newAddress];

            // Save the updated addresses back to local storage only if there are changes
            if (JSON.stringify(existingAddresses) !== JSON.stringify(updatedAddresses)) {
                localStorage.setItem(key, JSON.stringify(updatedAddresses));
                setShowToast(true);

                // Delay 3s before navigating to /checkout page
                setTimeout(() => {
                    navigate('/checkout');
                }, 1500); // Adjust the delay as needed
            }
        } else {
            // Handle validation errors
            console.log('Validation failed. Please check again.');
        }
    }, [
        fullName,
        address,
        phoneNumber,
        fullNameValidation,
        phoneNumberValidation,
        addressValidation,
    ]);

    // Back to the previous page
    const goBack = () => {
        window.history.back();
    };

    // useEffect to log state changes
    useEffect(() => {
        console.log('State changed:', { fullName, phoneNumber, address });
    }, [fullName, phoneNumber, address]);

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
                    onBlur={fullNameValidation.validateRequired}
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
                    Thêm Mới
                </CustomizeButtonPersonalAccount>
                <ToastMessage2
                    message="Bạn Vừa Cập Nhật Địa Chỉ Mới"
                    type="success"
                    showToast={showToast}
                    setShowToast={setShowToast}
                />
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
        </Container>
    );
}

export default AddNewAddress;
