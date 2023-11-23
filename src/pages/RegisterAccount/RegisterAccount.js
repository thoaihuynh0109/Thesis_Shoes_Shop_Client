import { Box, Container, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RegisterAccount.module.scss';
import classNames from 'classnames/bind';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Popup from './Popup';
import PopupTest from './PopupTest';
import PropTypes from 'prop-types';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';

const cx = classNames.bind(styles);
const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};
// open, title, content
PopupTest.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

function RegisterAccount() {
    const location = useLocation();
    const [openDialog, setOpenDialog] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const { email: initialEmail } = location.state || '';
    // const [email, setEmail] = useState(initialEmail || '');
    const [password, setPassword] = useState('');

    // Retrieve email from localStorage
    const emailFromStorage = localStorage.getItem('userEmail') || '';
    const [email, setEmail] = useState(emailFromStorage);

    const handleRegister = () => {
        console.log({ firstName, lastName, email, password });
        // send data to register account api
    };

    useEffect(() => {
        // Clear email from localStorage on component mount (page reload)
        localStorage.removeItem('userEmail');
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container sx={{ minHeight: '800px' }}>
            <CustomTypography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Create An Account
            </CustomTypography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #757575',
                    p: 4,
                }}
            >
                <Box>
                    <CustomTypography variant="h5">Your Personal Information</CustomTypography>
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
                        onChange={(e) => setFirstName(e.target.value)}
                        label="First Name"
                        variant="outlined"
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
                        onChange={(e) => setLastName(e.target.value)}
                        label="Last Name"
                        variant="outlined"
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
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        variant="outlined"
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
                        onChange={(e) => setPassword(e.target.value)}
                        inputProps={{
                            style: {
                                width: 400,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            },
                        }}
                        label="Password"
                        variant="outlined"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ mt: 3, ml: 5 }}>
                    <img
                        src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1700587107/Gimme-shoes-images/Logo/shoes-art_tvopnl.webp"
                        alt="Register Account"
                        width={'600px'}
                        style={{
                            borderRadius: '8% 92% 6% 94% / 93% 12% 88% 7%',
                            boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2)',
                        }}
                        height={'495px'}
                    />
                </Box>
            </Box>
            <CustomizeButton
                variant="contained"
                sx={{ mt: 4, ml: 0, alignItems: 'flex-start', display: 'flex' }}
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleRegister}
            >
                Register
            </CustomizeButton>
        </Container>
    );
}

export default RegisterAccount;
