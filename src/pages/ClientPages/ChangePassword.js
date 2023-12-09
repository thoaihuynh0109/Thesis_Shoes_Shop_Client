import { Box, Container, TextField, Typography, Grid, styled, Paper } from '@mui/material';
import React, { useState } from 'react';

import CustomizeGridProfile from './Profile/CustomizeGridProfile';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { goBack } from '~/components/GoBack/GoBack';
import { CustomizeButtonPersonalAccount } from './Profile/PersonalAccount';
import userService from '~/services/userServices';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const user = JSON.parse(localStorage.getItem('user')) || '';

    const handleChangePassword = async () => {
        const data = {
            id: user._id,
            password: currentPassword,
            newPassword: newPassword,
        };
        const respone = await userService.changePassword(data);
        if (respone.status === 200) {
            alert('Đổi pass thành công !');
            setCurrentPassword('');
            setNewPassword('');
            setRePassword('');
        }
    };

    return (
        <Container sx={{ minHeight: '800px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Đổi Mật Khẩu
            </Typography>
            {/* input field */}

            <TextField
                label={'Mật Khẩu Hiện Tại'}
                textField={'Mật Khẩu Hiện Tại'}
                onChange={(e) => setCurrentPassword(e.target.value)}
                forPassword={true}
            />
            <TextField
                label={'Mật Khẩu Mới'}
                textField={'Mật Khẩu Mới'}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
                label={'Xác Nhận Mật Khẩu'}
                textField={'Xác Nhận Mật Khẩu'}
                onChange={(e) => setRePassword(e.target.value)}
            />

            {/* check if these field are empty */}
            <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                <CustomizeButtonPersonalAccount
                    onClick={handleChangePassword}
                    variant="contained"
                    // onClick={handleCheckTextField}
                >
                    Xác Nhận
                </CustomizeButtonPersonalAccount>

                {/* show error message */}
                {/* {error && (
                    <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
                        Vui lòng điền đầy đủ thông tin cá nhân.
                    </Typography>
                )} */}

                <CustomizeButtonPersonalAccount
                    variant="outlined"
                    // sx={{
                    //     pl: 4,
                    //     pr: 4,
                    // }}
                    onClick={goBack}
                >
                    Quay lại
                </CustomizeButtonPersonalAccount>
            </Box>
        </Container>
    );
}

export default ChangePassword;
