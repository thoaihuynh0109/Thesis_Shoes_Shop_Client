import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Grid, Typography, TextField, Container, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CustomTypography from '../CustomTyporaphy/CustomTyporaphy';
import { CustomizeTextField } from '../CustomizeTextField/CustomizeTextField';
import useValidation from '../UseValidation/useValidation';
import authService from '~/services/authServices';
import { ToastMessage2 } from '../MakeProductCards/MakeProductCards';

const cx = classNames.bind(styles);
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
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

function SignIn() {
    const [email, setEmail] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const emailValidation = useValidation({ value: '' });

    const navigate = useNavigate();
    const handleLogin = async () => {
        const data = {
            email,
            password,
        };

        const loginData = await authService.signIn(data);

        localStorage.setItem('user', JSON.stringify(loginData));
        // send info to login api
        navigate('/');
    };

    // create an account with email address
    const handleCreateAccount = () => {
        const data = {
            emailRegister,
        };
        // Email is validate
        const isEmailValid = emailValidation.validateEmail();

        if (isEmailValid) {
            // Save email to localStorage
            localStorage.setItem('userEmail', emailRegister);

            // navigate to register account page with email that filled into textfield
            navigate('/register-account', { state: { emailRegister } });

            // Set showToast to true after successful registration
            // setShowToast(true);
        } else {
            // Handle validation errors
            console.log('Validation failed. Please check the form.');
            setShowToast(true); // show message
        }
    };

    useEffect(() => {
        // Clear email from localStorage on component mount (page reload)
        localStorage.removeItem('userEmail');
    }, []);

    return (
        <Container sx={{ height: '100%', minHeight: '200vh' }}>
            <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item sx={{ p: 2, height: '100%' }}>
                            <CustomTypography
                                fontWeight={700}
                                fontSize="20px"
                                gutterBottom
                                textAlign="center"
                            >
                                Create an account
                            </CustomTypography>

                            <CustomTypography variant="body1" textAlign={'left'} gutterBottom>
                                Please enter your email address to create an account.
                            </CustomTypography>
                            <CustomTypography variant="body1" textAlign={'left'} sx={{ mb: 2 }}>
                                Email address
                            </CustomTypography>

                            {/* <CustomizeTextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                            /> */}

                            <CustomizeTextField
                                value={emailRegister}
                                onChange={(e) => {
                                    setEmailRegister(e.target.value);
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
                            <CustomButton
                                variant="contained"
                                startIcon={<AccountCircleIcon />}
                                onClick={handleCreateAccount}
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
                                textAlign={'center'}
                            >
                                Already Have An account
                            </CustomTypography>
                            <CustomTypography variant="body1" textAlign={'left'} sx={{ mb: 2 }}>
                                Email address
                            </CustomTypography>
                            <CustomizeTextField
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                fullWidth={true}
                                // id="outlined-basic"
                                label="Email"
                                variant="outlined"
                            />
                            <ToastMessage2
                                message="Vui Lòng Nhập Email!"
                                type="warning"
                                showToast={showToast}
                                setShowToast={setShowToast}
                            />
                            <CustomTypography variant="body1" sx={{ textAlign: 'left', mt: 2 }}>
                                Password
                            </CustomTypography>
                            <CustomizeTextField
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                fullWidth={true}
                                // id="outlined-basic"
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
