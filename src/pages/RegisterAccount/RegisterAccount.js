import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './RegisterAccount.module.scss';
import classNames from 'classnames/bind';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Popup from './Popup';
import PopupTest from './PopupTest';
import PropTypes from 'prop-types';
<<<<<<< HEAD
=======
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622

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
    const [openDialog, setOpenDialog] = useState(false);

    const handleRegister = () => {
        // ??? bruh bruh???
        setOpenDialog(true);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container sx={{ minHeight: '800px' }}>
<<<<<<< HEAD
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Create An Account
            </Typography>
            {/* input field */}
            <Box sx={{ border: '1px solid #757575', p: 4 }}>
                <Typography variant="h5">Your Personal Information</Typography>
                <Divider sx={{ style }} />
                <Typography
                    variant="body1"
                    textAlign={'left'}
                    gutterBottom
                    sx={{ mt: 2 }}
                >
                    First Name
                </Typography>
                <TextField
=======
            <CustomTypography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Create An Account
            </CustomTypography>
            {/* input field */}
            <Box sx={{ border: '1px solid #757575', p: 4 }}>
                <CustomTypography variant="h5">Your Personal Information</CustomTypography>
                <Divider sx={{ style }} />
                <CustomTypography variant="body1" textAlign={'left'} gutterBottom sx={{ mt: 2 }}>
                    First Name
                </CustomTypography>
                <CustomizeTextField
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
                    inputProps={{
                        style: {
                            width: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        },
                    }}
                    label="First Name"
                    variant="outlined"
                />
<<<<<<< HEAD
                <Typography
                    variant="body1"
                    textAlign={'left'}
                    sx={{ mt: 2 }}
                    gutterBottom
                >
                    Last Name
                </Typography>
                <TextField
=======
                <CustomTypography variant="body1" textAlign={'left'} sx={{ mt: 2 }} gutterBottom>
                    Last Name
                </CustomTypography>
                <CustomizeTextField
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
                    inputProps={{
                        style: {
                            width: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        },
                    }}
                    //id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                />
<<<<<<< HEAD
                <Typography
                    variant="body1"
                    textAlign={'left'}
                    sx={{ mt: 2 }}
                    gutterBottom
                >
                    User Name
                </Typography>
                <TextField
=======
                <CustomTypography variant="body1" textAlign={'left'} sx={{ mt: 2 }} gutterBottom>
                    User Name
                </CustomTypography>
                <CustomizeTextField
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
                    inputProps={{
                        style: {
                            width: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        },
                    }}
                    //id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                />
<<<<<<< HEAD
                <Typography
                    variant="body1"
                    textAlign={'left'}
                    sx={{ mt: 2 }}
                    gutterBottom
                >
                    Email
                </Typography>
                <TextField
=======
                <CustomTypography variant="body1" textAlign={'left'} sx={{ mt: 2 }} gutterBottom>
                    Email
                </CustomTypography>
                <CustomizeTextField
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
                    //id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    inputProps={{
                        style: {
                            width: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        },
                    }}
                />
<<<<<<< HEAD
                <Typography
                    variant="body1"
                    textAlign={'left'}
                    sx={{ mt: 2 }}
                    gutterBottom
                >
                    Password
                </Typography>
                <TextField
=======
                <CustomTypography variant="body1" textAlign={'left'} sx={{ mt: 2 }} gutterBottom>
                    Password
                </CustomTypography>
                <CustomizeTextField
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
                    inputProps={{
                        style: {
                            width: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        },
                    }}
                    //id="outlined-basic"
                    label="Password"
                    variant="outlined"
                />
            </Box>
            {/* end input field */}

<<<<<<< HEAD
            <Button
=======
            <CustomizeButton
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
                variant="contained"
                sx={{ mt: 4, ml: 0, alignItems: 'flex-start', display: 'flex' }}
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleOpenDialog}
            >
                Register
<<<<<<< HEAD
            </Button>
=======
            </CustomizeButton>
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622

            <PopupTest
                open={openDialog}
                handleClose={handleCloseDialog}
                title=" Success!"
                content="Create a New Account Successfully"
<<<<<<< HEAD
                isSuccess = {true}
=======
                isSuccess={true}
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
            />
        </Container>
    );
}

export default RegisterAccount;
