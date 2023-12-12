import { Box, Container, TextField, Typography, Grid, styled, Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import { goBack } from '~/components/GoBack/GoBack';
import { CustomizeButtonPersonalAccount } from './Profile/PersonalAccount';
import userService from '~/services/userServices';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import useValidation from '~/components/UseValidation/useValidation';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    // show toast message
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    // get user data from local storage
    const user = JSON.parse(localStorage.getItem('user')) || '';

    const currentPasswordValidation = useValidation({ value: '' });
    const newPasswordValidation = useValidation({ value: '' });
    const rePasswordValidation = useValidation({ value: '' });

    const handleChangePassword = async () => {
        const isCurrentPasswordValid = currentPasswordValidation.validateRequired();
        const isNewPasswordValid = newPasswordValidation.validateRequired();
        const isRePasswordValid = rePasswordValidation.validateRequired();

        if (isCurrentPasswordValid && isNewPasswordValid && isRePasswordValid) {
            const data = {
                id: user._id,
                password: currentPassword,
                newPassword: newPassword,
            };
            const respone = await userService.changePassword(data);
            if (respone?.status === 200) {
                setShowToast(true);
                setToastMessage('Change password successfully!');
                setTypeMessage('success');
                setCurrentPassword('');
                setNewPassword('');
                setRePassword('');
            } else {
                setShowToast(true);
                setToastMessage('Check your password again!');
                setTypeMessage('warning');
                // alert('Mật khẩu không chính xác! Vui lòng nhập lại!');
                setCurrentPassword('');
                setNewPassword('');
                setRePassword('');
            }
        } else {
            setShowToast(true);
            setToastMessage('Please fill in all fields!');
            setTypeMessage('warning');
        }
    };

    // check password detail for each fields
    // const handleChangePassword = async () => {
    //     const isCurrentPasswordValid = currentPasswordValidation.validateRequired();
    //     const isNewPasswordValid = newPasswordValidation.validateRequired();
    //     const isRePasswordValid = rePasswordValidation.validateRequired();

    //     if (isCurrentPasswordValid && isNewPasswordValid && isRePasswordValid) {
    //         // Check if new password and re-entered password match
    //         const userFromDB = await userService.getUserById(user._id);
    //         console.log('user password: ', userFromDB.password);
    //         const isPasswordMatch = await bcryptjs.compare(currentPassword, userFromDB.password);
    //         console.log('Compare current passowrd with password in DB: ', isPasswordMatch);
    //         if (isPasswordMatch) {
    //             if (newPassword === rePassword) {
    //                 // Passwords match, proceed with changing the password
    //                 const response = await userService.changePassword({
    //                     id: user._id,
    //                     password: currentPassword,
    //                     newPassword: newPassword,
    //                 });

    //                 if (response?.status === 200) {
    //                     setShowToast(true);
    //                     setToastMessage('Change password successfully!');
    //                     setTypeMessage('success');
    //                 }
    //             } else {
    //                 // New password and re-entered password do not match
    //                 setShowToast(true);
    //                 setToastMessage('New password and re-entered password do not match!');
    //                 setTypeMessage('warning');
    //             }
    //         } else {
    //             // Passwords do not match
    //             setShowToast(true);
    //             setToastMessage('Current password is incorrect!');
    //             setTypeMessage('warning');
    //         }
    //     } else {
    //         setShowToast(true);
    //         setToastMessage('Please fill in all fields!');
    //         setTypeMessage('warning');
    //     }
    // };

    return (
        <Box sx={{ minHeight: '550px' }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 1, color: 'blue', fontWeight: 'bold' }}>
                Change Password
            </Typography>

            <Box
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        justifyContent: 'center',
                        background: `url('https://moonlock.com/2023/06/change-password-iphone-header.jpg')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '480px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px #333',
                        width: '700px',
                        mt: 2,
                        mr: 6,
                    }}
                ></Box>
                <Box>
                    {/* input field */}

                    {/* <TextField
                label={'Mật Khẩu Hiện Tại'}
                textField={'Mật Khẩu Hiện Tại'}
                onChange={(e) => setCurrentPassword(e.target.value)}
                forPassword={true}
            /> */}
                    {/* current password */}
                    <CustomizeTextField
                        value={currentPassword}
                        onChange={(e) => {
                            setCurrentPassword(e.target.value);
                            currentPasswordValidation.setState({
                                ...currentPasswordValidation.state,
                                value: e.target.value,
                            });
                        }}
                        label="Current Password"
                        placeholder="Your current password...."
                        variant="outlined"
                        onBlur={currentPasswordValidation.validateRequired}
                        error={currentPasswordValidation.state.message !== ''}
                        helperText={currentPasswordValidation.state.message}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                fontSize: '12px', // Adjust the font size as needed
                            },
                            mb: 2,
                        }}
                    />

                    {/* new  password */}
                    {/* <TextField
                        label={'Mật Khẩu Mới'}
                        textField={'Mật Khẩu Mới'}
                        onChange={(e) => setNewPassword(e.target.value)}
                    /> */}

                    <CustomizeTextField
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            newPasswordValidation.setState({
                                ...newPasswordValidation.state,
                                value: e.target.value,
                            });
                        }}
                        label="New Password"
                        variant="outlined"
                        placeholder="Enter new password...."
                        onBlur={newPasswordValidation.validateRequired}
                        error={newPasswordValidation.state.message !== ''}
                        helperText={newPasswordValidation.state.message}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                fontSize: '12px', // Adjust the font size as needed
                            },
                            mb: 2,
                        }}
                    />

                    {/* retype new  password */}
                    <CustomizeTextField
                        value={rePassword}
                        onChange={(e) => {
                            setRePassword(e.target.value);
                            rePasswordValidation.setState({
                                ...rePasswordValidation.state,
                                value: e.target.value,
                            });
                        }}
                        label="Retype Password"
                        variant="outlined"
                        placeholder="Retype password...."
                        onBlur={rePasswordValidation.validateRequired}
                        error={rePasswordValidation.state.message !== ''}
                        helperText={rePasswordValidation.state.message}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                fontSize: '12px', // Adjust the font size as needed
                            },
                            mb: 2,
                        }}
                    />

                    {/* check if these field are empty */}
                    <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            onClick={handleChangePassword}
                            variant="contained"
                            sx={{ padding: '8px 32px' }}
                        >
                            <CustomTypography>Save</CustomTypography>
                        </Button>

                        <Button variant="outlined" sx={{ padding: '8px 32px' }} onClick={goBack}>
                            <CustomTypography>Back</CustomTypography>
                        </Button>
                    </Box>
                </Box>
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

export default ChangePassword;
