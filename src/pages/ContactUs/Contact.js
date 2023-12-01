import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Stack, Typography, Paper, TextField, Button } from '@mui/material';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import { styled } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import StoreIcon from '@mui/icons-material/Store';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import ContactInformation from './ContactInformation';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
const cx = classNames.bind(styles);

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ContactUs() {
    const [address, setAddress] = useState('');
    const [searchedAddress, setSearchedAddress] = useState('');

    const handleSearch = () => {
        // Thực hiện xử lý tìm kiếm với địa chỉ đã nhập
        // Ví dụ: Chuyển hướng đến địa chỉ Google Maps
        const defaultAddress = '01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh';
        const destinationAddress = searchedAddress || defaultAddress;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            address,
        )}&destination=${encodeURIComponent(destinationAddress)}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <Box className={cx('contact-container')}>
            <Stack direction="row" spacing={2} sx={{ p: 2, ml: 11 }}>
                <Grid
                    item
                    md={4}
                    sx={{ border: '1px solid #333', p: 2, maxWidth: '380px', borderRadius: '10px' }}
                >
                    <CustomTypography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                        HCMUTE
                    </CustomTypography>
                    <CustomTypography sx={{ wordWrap: 'break-word' }}>
                        01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh.
                    </CustomTypography>
                    <CustomTypography sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <PhoneEnabledIcon />
                        <span style={{ marginLeft: '8px' }}>(+84) 0123456</span>
                    </CustomTypography>
                    {/* <NestedList /> */}
                    <ContactInformation />

                    {/* <TextField
                        label="Search for directions"
                        variant="outlined"
                        size="small"
                        value={searchedAddress}
                        onChange={(e) => setSearchedAddress(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    /> */}
                    {/* <Button variant="contained" onClick={handleSearch} sx={{ mt: 2 }}>
                        Search
                    </Button> */}
                </Grid>

                {/* maps */}
                <Grid item md={8}>
                    <Box className={cx('map-area')} sx={{ borderRadius: '10px', mr: -99 }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485398611676!2d106.76933281022632!3d10.850637657776673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1697929063371!5m2!1svi!2s"
                            // width='100%'
                            // height = '100%'
                            // allowFullscreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="HCMUTE - location"
                        ></iframe>
                    </Box>
                </Grid>
            </Stack>
        </Box>
    );
}

export default ContactUs;
