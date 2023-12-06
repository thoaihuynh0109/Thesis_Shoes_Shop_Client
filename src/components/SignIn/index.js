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
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const emailValidation = useValidation({ value: '' });
    const passwordValidation = useValidation({ value: '' });

    const navigate = useNavigate();
    // const isEmailValid = emailValidation.validateEmail();
    // const isPasswordValid = passwordValidation.validatePassword();
    const handleLogin = async () => {
        const isEmailValid = emailValidation.validateEmail();
        const isPasswordValid = passwordValidation.validatePassword();

        if (isEmailValid && isPasswordValid) {
            const data = {
                email,
                password,
            };

            //
            const loginData = await authService.signIn(data);
            navigate('/');

            // add to local storage
            localStorage.setItem('user', JSON.stringify(loginData));
            // send info to login api
        } else {
            setShowToast(true);
            setToastMessage('Please check the information of account.');
            setTypeMessage('warning');
        }
    };

    // enter to login
    const handleKeyPress = (e) => {
        const isEmailValid = emailValidation.validateEmail();
        const isPasswordValid = passwordValidation.validatePassword();
        if (e.key === 'Enter') {
            e.preventDefault();
            // Kiểm tra xem email và password có giá trị không
            if (isEmailValid && isPasswordValid) {
                handleLogin();
            } else {
                // Nếu cả hai trường đều có giá trị, thực hiện đăng nhập
                setShowToast(true);
                setToastMessage('Please enter both email and password.');
                setTypeMessage('warning');
            }
        }
    };

    //  lắng nghe sự kiện keydown
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup: Remove event listener khi component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleRegisterAccount = () => {
        navigate('/register-account');
    };

    const handleForgotPassword = () => {
        navigate('/recover-password');
    };

    return (
        <Container sx={{ height: '100%', minHeight: '200vh' }}>
            <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={2}>
                    {/* Login */}
                    <Box item xs={6} sx={{ display: 'flex', mt: 4 }}>
                        <Item sx={{ height: '100%', p: 2, ml: 8, mr: 8, mt: 2 }}>
                            <CustomTypography
                                fontWeight={700}
                                fontSize="20px"
                                className={cx('page-subheading')}
                                gutterBottom
                                textAlign={'center'}
                                sx={{ mt: 2 }}
                            >
                                Already Have An account
                            </CustomTypography>
                            <CustomTypography
                                variant="body1"
                                textAlign={'left'}
                                sx={{ mt: 2, mb: 1 }}
                            >
                                Email address
                            </CustomTypography>
                            <CustomizeTextField
                                wd="400px"
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
                                onKeyDown={handleKeyPress} // Đặt hàm xử lý key press ở đây
                            />
                            <ToastMessage2
                                message="Vui Lòng Nhập Email!"
                                type="warning"
                                showToast={showToast}
                                setShowToast={setShowToast}
                            />
                            <CustomTypography
                                variant="body1"
                                sx={{ textAlign: 'left', mt: 2, mb: 1 }}
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
                                onKeyDown={handleKeyPress}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    mt: 4,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    width="160px"
                                    startIcon={<LockIcon />}
                                    onClick={handleLogin}
                                    // after logging in successfully --> href user to Home page
                                    sx={{ padding: '6px 20px' }}
                                >
                                    <CustomTypography>Sign In</CustomTypography>
                                </Button>
                                <CustomTypography
                                    sx={{
                                        textTransform: 'capitalize',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '16px',
                                    }}
                                >
                                    don't have account?{' '}
                                    <CustomTypography
                                        sx={{
                                            color: 'blue',
                                            fontWeight: '800',
                                            ml: 1,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                opacity: 0.6,
                                            },
                                        }}
                                        onClick={handleRegisterAccount}
                                    >
                                        sign up
                                    </CustomTypography>
                                </CustomTypography>
                            </Box>
                            <CustomTypography
                                sx={{
                                    mt: 4,
                                    fontSize: 16,
                                    textTransform: 'capitalize',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.6,
                                        fontWeight: 'bold',

                                        color: 'blue',
                                    },
                                }}
                                onClick={handleForgotPassword}
                            >
                                forgot password?
                            </CustomTypography>
                        </Item>
                        <Box
                            sx={{
                                mt: 4,
                            }}
                        >
                            <img
                                src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1701067535/Gimme-shoes-images/Logo/best-shoe-brands-nike-asics-celine_ltwk6l.webp"
                                alt="Shoes Sign In"
                                width={'600px'}
                                height={'400px'}
                                style={{
                                    borderRadius: '31% 69% 23% 77% / 66% 18% 82% 34%',
                                    mt: 8,
                                    boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.95)',
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
                <ToastMessage2
                    message={toastMessage}
                    type={typeMessage}
                    showToast={showToast}
                    setShowToast={setShowToast}
                />
            </Box>
        </Container>
    );
}

export default SignIn;
