import React from 'react';
import classNames from 'classnames/bind';
import { Container, Box, Typography, Button, TextField, styled } from '@mui/material';
import '~/components/GlobalStyles';
import styles from './RecoverPassword.module.scss';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { CustomizeTextField } from '~/components/CustomizeTextField /CustomizeTextField';

const cx = classNames.bind(styles);

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        fontSize: '18px', // Tăng kích thước của nhãn
    },
    '& .MuiInputBase-input': {
        fontSize: '18px', // Tăng kích thước của đầu vào
    },
    '& .MuiOutlinedInput-root': {},
}));

function RecoverPassword() {
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
                    id="input-text-password"
                    label="UserName or Email"
                    variant="outlined"
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
                        // '& .MuiOutlinedInput-root': {
                        //   fontSize: '7rem',
                        // },
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
                        '&:hover': {
                            color: 'white', // Màu chữ khi hover là màu trắng
                            backgroundColor: 'var(--primary)', // Màu nền khi hover là màu xám
                            borderColor: 'grey', // Màu viền khi hover là màu xám
                        },
                    }}
                    onClick={() => {
                        alert('xss attack lỏd :)))');
                    }}
                >
                    Recover Password
                </Button>
            </Box>
        </Container>
    );
}

export default RecoverPassword;
