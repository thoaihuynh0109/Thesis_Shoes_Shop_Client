import React from 'react';
import { Box, Button, Paper, Grid, Typography, TextField, Container, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CustomTypography from '../CustomTyporaphy/CustomTyporaphy';
import { CustomizeTextField } from '../CustomizeTextField/CustomizeTextField';
// import { Typography, TextField } from '~/Layouts/DefaultLayout';
import authService from '~/services/authServices';

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
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        const data = {
            email,
            password,
        };

        // Save email to localStorage

        const loginData = await authService.signIn(data);

        localStorage.setItem('user', JSON.stringify(loginData));
        // send info to login api
        navigate('/');
    };

    const handleRegisterAccount = () => {
        const data = {
            email,
        };

        // Save email to localStorage
        localStorage.setItem('userEmail', email);

        // Perform login logic if needed

        // Navigate to the desired location
        navigate('/register-account');
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
                                textAlign="center"
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
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                fullWidth={true}
                                // id="outlined-basic"
                                label="Email"
                                variant="outlined"
                            />

                            {/* chỗ này cần check lại chiều ngang bất hợp lí */}

                            <CustomButton
                                variant="contained"
                                startIcon={<AccountCircleIcon />}
                                // component={Link}
                                // to="/register-account"
                                onClick={handleRegisterAccount}
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
                            <CustomTypography variant="body1" textAlign={'left'}>
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
