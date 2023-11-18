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
import React from 'react';
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
    const [openDialog, setOpenDialog] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegister = () => {
        // ??? bruh bruh???
        //setOpenDialog(true);

        console.log({ firstName, lastName, email, password });
        // send data to register account api
    };

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
            {/* input field */}
            <Box sx={{ border: '1px solid #757575', p: 4 }}>
                <CustomTypography variant="h5">Your Personal Information</CustomTypography>
                <Divider sx={{ style }} />
                <CustomTypography variant="body1" textAlign={'left'} gutterBottom sx={{ mt: 2 }}>
                    First Name
                </CustomTypography>
                <CustomizeTextField
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
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
                <CustomTypography variant="body1" textAlign={'left'} sx={{ mt: 2 }} gutterBottom>
                    Last Name
                </CustomTypography>
                <CustomizeTextField
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
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
                <CustomTypography variant="body1" textAlign={'left'} sx={{ mt: 2 }} gutterBottom>
                    Email
                </CustomTypography>
                <CustomizeTextField
                    //id="outlined-basic"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
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
                <CustomTypography variant="body1" textAlign={'left'} sx={{ mt: 2 }} gutterBottom>
                    Password
                </CustomTypography>
                <CustomizeTextField
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
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

            <CustomizeButton
                variant="contained"
                sx={{ mt: 4, ml: 0, alignItems: 'flex-start', display: 'flex' }}
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleRegister}
            >
                Register
            </CustomizeButton>

            <PopupTest
                open={openDialog}
                handleClose={handleCloseDialog}
                title=" Success!"
                content="Create a New Account Successfully"
                isSuccess={true}
            />
        </Container>
    );
}

export default RegisterAccount;
