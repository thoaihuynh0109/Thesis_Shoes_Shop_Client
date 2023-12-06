import { Box, Button, Container, Typography, styled, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import useValidation from '~/components/UseValidation/useValidation';
import userService from '~/services/userServices';
import { useNavigate } from 'react-router-dom';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
export const CustomizeButtonPersonalAccount = styled(Button)(({ pl = 15, pr = 15 }) => ({
    marginTop: 4,
    paddingLeft: pl || 0,
    paddingRight: pr || 0,
    alignItems: 'center',
    marginLeft: 99,
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    fontSize: '14px',
    cursor: 'pointer',
}));

function PersonalAccount() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    // Fetch user data from local storage
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user')) || [];
        setUserData(storedUserData);
        setUserId(storedUserData._id); // Assuming userId is part of the user data
        console.log('storedUserData._id: ', storedUserData._id);
    }, []);

    // // Populate the state variables with the retrieved user data
    useEffect(() => {
        setFirstName(userData?.firstName || '');
        setLastName(userData?.lastName || '');
        setEmail(userData?.email || '');
        setAddress(userData?.address || '');
        setPhone(userData?.phone || '');
    }, [userData]);

    // check validate
    const firstNameValidation = useValidation({ value: '' });
    const lastNameValidation = useValidation({ value: '' });
    const emailValidation = useValidation({ value: '' });
    const phoneValidation = useValidation({ value: '' });
    const addressValivation = useValidation({ value: '' });

    // check validate for fields data get from the local storage
    useEffect(() => {
        firstNameValidation.setState({ ...firstNameValidation.state, value: firstName });
    }, [firstName, firstNameValidation]);
    useEffect(() => {
        lastNameValidation.setState({ ...lastNameValidation.state, value: lastName });
    }, [lastName, lastNameValidation]);

    useEffect(() => {
        emailValidation.setState({ ...emailValidation.state, value: email });
    }, [email, emailValidation]);

    useEffect(() => {
        phoneValidation.setState({ ...phoneValidation.state, value: phone });
    }, [phone, phoneValidation]);
    useEffect(() => {
        addressValivation.setState({ ...addressValivation.state, value: address });
    }, [address, addressValivation]);

    // const handleCheckTextField = async () => {
    //     // Validate fields
    //     const isFirstNameValid = firstNameValidation.validateRequiredWithoutDigits();
    //     const isLastNameValid = lastNameValidation.validateRequiredWithoutDigits();
    //     const isEmailValid = emailValidation.validateEmail();
    //     const isAddressValid = addressValivation.validateRequired();
    //     const isPhoneNumberValid = phoneValidation.validatePhone();

    //     if (
    //         isFirstNameValid &&
    //         isLastNameValid &&
    //         isEmailValid &&
    //         isAddressValid &&
    //         isPhoneNumberValid
    //     ) {
    //         try {
    //             // Update user data in the database
    //             const updatedUserData = {
    //                 firstName,
    //                 lastName,
    //                 email,
    //                 address,
    //                 phone,
    //             };
    //             console.log('ahiahi:', userId);
    //             console.log(updatedUserData);
    //             await userService.updateUserProfile(userId, updatedUserData);

    //             // Optionally, you can also update the local storage with the new user data
    //             setUserData(updatedUserData);

    //             setShowToast(true);
    //             setToastMessage('You just updated your information!');
    //             setTypeMessage('success');

    //             // navigate to Home Page after 2s
    //             setTimeout(() => {
    //                 navigate('/');
    //             }, 2000);

    //             // Show a success message or perform other actions as needed
    //             console.log('User profile updated successfully!');
    //         } catch (error) {
    //             console.error('Error updating user profile:', error);
    //         }
    //     } else {
    //         setShowToast(true);
    //         setToastMessage('Please, fill all information below');
    //         setTypeMessage('warning');
    //         // Handle validation errors
    //         console.log('Validation failed. Please check the form.');
    //     }
    // };

    const handleCheckTextField = async () => {
        // Validate fields
        const isFirstNameValid = firstNameValidation.validateRequiredWithoutDigits();
        const isLastNameValid = lastNameValidation.validateRequiredWithoutDigits();
        const isEmailValid = emailValidation.validateEmail();
        const isAddressValid = addressValivation.validateRequired();
        const isPhoneNumberValid = phoneValidation.validatePhone();

        if (
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isAddressValid &&
            isPhoneNumberValid
        ) {
            try {
                // Update user data in the database
                const updatedUserData = {
                    firstName,
                    lastName,
                    email,
                    address,
                    phone,
                };
                console.log('ahiahi:', userId);
                console.log(updatedUserData);
                await userService.updateUserProfile(userId, updatedUserData);

                // Update the local storage with the new user data
                localStorage.setItem('user', JSON.stringify(updatedUserData));

                // Update the local state with the new user data
                setUserData(updatedUserData);

                setShowToast(true);
                setToastMessage('You just updated your information!');
                setTypeMessage('success');

                // navigate to Home Page after 2s
                setTimeout(() => {
                    navigate('/');
                }, 2000);

                // Show a success message or perform other actions as needed
                console.log('User profile updated successfully!');
            } catch (error) {
                console.error('Error updating user profile:', error);
            }
        } else {
            setShowToast(true);
            setToastMessage('Please, fill all information below');
            setTypeMessage('warning');
            // Handle validation errors
            console.log('Validation failed. Please check the form.');
        }
    };

    // back to the previous page

    return (
        <Container sx={{ minHeight: '800px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Thông tin cá nhân
            </Typography>
            {/* input field */}

            <Grid container spacing={2} sx={{ ml: 31, mr: 31, mb: 2 }}>
                {/* Text fields with validation */}
                <Grid item xs={6}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <CustomTypography variant="body1" textAlign={'left'} gutterBottom>
                                First Name
                            </CustomTypography>
                        </Grid>
                        <Grid item>
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
                                onBlur={
                                    (firstNameValidation.validateRequiredWithoutDigits,
                                    () => {
                                        console.log(
                                            'Validation result:',
                                            firstNameValidation.validateRequiredWithoutDigits(),
                                        );
                                    })
                                }
                                error={firstNameValidation.state.message !== ''}
                                helperText={firstNameValidation.state.message}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        fontSize: '12px', // Adjust the font size as needed
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                    >
                        <Grid item>
                            <CustomTypography variant="body1" textAlign={'left'} gutterBottom>
                                Last Name
                            </CustomTypography>
                        </Grid>
                        <Grid item>
                            <CustomizeTextField
                                value={lastName}
                                wd={400}
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
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                    >
                        <Grid item>
                            <CustomTypography variant="body1" textAlign={'left'} gutterBottom>
                                Email
                            </CustomTypography>
                        </Grid>
                        <Grid item>
                            <CustomizeTextField
                                value={email}
                                wd={400}
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
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                    >
                        <Grid item>
                            <CustomTypography variant="body1" textAlign={'left'} gutterBottom>
                                Phone Number
                            </CustomTypography>
                        </Grid>
                        <Grid item>
                            <CustomizeTextField
                                value={phone}
                                wd={400}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    phoneValidation.setState({
                                        ...phoneValidation.state,
                                        value: e.target.value,
                                    });
                                }}
                                label="Phone Number"
                                variant="outlined"
                                onBlur={phoneValidation.validatePhone}
                                error={phoneValidation.state.message !== ''}
                                helperText={phoneValidation.state.message}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                        fontSize: '12px', // Adjust the font size as needed
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                    >
                        <Grid item>
                            <CustomTypography variant="body1" textAlign={'left'} gutterBottom>
                                Address
                            </CustomTypography>
                        </Grid>
                        <Grid item>
                            <CustomizeTextField
                                value={address}
                                wd={400}
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* check if these field are empty */}
            <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                <CustomizeButtonPersonalAccount variant="contained" onClick={handleCheckTextField}>
                    Save Profile
                </CustomizeButtonPersonalAccount>
                <ToastMessage2
                    message={toastMessage}
                    type={typeMessage}
                    showToast={showToast}
                    setShowToast={setShowToast}
                />

                <CustomizeButtonPersonalAccount
                    variant="outlined"
                    sx={{
                        pl: 4,
                        pr: 4,
                    }}
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Cancel
                </CustomizeButtonPersonalAccount>
            </Box>
        </Container>
    );
}

export default PersonalAccount;
