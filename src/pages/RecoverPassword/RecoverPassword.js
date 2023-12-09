import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Container, Box, Typography, Button, TextField, styled } from '@mui/material';
import '~/components/GlobalStyles';
import styles from './RecoverPassword.module.scss';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import useValidation from '~/components/UseValidation/useValidation';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import userService from '~/services/userServices';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        fontSize: '16px', // Tăng kích thước của nhãn
    },
    '& .MuiInputBase-input': {
        fontSize: '16px', // Tăng kích thước của đầu vào
    },
    '& .MuiOutlinedInput-root': {},
}));

function RecoverPassword() {
    const navigate = useNavigate();
    // check validation
    const [emailorUserName, setEmailOrUserName] = useState('');
    const emailValidation = useValidation({ value: '' });
    const [showToast, setShowToast] = useState(false);

    const handleRecoverPassword = async () => {
        const isEmailValid = emailValidation.validateEmail();
        const isExistedEmail = await userService.checkEmailAvailability(emailorUserName);
        if (isEmailValid && isExistedEmail.available === false) {
            // Xử lý gửi email
            const data = { email: emailorUserName };
            const respone = await userService.recoverPassword(data);
            if (respone.status === 200) {
                setShowToast(true);
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
            }
        } else {
            // Show message email not exists
            alert('Email không tồn tại nha má !!');
            // Handle validation errors
            // console.log('Validation failed. Please check the form.');
        }
    };
    return (
        <Container sx={{ minHeight: '40vh' }}>
            <Box>
                <CustomTypography
                    variant="h4"
                    gutterBottom
                    sx={{ mt: 5, fontWeight: 'bold', fontSize: '24px' }}
                >
                    MY ACCOUNT
                </CustomTypography>
                <CustomTypography variant="body1" gutterBottom>
                    Lost your password? Please enter your email address. You will receive a link to
                    create a new password via email.
                </CustomTypography>
                <CustomTextField
                    value={emailorUserName}
                    onChange={(e) => {
                        setEmailOrUserName(e.target.value);
                        emailValidation.setState({
                            ...emailValidation.state,
                            value: e.target.value,
                        });
                    }}
                    variant="outlined"
                    onBlur={emailValidation.validateEmail}
                    error={emailValidation.state.message !== ''}
                    helperText={emailValidation.state.message}
                    id="input-text-password"
                    label="UserName or Email"
                    fullWidth
                    sx={{
                        '& label': {
                            fontSize: '18px',
                        },
                        '& input': {
                            fontSize: '18px',
                        },
                        // make space for label in text field
                        '& .MuiInputBase-root': {
                            fontSize: '2rem',
                        },
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px', // Adjust the font size as needed
                        },
                        mt: 1,
                    }}
                />

                <Button
                    autoCapitalize="none"
                    variant="outlined"
                    sx={{
                        mb: 2,
                        mt: 2,
                        color: 'grey', // Màu chữ là màu xám
                        borderColor: 'grey', // Màu viền là màu xám
                        fontSize: '14px',
                    }}
                    onClick={handleRecoverPassword}
                >
                    Recover Password
                </Button>
                <ToastMessage2
                    message={
                        <Typography sx={{ textTransform: 'capitalize', fontSize: '14px' }}>
                            Vui lòng đăng nhập gmail của bạn để lấy lại mật khẩu
                        </Typography>
                    }
                    type={'success'}
                    setShowToast={setShowToast}
                    showToast={showToast}
                />
            </Box>
        </Container>
    );
}

export default RecoverPassword;
