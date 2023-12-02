import React from 'react';
import { Box } from '@mui/material';
import PaymentMethod from './PaymentMethod';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

function PaymentStep() {
    const handleSelectPaymentMethod = (selectedMethod) => {
        // You can handle the selected payment method here
        console.log('Selected Payment Method:', selectedMethod);
        // Perform any additional actions based on the selected method
    };

    return (
        <Box>
            <CustomTypography sx={{ textTransform: 'capitalize', fontSize: '16px' }}>
                Chọn phương thức thanh toán
            </CustomTypography>

            <Box sx={{}}>
                {' '}
                <PaymentMethod onSelectPaymentMethod={handleSelectPaymentMethod} />
            </Box>
        </Box>
    );
}

export default PaymentStep;
