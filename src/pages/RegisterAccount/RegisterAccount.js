import { Box, Container, Divider, styled } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './RegisterAccount.module.scss';
import classNames from 'classnames/bind';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';

import useValidation from '~/components/UseValidation/useValidation';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import userService from '~/services/userServices';

const style = {
    width: '90%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};
function RegisterAccount() {
    const navigate = useNavigate();
    // show toast message
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // const { email: initialEmail } = location.state || '';
    // const [email, setEmail] = useState(initialEmail || '');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    // Retrieve email from localStorage
    // const emailFromStorage = localStorage.getItem('userEmail') || '';
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Clear email from localStorage on component mount (page reload)
    useEffect(() => {
        localStorage.removeItem('userEmail');
    }, []);

    // check validate
    const firstNameValidation = useValidation({ value: '' });
    const lastNameValidation = useValidation({ value: '' });
    const emailValidation = useValidation({ value: '' });
    const phoneNumberValidation = useValidation({ value: '' });
    const addressValivation = useValidation({ value: '' });
    const passwordValidation = useValidation({ value: '', isShow: false });
    const rePasswordValidation = useValidation({ value: '', isShow: false });

    const handleRegister = async () => {
        // Validation logic
        const isFirstNameValid = firstNameValidation.validateRequiredWithoutDigits();
        const isLastNameValid = lastNameValidation.validateRequiredWithoutDigits();
        const isEmailValid = emailValidation.validateEmail();
        const isPasswordValid = passwordValidation.validatePassword();
        const isRePasswordValid = rePasswordValidation.validateConfirmPassword(password);
        const isAddressValid = addressValivation.validateRequired();
        const isPhoneNumberValid = phoneNumberValidation.validatePhone();

        if (
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isRePasswordValid &&
            // isAddressValid &&
            isPhoneNumberValid
        ) {
            try {
                // Check if the email is already registered
                const isEmailRegisteredResponse = await userService.checkEmailAvailability(email);
                const isEmailRegistered = isEmailRegisteredResponse.available;

                if (!isEmailRegistered) {
                    // Email is already registered, show a message to the user or take appropriate action
                    setShowToast(true);
                    setToastMessage('Email is already registered. Please use a different email.');
                    setTypeMessage('warning');
                } else {
                    // Email is not registered, proceed with user registration
                    const registrationData = {
                        firstName,
                        lastName,
                        email,
                        phone: phoneNumber,
                        password,
                        rePassword,
                        // address,
                    };

                    const response = await userService.createUser(registrationData);

                    // Check if the registration was successful
                    if (!response.success) {
                        console.log('User registered successfully');
                        // Set showToast to true after successful registration
                        // Delay the navigation to /signin page after showing the toast for 1.5 seconds
                        setShowToast(true);
                        setToastMessage('Account Registration Successful!');
                        setTypeMessage('success');
                        setTimeout(() => {
                            // Hide the toast before navigating
                            setShowToast(false);
                            // Update the address in the local state of ShowDeliveryInformation
                            navigate('/signin');
                        }, 2500);
                    }
                }
            } catch (error) {
                console.error('Error during user registration:', error);
            }
        } else {
            // Handle validation errors
            setShowToast(true);
            setToastMessage('Validation failed. Please check the form.');
            setTypeMessage('warning');
        }
    };

    return (
        <Box>
            <CustomTypography
                variant="h4"
                sx={{ mt: 2, mb: 1, fontSize: '20px', fontWeight: 'bold' }}
            >
                Create An Account
            </CustomTypography>
            <Box sx={{ border: '1px solid #757575', p: 4 }}>
                <CustomTypography variant="h5" sx={{ fontSize: '17px' }}>
                    Your Personal Information
                </CustomTypography>
                <Divider sx={{ style }} />

                <Box
                    sx={{
                        // mt: 1,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <CustomizeTextField
                            value={firstName}
                            wd={500}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                firstNameValidation.setState({
                                    ...firstNameValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="First Name"
                            placeholder="Fill your first name..."
                            variant="outlined"
                            onBlur={firstNameValidation.validateRequiredWithoutDigits}
                            error={firstNameValidation.state.message !== ''}
                            helperText={firstNameValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                                mb: 2,
                                textTransform: 'capitalize',
                            }}
                        />

                        <CustomizeTextField
                            wd={500}
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                lastNameValidation.setState({
                                    ...lastNameValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Last Name"
                            placeholder="Fill your last name..."
                            variant="outlined"
                            onBlur={lastNameValidation.validateRequiredWithoutDigits}
                            error={lastNameValidation.state.message !== ''}
                            helperText={lastNameValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                                mb: 2,
                                textTransform: 'capitalize',
                            }}
                        />

                        <CustomizeTextField
                            wd={500}
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                phoneNumberValidation.setState({
                                    ...phoneNumberValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            placeholder="Fill your phone number..."
                            label="Phone Number"
                            variant="outlined"
                            onBlur={phoneNumberValidation.validatePhone}
                            error={phoneNumberValidation.state.message !== ''}
                            helperText={phoneNumberValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                                mb: 2,
                            }}
                        />

                        <CustomizeTextField
                            wd={500}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                emailValidation.setState({
                                    ...emailValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Email"
                            variant="outlined"
                            placeholder="Fill your email..."
                            onBlur={emailValidation.validateEmail}
                            error={emailValidation.state.message !== ''}
                            helperText={emailValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                                mb: 2,
                            }}
                        />
                        {/* <CustomizeTextField
                            wd={500}
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                                addressValivation.setState({
                                    ...addressValivation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Address"
                            variant="outlined"
                            placeholder="Fill your address..."
                            onBlur={addressValivation.validateRequired}
                            error={addressValivation.state.message !== ''}
                            helperText={addressValivation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                                mb: 2,
                            }}
                        /> */}

                        <CustomizeTextField
                            wd={500}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                passwordValidation.setState({
                                    ...passwordValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Password"
                            type="password"
                            placeholder="Fill your password..."
                            variant="outlined"
                            onBlur={passwordValidation.validatePassword}
                            error={passwordValidation.state.message !== ''}
                            helperText={passwordValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                                mb: 2,
                            }}
                        />

                        <CustomizeTextField
                            wd={500}
                            value={rePassword}
                            onChange={(e) => {
                                setRePassword(e.target.value);
                                rePasswordValidation.setState({
                                    ...rePasswordValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Confirm Password"
                            type="password"
                            placeholder="Retype password..."
                            variant="outlined"
                            onBlur={() => {
                                // Check if both password and rePassword have values before validation
                                if (password !== '' && rePassword !== '') {
                                    rePasswordValidation.validateConfirmPassword(password);
                                }
                            }}
                            error={rePasswordValidation.state.message !== ''}
                            helperText={rePasswordValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                                mb: 2,
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: 3, ml: 5 }}>
                        <img
                            src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1700587107/Gimme-shoes-images/Logo/shoes-art_tvopnl.webp"
                            alt="Register Account"
                            width={'600px'}
                            style={{
                                borderRadius: '8% 92% 6% 94% / 93% 12% 88% 7%',
                                boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.95)',
                            }}
                            height={'495px'}
                        />
                    </Box>
                </Box>
                <CustomizeButton
                    variant="contained"
                    sx={{
                        mb: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={handleRegister}
                >
                    Register
                </CustomizeButton>
            </Box>

            <ToastMessage2
                message={toastMessage}
                type={typeMessage}
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Box>
    );
}

export default RegisterAccount;
