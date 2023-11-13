import React from 'react';
import {
    Box,
    FormHelperText,
    Paper,
    Stack,
    Typography,
    IconButton,
    InputAdornment,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';

function AddUser() {
    const [firstName, setFirstName] = React.useState({
        value: '',
        message: '',
    });
    const [lastName, setLastName] = React.useState({
        value: '',
        message: '',
    });
    const [email, setEmail] = React.useState({
        value: '',
        message: '',
    });
    const [password, setPassword] = React.useState({
        value: '',
        message: '',
        isShow: false,
    });
    const [rePassword, setRePassword] = React.useState({
        value: '',
        message: '',
        isShow: false,
    });
    const [address, setAddress] = React.useState({
        value: '',
        message: '',
    });
    const [phone, setPhone] = React.useState({
        value: '',
        message: '',
    });

    const validateFirstName = () => {
        if (firstName.value.trim() === '') {
            setFirstName({
                ...firstName,
                message: 'Vui lòng nhập first name',
            });
            return;
        }
        setFirstName({ ...firstName, message: '' });
        return;
    };

    const validateLastName = () => {
        if (lastName.value.trim() === '') {
            setLastName({
                ...lastName,
                message: 'Vui lòng nhập last name',
            });
            return;
        }
        setLastName({ ...lastName, message: '' });
        return;
    };

    const validateEmail = () => {
        if (email.value.trim() === '') {
            setEmail({
                ...email,
                message: 'Vui lòng nhập email',
            });
            return;
        } else {
            let validEmail = email.value.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            if (validEmail) setEmail({ ...email, message: '' });
            else setEmail({ ...email, message: 'Email không hợp lệ' });
            return;
        }
    };

    const validatePassword = () => {
        if (password.value === '') {
            setPassword({
                ...password,
                message: 'Vui lòng nhập Password',
            });
            return;
        } else {
            if (password.value.length >= 6) setPassword({ ...password, message: '' });
            else setPassword({ ...password, message: 'Password phải từ 6 kí tự trở lên' });
            return;
        }
    };

    const validateRePassword = () => {
        if (rePassword.value === '') {
            setRePassword({
                ...rePassword,
                message: 'Vui lòng nhập Re-Password',
            });
            return;
        } else {
            if (rePassword.value.length >= 6) setRePassword({ ...rePassword, message: '' });
            else setRePassword({ ...rePassword, message: 'Re-Password phải từ 6 kí tự trở lên' });
            return;
        }
    };

    const handleShowPassword = () => {
        setPassword({ ...password, isShow: !password.isShow });
    };

    const handleShowRePassword = () => {
        setRePassword({ ...rePassword, isShow: !rePassword.isShow });
    };

    const handleCreate = () => {
        // call api to create new user
        console.log('ok');
    };
    const handleBack = () => {
        window.history.back(); // Quay trở lại trang trước
    };

    return (
        <Box>
            <CustomizeButton
                startIcon={<ArrowBackIosNewIcon />}
                sx={{ display: 'inline-flex', padding: '10px 30px 10px 0px', mb: '16px' }}
                onClick={handleBack}
            >
                Back
            </CustomizeButton>
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>New User</Typography>
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <Stack direction="row" sx={{ mb: '16px' }}>
                    <Box sx={{ width: '50%', mr: 2 }}>
                        <CustomizeTextField
                            label="First Name"
                            required
                            value={firstName.value}
                            error={firstName.message ? true : false}
                            variant="outlined"
                            placeholder="Enter First Name"
                            sx={{ width: '100%', mr: 2 }}
                            onBlur={validateFirstName}
                            onChange={(e) => setFirstName({ ...firstName, value: e.target.value })}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {firstName.message}
                        </FormHelperText>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <CustomizeTextField
                            label="Last Name"
                            required
                            value={lastName.value}
                            error={lastName.message ? true : false}
                            variant="outlined"
                            placeholder="Enter Last Name"
                            sx={{ width: '100%' }}
                            onBlur={validateLastName}
                            onChange={(e) => setLastName({ ...lastName, value: e.target.value })}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {lastName.message}
                        </FormHelperText>
                    </Box>
                </Stack>
                <Box sx={{ mb: '16px' }}>
                    <CustomizeTextField
                        label="Email"
                        fullWidth
                        required
                        value={email.value}
                        error={email.message ? true : false}
                        variant="outlined"
                        placeholder="Enter email"
                        onChange={(e) => setEmail({ ...email, value: e.target.value })}
                        onBlur={validateEmail}
                    />
                    <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                        {email.message}
                    </FormHelperText>
                </Box>

                <Stack direction="row" sx={{ mb: '16px' }}>
                    <Box sx={{ width: '50%', mr: 2 }}>
                        <CustomizeTextField
                            id="validation-outlined-input"
                            label="Password"
                            value={password.value}
                            error={password.message ? true : false}
                            required
                            type={password.isShow ? 'text' : 'password'}
                            sx={{ width: '100%', mr: 2 }}
                            variant="outlined"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword({ ...password, value: e.target.value })}
                            onBlur={validatePassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={handleShowPassword}>
                                            {password.isShow ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {password.message}
                        </FormHelperText>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <CustomizeTextField
                            id="validation-outlined-input"
                            label="Re-password"
                            value={rePassword.value}
                            error={rePassword.message ? true : false}
                            required
                            type={rePassword.isShow ? 'text' : 'password'}
                            sx={{ width: '100%' }}
                            variant="outlined"
                            placeholder="Enter Re-Password"
                            onChange={(e) =>
                                setRePassword({ ...rePassword, value: e.target.value })
                            }
                            onBlur={validateRePassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={handleShowRePassword}>
                                            {rePassword.isShow ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {rePassword.message}
                        </FormHelperText>
                    </Box>
                </Stack>
                <Box sx={{ mb: '16px' }}>
                    <CustomizeTextField
                        id="validation-outlined-input"
                        label="Address"
                        fullWidth
                        value={address.value}
                        error={address.message ? true : false}
                        variant="outlined"
                        placeholder="Enter Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
                <Box>
                    <CustomizeTextField
                        id="validation-outlined-input"
                        label="Phone Number"
                        value={phone.value}
                        error={phone.message ? true : false}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Box>

                <CustomizeButton onClick={handleCreate}>Create User</CustomizeButton>
            </Paper>
        </Box>
    );
}

export default AddUser;
