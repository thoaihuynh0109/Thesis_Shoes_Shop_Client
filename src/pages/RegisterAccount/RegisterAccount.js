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
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};
function RegisterAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showToast, setShowToast] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // const { email: initialEmail } = location.state || '';
    // const [email, setEmail] = useState(initialEmail || '');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    // Retrieve email from localStorage
    const emailFromStorage = localStorage.getItem('userEmail') || '';
    const [email, setEmail] = useState(emailFromStorage);
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

    // const handleRegister = () => {
    //     console.log({ firstName, lastName, email, password });
    //     // send data to register account api
    // };

    // const handleRegister = () => {
    //     // Validation logic
    //     const isFirstNameValid = firstNameValidation.validateRequiredWithoutDigits();
    //     const isLastNameValid = lastNameValidation.validateRequiredWithoutDigits();

    //     const isEmailValid = emailValidation.validateEmail();
    //     const isPasswordValid = passwordValidation.validatePassword();
    //     const isRePasswordValid = rePasswordValidation.validateConfirmPassword(password);

    //     if (
    //         isFirstNameValid &&
    //         isLastNameValid &&
    //         isEmailValid &&
    //         isPasswordValid &&
    //         isRePasswordValid
    //     ) {
    //         // Continue with registration logic
    //         console.log('Validation succeeded');
    //         console.log({ firstName, lastName, email, password, rePassword });

    //         // Set showToast to true after successful registration
    //         // Delay the navigation to /signin page after showing the toast for 1,5 seconds
    //         setTimeout(() => {
    //             // Hide the toast before navigating
    //             setShowToast(false);
    //             // Update the address in the local state of ShowDeliveryInformation
    //             navigate('/signin');
    //         }, 1500);
    //         setShowToast(true);
    //     } else {
    //         // Handle validation errors
    //         console.log('Validation failed. Please check the form.');
    //     }
    // };

    const handleRegister = async () => {
        // Validation logic
        const isFirstNameValid = firstNameValidation.validateRequiredWithoutDigits();
        const isLastNameValid = lastNameValidation.validateRequiredWithoutDigits();
        const isEmailValid = emailValidation.validateEmail();
        const isPasswordValid = passwordValidation.validatePassword();
        const isRePasswordValid = rePasswordValidation.validateConfirmPassword(password);
        const isAddressValid = emailValidation.validateRequired();
        const isPhoneNumberValid = phoneNumberValidation.validatePhone();

        if (
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isRePasswordValid &&
            isAddressValid &&
            isPhoneNumberValid
        ) {
            try {
                // Call the API to create a new user
                const registrationData = {
                    // update to database
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    password,
                    rePassword,
                    address,
                };

                const response = await userService.createUser(registrationData);

                // Check if the registration was successful
                if (response.status === 201) {
                    console.log('User registered successfully');
                    // Set showToast to true after successful registration
                    // Delay the navigation to /signin page after showing the toast for 1,5 seconds
                    setTimeout(() => {
                        // Hide the toast before navigating
                        setShowToast(false);
                        // Update the address in the local state of ShowDeliveryInformation
                        navigate('/signin');
                    }, 1500);
                    setShowToast(true);
                } else {
                    console.log('User registration failed. Please check the form.');
                }
            } catch (error) {
                console.error('Error during user registration:', error);
            }
        } else {
            // Handle validation errors
            console.log('Validation failed. Please check the form.');
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
                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        // border: '1px solid #757575',
                        // p: 2,
                    }}
                >
                    <Box>
                        <CustomTypography variant="h5" sx={{ fontSize: '17px' }}>
                            Your Personal Information
                        </CustomTypography>
                        <Divider sx={{ style }} />
                        <CustomTypography
                            variant="body1"
                            textAlign={'left'}
                            gutterBottom
                            sx={{ mt: 2 }}
                        >
                            First Name
                        </CustomTypography>

                        <CustomizeTextField
                            value={firstName}
                            wd={400}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                firstNameValidation.setState({
                                    ...firstNameValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="First Name"
                            variant="outlined"
                            onBlur={firstNameValidation.validateRequiredWithoutDigits}
                            error={firstNameValidation.state.message !== ''}
                            helperText={firstNameValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                            }}
                        />
                        <CustomTypography
                            variant="body1"
                            textAlign={'left'}
                            sx={{ mt: 2 }}
                            gutterBottom
                        >
                            Last Name
                        </CustomTypography>
                        <CustomizeTextField
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                lastNameValidation.setState({
                                    ...lastNameValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Last Name"
                            variant="outlined"
                            onBlur={lastNameValidation.validateRequiredWithoutDigits}
                            error={lastNameValidation.state.message !== ''}
                            helperText={lastNameValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                            }}
                        />
                        <CustomTypography
                            variant="body1"
                            textAlign={'left'}
                            sx={{ mt: 2 }}
                            gutterBottom
                        >
                            Phone Number
                        </CustomTypography>
                        <CustomizeTextField
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                phoneNumberValidation.setState({
                                    ...phoneNumberValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Phone Number"
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

                        <CustomTypography
                            variant="body1"
                            textAlign={'left'}
                            sx={{ mt: 2 }}
                            gutterBottom
                        >
                            Address
                        </CustomTypography>
                        <CustomizeTextField
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
                            onBlur={addressValivation.validateRequired}
                            error={addressValivation.state.message !== ''}
                            helperText={addressValivation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                            }}
                        />

                        <CustomTypography
                            variant="body1"
                            textAlign={'left'}
                            sx={{ mt: 2 }}
                            gutterBottom
                        >
                            Email
                        </CustomTypography>
                        <CustomizeTextField
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
                            onBlur={emailValidation.validateEmail}
                            error={emailValidation.state.message !== ''}
                            helperText={emailValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                            }}
                        />

                        <CustomTypography
                            variant="body1"
                            textAlign={'left'}
                            sx={{ mt: 2 }}
                            gutterBottom
                        >
                            Password
                        </CustomTypography>
                        <CustomizeTextField
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                passwordValidation.setState({
                                    ...passwordValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Password"
                            variant="outlined"
                            onBlur={passwordValidation.validatePassword}
                            error={passwordValidation.state.message !== ''}
                            helperText={passwordValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
                            }}
                        />
                        <CustomTypography
                            variant="body1"
                            textAlign={'left'}
                            sx={{ mt: 2 }}
                            gutterBottom
                        >
                            Confirm Password
                        </CustomTypography>
                        <CustomizeTextField
                            value={rePassword}
                            onChange={(e) => {
                                setRePassword(e.target.value);
                                rePasswordValidation.setState({
                                    ...rePasswordValidation.state,
                                    value: e.target.value,
                                });
                            }}
                            label="Confirm Password"
                            variant="outlined"
                            onBlur={rePasswordValidation.validateConfirmPassword}
                            error={rePasswordValidation.state.message !== ''}
                            helperText={rePasswordValidation.state.message}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    fontSize: '12px', // Adjust the font size as needed
                                },
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
                message="Account registration successful!"
                type="success"
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Box>
    );
}

export default RegisterAccount;
