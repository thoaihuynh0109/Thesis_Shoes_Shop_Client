import {
    Box,
    Container,
    Typography,
    Stack,
    Checkbox,
    FormControlLabel,
    Paper,
    Button,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import styles from './AddressStep.module.scss';
import classNames from 'classnames/bind';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DialerSip } from '@mui/icons-material';
import ChooseAddress from './ChooseAddress';
const cx = classNames.bind(styles);

const CustomizeTypography = styled(Typography)(({ fs }) => ({
    fontSize: fs || '16px',
}));

const CustomizeButton = styled(Button)(({ fs }) => ({
    fontSize: fs || '14px',
    marginTop: '8px',
}));

function AddressStep() {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                {/* delivery address*/}
                <Box>
                    <CustomizeTypography variant="body1">
                        Choose a delivery address:
                    </CustomizeTypography>
                    {/* Choose address */}
                    <ChooseAddress />

                    <FormControlLabel
                        // increase font size for checkbox
                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: '22px' } }} />}
                        label={
                            <CustomizeTypography sx={{ fontSize: '15px' }}>
                                Use the delivery address as the billing address.
                            </CustomizeTypography>
                        }
                    />
                </Box>

                {/* billing address */}
                <Box>
                    <Box sx={{ ml: 29 }}>
                        <CustomizeTypography variant="body1">
                            Choose a billing address:
                        </CustomizeTypography>

                        <ChooseAddress />
                    </Box>
                </Box>
            </Stack>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}
            >
                <Box>
                    <ShowDeliveryInformation />
                </Box>
                <Box>
                    <ShowDeliveryInformation />
                </Box>
            </Stack>
            <CustomizeButton sx={{ mt: 2, fontSize: '14px' }} variant="contained">
                Add A New Address
            </CustomizeButton>
        </Box>
    );
}
export default AddressStep;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ShowDeliveryInformation() {
    return (
        <Box sx={{ border: '1px solid #ebebeb', width: '500px', p: 2 }}>
            <CustomizeTypography variant="h4" gutterBottom>
                YOUR DELIVERY ADDRESS
            </CustomizeTypography>
            <Box sx={{ border: '1px solid #ebebeb' }}></Box>
            <CustomizeTypography variant="body2" mt={2}>
                Luna Kei
            </CustomizeTypography>
            <CustomizeTypography variant="body2">Japan HCMUTE</CustomizeTypography>
            <CustomizeTypography variant="body2">
                Đệ Nhị Số 2 Võ Văn Ngân Đệ Tam Số 3 Võ Văn Ngân
            </CustomizeTypography>
            <CustomizeTypography variant="body2">
                HCMUTE Vip Pro Max, Alabama 09982
            </CustomizeTypography>
            <CustomizeTypography variant="body2">United States</CustomizeTypography>
            <CustomizeTypography variant="body2">0123</CustomizeTypography>
            <CustomizeTypography gutterBottom variant="body2">
                0123
            </CustomizeTypography>
            <CustomizeButton variant="contained" endIcon={<ArrowForwardIosIcon />}>
                Update
            </CustomizeButton>
        </Box>
    );
}
