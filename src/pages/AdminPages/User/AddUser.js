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
import userService from '~/services/userServices';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import { FireTruck } from '@mui/icons-material';

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
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');

    const navigate = useNavigate();
    const specialCharRegexForFLName = /[\d!@#$%^&*()_+={};':"\\|,.<>/?`~]+/;
    const validateFirstName = () => {
        if (/\d/.test(firstName.value)) {
            setFirstName({
                ...firstName,
                message: 'Không Được Tồn Tại Số Trong Tên!',
            });
            return false;
        } else if (specialCharRegexForFLName.test(firstName.value)) {
            setFirstName({
                ...firstName,
                message: 'Không Được Tồn Tại Kí Tự Đặc Biệt Trong Tên!',
            });
            return false;
        } else if (firstName.value.trim() === '') {
            setFirstName({
                ...firstName,
                message: 'Vui lòng nhập first name',
            });
            return false;
        }
        setFirstName({
            ...firstName,
            message: '',
        });
        return true;
    };

    const validateLastName = () => {
        if (/\d/.test(lastName.value)) {
            setLastName({
                ...lastName,
                message: 'Không Được Tồn Tại Số Trong Tên!',
            });
            return false;
        } else if (specialCharRegexForFLName.test(lastName.value)) {
            setLastName({
                ...lastName,
                message: 'Không Được Tồn Tại Kí Tự Đặc Biệt Trong Tên!',
            });
            return false;
        } else if (lastName.value.trim() === '') {
            setLastName({
                ...lastName,
                message: 'Vui lòng nhập last name',
            });
            return false;
        }
        setLastName({
            ...lastName,
            message: '',
        });
        return true;
    };

    // check email must end with '@gmail.com'
    const validateEmail = () => {
        let validEmail = email.value.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); // @ and .
        if (email.value.trim() === '') {
            setEmail({
                ...email,
                message: 'Vui lòng nhập email',
            });
        } else {
            if (validEmail) {
                if (email.value.toLowerCase().endsWith('@gmail.com')) {
                    setEmail({
                        ...email,
                        message: '',
                    });
                    return true;
                } else {
                    setEmail({
                        ...email,
                        message: 'Must includes @gmail.com in your email',
                    });
                    return false;
                }
            } else {
                setEmail({ ...email, message: 'Email không chứa các ký tự đặc biệt' });
                // setEmail({ ...email, message: 'Email không hợp lệ' });
                return false;
            }
        }
    };

    const validatePassword = () => {
        if (password.value === '') {
            setPassword({
                ...password,
                message: 'Vui lòng nhập Password',
            });
        } else {
            if (password.value.length >= 6) setPassword({ ...password, message: '' });
            else setPassword({ ...password, message: 'Password phải từ 6 kí tự trở lên' });
        }
    };

    const validateRePassword = () => {
        if (rePassword.value === '') {
            setRePassword({
                ...rePassword,
                message: 'Vui lòng nhập Re-Password',
            });
        } else {
            if (rePassword.value.length >= 6) setRePassword({ ...rePassword, message: '' });
            else setRePassword({ ...rePassword, message: 'Re-Password phải từ 6 kí tự trở lên' });
        }
    };

    const validatePhone = () => {
        if (phone.value === '') {
            setPhone({
                ...phone,
                message: 'Vui Lòng Nhập Số Điện Thoại',
            });
            return false;
        } else {
            // Check for exactly 10 digits and no special characters
            let validPhone = phone.value.match(/^(0[3|5|7|8|9])[0-9]{8}$/);

            if (validPhone) {
                setPhone({
                    ...phone,
                    message: '',
                });
                return true;
            } else {
                setPhone({
                    ...phone,
                    message: 'Phone Number không hợp lệ',
                });
                return false;
            }
        }
    };

    const specialCharRegexEmail = /[!@#$%^&*()?":{}|<>`~]/; // adapt "Khánh" có dấu
    const validateAddress = () => {
        if (specialCharRegexEmail.test(address.value)) {
            setAddress({
                ...address,
                message: 'Không Được Tồn Tại Kí Tự Đặc Biệt Trong Address',
            });
            return false;
        } else if (address.value.trim() === '') {
            setAddress({
                ...address,
                message: 'Vui lòng nhập Address',
            });
            return false;
        }
        setAddress({
            ...address,
            message: '',
        });
        return true;
    };

    const handleShowPassword = () => {
        setPassword({ ...password, isShow: !password.isShow });
    };

    const handleShowRePassword = () => {
        setRePassword({ ...rePassword, isShow: !rePassword.isShow });
    };

    const checkError = () => {
        if (
            firstName.message !== '' ||
            lastName.message !== '' ||
            password.message !== '' ||
            rePassword.message !== '' ||
            email.message !== '' ||
            phone.message !== ''
        ) {
            return true;
        }
        return false;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!checkError())
            if (password.value === rePassword.value) {
                const data = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value,
                    address: address.value,
                    phone: phone.value,
                };
                const respone = await userService.createUser(data);

                // call api to create new user
                if (respone.status === 201) {
                    setMessage('Tạo user thành công');
                    setTypeMessage('success');
                    setFirstName({ value: '', message: '' });
                    setLastName({ value: '', message: '' });
                    setEmail({ value: '', message: '' });
                    setPassword({ value: '', message: '' });
                    setRePassword({ value: '', message: '' });
                    setAddress({ value: '', message: '' });
                    setPhone({ value: '', message: '' });
                    // navigate('/manage-user');
                } else {
                    setMessage('Tạo user thất bại');
                    setTypeMessage('error');
                }
            } else {
                setMessage('Mật khẩu không khớp');
                setTypeMessage('error');
            }
        else {
            setMessage('Vui lòng kiểm tra các trường đã nhập');
            setTypeMessage('error');
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
        }, 3000);
    };
    const handleBack = () => {
        navigate('/manage-user');
        // window.history.back(); // Quay trở lại trang trước
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
                <form onSubmit={handleCreate}>
                    <ToastMessage message={message} type={typeMessage} />
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
                                onChange={(e) =>
                                    setFirstName({ ...firstName, value: e.target.value })
                                }
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
                                onChange={(e) =>
                                    setLastName({ ...lastName, value: e.target.value })
                                }
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
                                onChange={(e) =>
                                    setPassword({ ...password, value: e.target.value })
                                }
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
                            onChange={(e) => setAddress({ ...address, value: e.target.value })}
                            onBlur={validateAddress}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {address.message}
                        </FormHelperText>
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
                            onBlur={validatePhone}
                            onChange={(e) => setPhone({ ...phone, value: e.target.value })}
                        />
                        <FormHelperText error sx={{ fontSize: '1.4rem' }}>
                            {phone.message}
                        </FormHelperText>
                    </Box>

                    <CustomizeButton type="submit">Create User</CustomizeButton>
                </form>
            </Paper>
        </Box>
    );
}

export default AddUser;
