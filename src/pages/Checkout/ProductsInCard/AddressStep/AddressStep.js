import { Box, Typography, Stack, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import styles from './AddressStep.module.scss';
import classNames from 'classnames/bind';
import ChooseAddress from './ChooseAddress';
import ShowDeliveryInformation from './ShowDeliveryInformation';
const cx = classNames.bind(styles);

const CustomizeTypography = styled(Typography)(({ fs }) => ({
    fontSize: fs || '16px',
}));

const CustomizeButton = styled(Button)(({ fs }) => ({
    fontSize: fs || '14px',
    marginTop: '8px',
}));

function AddressStep() {
    const navigate = useNavigate();

    const [deliveryAddress, setDeliveryAddress] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        // updatedFullName: '',
        // updatedPhoneNumber: '',
        // updatedAddress: '',
    });
    // Callback function để cập nhật địa chỉ khi người dùng chọn
    const handleAddressChange = (selectedAddress) => {
        // Make sure selectedAddress is defined before updating the state
        if (selectedAddress) {
            setDeliveryAddress({
                updatedFullName: selectedAddress.fullName || '',
                updatedPhoneNumber: selectedAddress.phoneNumber || '',
                updatedAddress: selectedAddress.address || '',
            });
        }
    };

    return (
        <Box sx={{ height: '100%' }}>
            {/* <ChooseAddress onAddressChange={handleAddressChange} /> */}

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4,
                    alignItems: 'center',
                }}
            >
                <Box>
                    {/* Pass the onDelete callback to the ShowDeliveryInformation component */}
                    <ShowDeliveryInformation
                        deliveryAddress={deliveryAddress}
                        // onDelete={handleDeleteAddress}
                    />
                </Box>
            </Stack>
            {/* <CustomizeButton
                sx={{ mt: 2, fontSize: '14px' }}
                variant="contained"
                onClick={() => {
                    navigate('/add-new-address');
                }}
            >
                Add A New Address
            </CustomizeButton> */}
        </Box>
    );
}
export default AddressStep;
