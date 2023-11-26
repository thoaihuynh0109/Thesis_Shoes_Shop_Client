import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import CustomTyporaphy from '~/components/CustomTyporaphy/CustomTyporaphy';
import { CustomizeButtonPersonalAccount } from '~/pages/ClientPages/Profile/PersonalAccount';

function ShowDeliveryInformation() {
    const navigate = useNavigate();
    const location = useLocation();

    const [deliveryAddress, setDeliveryAddress] = useState(location.state?.deliveryAddress || {});

    useEffect(() => {
        // Update the local state when the location state changes
        setDeliveryAddress(location.state?.deliveryAddress || {});
    }, [location.state]);

    const handleUpdateAddress = () => {
        // Navigate to the update address page and pass the deliveryAddress as state
        navigate('/update-address', { state: { deliveryAddress } });
    };

    return (
        <Box sx={{ border: '1px solid #ebebeb', width: '500px', p: 2 }}>
            <CustomTyporaphy
                variant="h4"
                gutterBottom
                sx={{ textTransform: 'capitalize', fontSize: '18px', fontWeight: 'bold' }}
            >
                địa chỉ nhận hàng của bạn:
            </CustomTyporaphy>
            <Box sx={{ border: '1px solid #ebebeb' }}></Box>
            <CustomTyporaphy
                variant="body2"
                mt={2}
                sx={{ fontSize: ' 16px', mb: 1, textTransform: 'capitalize' }}
            >
                Người Nhận Hàng: {deliveryAddress.fullName}
            </CustomTyporaphy>
            <CustomTyporaphy
                variant="body2"
                sx={{ fontSize: ' 16px', mb: 1, textTransform: 'capitalize' }}
            >
                Phone Number: {deliveryAddress.phoneNumber}
            </CustomTyporaphy>
            <CustomTyporaphy variant="body2">Address: {deliveryAddress.address}</CustomTyporaphy>
            <CustomizeButton
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleUpdateAddress}
                sx={{ fontSize: ' 16px', mt: 3, padding: '8px 20px 8px 20px' }}
            >
                Update
            </CustomizeButton>
        </Box>
    );
}

export default ShowDeliveryInformation;
