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

import CustomizeGridProfile from './Profile/CustomizeGridProfile';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import { goBack } from '~/components/GoBack/GoBack';

import { CustomizeButtonPersonalAccount } from './Profile/PersonalAccount';

function ChangePassword() {
    return (
        <Container sx={{ minHeight: '800px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Đổi Mật Khẩu
            </Typography>
            {/* input field */}

            <CustomizeGridProfile
                label={'Mật Khẩu Hiện Tại'}
                textField={'Mật Khẩu Hiện Tại'}
                // onChange={(e) => setFirstName(e.target.value)}
                forPassword={true}
            />
            <CustomizeGridProfile
                label={'Mật Khẩu Mới'}
                textField={'Mật Khẩu Mới'}
                // onChange={(e) => setLastName(e.target.value)}
            />
            <CustomizeGridProfile
                label={'Xác Nhận Mật Khẩu'}
                textField={'Xác Nhận Mật Khẩu'}
                // onChange={(e) => setEmail(e.target.value)}
            />

            {/* check if these field are empty */}
            <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                <CustomizeButtonPersonalAccount
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
