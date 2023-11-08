import React, { useState } from 'react';
import { Box, Button, Paper, Grid, Typography, TextField, Container, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CustomTypography from '../CustomTyporaphy/CustomTyporaphy';
import { CustomizeTextField } from '../CustomizeTextField/CustomizeTextField';
// import { Typography, TextField } from '~/Layouts/DefaultLayout';

const cx = classNames.bind(styles);
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CustomButton = styled(Button)(({ variant = 'contained', mt, ml, fs, width }) => ({
    variant,
    marginTop: mt || 20,
    marginLeft: ml || 0,
    fontSize: fs || '16px',
    display: 'flex',
    width: width || '200px',
    justifyContent: 'flex-start',
}));

// for person who don't have account
// function SignIn({ isCheckout }) {

function SignIn({ onSignIn }) {
    const handleLogin = () => {
        onSignIn(); // Gọi hàm callback onSignIn từ props
    };

    return (
        // <Box sx={{ height: '100%' }} className={cx('my-account-container')}>
        <Container sx={{ height: '100%', minHeight: '200vh' }}>
            {/*  sx={{minHeight: '600px'}} */}
            <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item sx={{ p: 2, height: '100%' }}>
                            <CustomTypography
                                fontWeight={700}
                                fontSize="20px"
                                className={cx('page-subheading')}
                                gutterBottom
                            >
                                Create an account
                            </CustomTypography>

                            <CustomTypography variant="body1" textAlign={'left'} gutterBottom>
                                Please enter your email address to create an account.
                            </CustomTypography>
                            <CustomTypography variant="body1" textAlign={'left'}>
                                Email address
                            </CustomTypography>

                            <CustomizeTextField
                                fullWidth={true}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                            />

                            {/* chỗ này cần check lại chiều ngang bất hợp lí */}

                            <CustomButton
                                variant="contained"
                                startIcon={<AccountCircleIcon />}
                                component={Link}
                                to="/register-account"
                            >
                                Create Account
                            </CustomButton>
                        </Item>
                    </Grid>

                    {/* Login */}
                    <Grid item xs={6}>
                        <Item sx={{ height: '100%', p: 2 }}>
                            <CustomTypography
                                fontWeight={700}
                                fontSize="20px"
                                className={cx('page-subheading')}
                                gutterBottom
                            >
                                Already Have An account
                            </CustomTypography>
                            <CustomTypography variant="body1" textAlign={'left'}>
                                Email address
                            </CustomTypography>
                            <CustomizeTextField
                                fullWidth={true}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                            />
                            <CustomTypography variant="body1" sx={{ textAlign: 'left', mt: 2 }}>
                                Password
                            </CustomTypography>
                            <CustomizeTextField
                                fullWidth={true}
                                id="outlined-basic"
                                label="Password"
                                type="password"
                                variant="outlined"
                            />

                            <CustomButton
                                variant="contained"
                                width="160px"
                                startIcon={<LockIcon />}
                                onClick={handleLogin}
                                // after logging in successfully --> href user to Home page
                                component={Link}
                                to="/"
                                sx={{ padding: '6px 20px' }}
                            >
                                Đăng Nhập
                            </CustomButton>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default SignIn;
