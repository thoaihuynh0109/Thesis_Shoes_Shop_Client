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
import { useNavigate, useParams } from 'react-router-dom';
import ToastMessage from '~/components/ToastMessage/ToastMessage';

function EditUser() {
    const { id } = useParams();
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

    React.useEffect(() => {
        async function fetchUser() {
            const user = await userService.getUserById(id);

            setFirstName({ value: user.firstName || '', message: '' });
            setLastName({ value: user.lastName || '', message: '' });
            setEmail({ value: user.email || '', message: '' });
            setPassword({ value: user.password || '', message: '' });
            setAddress({ value: user.address || '', message: '' });
            setPhone({ value: user.phone || '', message: '' });
        }
        fetchUser();
    }, []);

    // check validate for input textfields
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

    // validate without special characters
    // const validateFirstName = () => {
    //     if (/\d/.test(firstName.value)) {
    //         setFirstName({
    //             ...firstName,
    //             message: 'Không Được Tồn Tại Số Trong Tên!',
    //         });
    //         return false;
    //     } else if (firstName.value.trim() === '') {
    //         setFirstName({
    //             ...firstName,
    //             message: 'Vui lòng nhập first name',
    //         });
    //         return false;
    //     }
    //     setFirstName({
    //         ...firstName,
    //         message: '',
    //     });
    //     return true;
    // };

    // const validateLastName = () => {
    //     if (/\d/.test(lastName.value)) {
    //         setLastName({
    //             ...lastName,
    //             message: 'Không Được Tồn Tại Số Trong Tên!',
    //         });
    //         return false;
    //     } else if (lastName.value.trim() === '') {
    //         setLastName({
    //             ...lastName,
    //             message: 'Vui lòng nhập last name',
    //         });
    //         return false;
    //     }
    //     setLastName({
    //         ...lastName,
    //         message: '',
    //     });
    //     return true;
    // };

    // const validateEmail = () => {
    //     if (email.value.trim() === '') {
    //         setEmail({
    //             ...email,
    //             message: 'Vui lòng nhập email',
    //         });
    //         return;
    //     } else {
    //         let validEmail = email.value.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    //         if (validEmail) setEmail({ ...email, message: '' });
    //         else setEmail({ ...email, message: 'Email không hợp lệ' });
    //         return;
    //     }
    // };

    // check email must end with '@gmail.com'
    const validateEmail = () => {
        if (email.value.trim() === '') {
            setEmail({
                ...email,
                message: 'Vui lòng nhập email',
            });
        } else {
            let validEmail = email.value.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
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
            } else setEmail({ ...email, message: 'Email không hợp lệ' });
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

    // check error
    const checkError = () => {
        if (
            firstName.message !== '' ||
            lastName.message !== '' ||
            password.message !== '' ||
            email.message !== '' ||
            phone.message !== ''
        ) {
            return true;
        }
        return false;
    };

    const handleShowPassword = () => {
        setPassword({ ...password, isShow: !password.isShow });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        // call api to update user
        if (!checkError()) {
            const data = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
                address: address.value,
                phone: phone.value,
            };
            // call api to create new user
            const response = await userService.updateUser(id, data);

            if (response?.status === 200) {
                setMessage('Cập nhật user thành công');
                setTypeMessage('success');

                setTimeout(() => {
                    navigate('/manage-user');
                }, 3000);
            } else {
                setMessage('Cập nhật user thất bại');
                setTypeMessage('error');
            }
        } else {
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
            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Edit User</Typography>
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <form onSubmit={handleUpdate}>
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
                            disabled
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

                    <Box sx={{ width: '100%', mb: '16px' }}>
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

                    <Box sx={{ mb: '16px' }}>
                        <CustomizeTextField
                            id="validation-outlined-input"
                            label="Address"
                            value={address.value}
                            error={address.message ? true : false}
                            fullWidth
                            variant="outlined"
                            placeholder="Enter Address"
                            onBlur={validateAddress}
                            onChange={(e) => setAddress({ ...address, value: e.target.value })}
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

                    <CustomizeButton type="submit">Update User</CustomizeButton>
                    {message && typeMessage && (
                        <ToastMessage message={message} type={typeMessage} />
                    )}
                </form>
            </Paper>
        </Box>
    );
}

export default EditUser;
