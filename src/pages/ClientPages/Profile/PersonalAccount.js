import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
    Grid,
    styled,
    Paper,
} from '@mui/material';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import CustomizeGridProfile from './CustomizeGridProfile';
import { CustomizeTextField } from '~/components/CustomizeTextField /CustomizeTextField';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const CustomizeButtonPersonalAccount = styled(Button)(({ pl = 15, pr = 15 }) => ({
    marginTop: 4,
    paddingLeft: pl || 0,
    paddingRight: pr || 0,
    alignItems: 'center',
    marginLeft: 99,
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    fontSize: '14px',
    cursor: 'pointer',
}));

function PersonalAccount() {
    const [openDialog, setOpenDialog] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(false);

    const handleCheckTextField = () => {
        // Kiểm tra các textfield nếu rỗng
        if (!firstName || !lastName || !email || !username || !phoneNumber) {
            setError(true);
        } else {
            // Lưu thông tin cá nhân và thực hiện các hành động khác
            // ...
            setError(false);
            <Typography>ahiahi</Typography>;
        }
    };

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

    // back to the previous page
    function goBack() {
        window.history.back();
    }

    return (
        <Container sx={{ minHeight: '800px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Thông tin cá nhân
            </Typography>
            {/* input field */}

            <CustomizeGridProfile
                label={'First Name'}
                textField={'First Name'}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <CustomizeGridProfile
                label={'Last Name'}
                textField={'Last Name'}
                onChange={(e) => setLastName(e.target.value)}
            />
            <CustomizeGridProfile
                label={'Email'}
                textField={'Email'}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CustomizeGridProfile
                label={'Tên đăng nhập'}
                textField={'Tên đăng nhập'}
                onChange={(e) => setUsername(e.target.value)}
            />
            <CustomizeGridProfile
                label={'Số điện thoại'}
                textField={'Số điện thoại'}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {/* check if these field are empty */}
            <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                <CustomizeButtonPersonalAccount variant="contained" onClick={handleCheckTextField}>
                    Save Profile
                </CustomizeButtonPersonalAccount>

                {/* show error message */}
                {error && (
                    <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
                        Vui lòng điền đầy đủ thông tin cá nhân.
                    </Typography>
                )}

                <CustomizeButtonPersonalAccount
                    variant="outlined"
                    sx={{
                        pl: 4,
                        pr: 4,
                    }}
                    onClick={goBack}
                >
                    Quay lại
                </CustomizeButtonPersonalAccount>
            </Box>
        </Container>
    );
}

export default PersonalAccount;
