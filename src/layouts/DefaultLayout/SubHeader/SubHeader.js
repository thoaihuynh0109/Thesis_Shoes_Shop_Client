import React from 'react';
import classNames from 'classnames/bind';
import styles from './SubHeader.module.scss';
import { Typography, Button, Box, Container, Stack, Divider, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

// import logo for website
import gimmeLogo from '~/assets/images/image-removebg-preview.png';
// Icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
// import { Typography } from '~/Layouts/DefaultLayout';

const cx = classNames.bind(styles);
const CustomAvatar = styled(Avatar)(({ mr }) => ({
    marginRight: mr || '16px',
}));
function SubHeader() {
    return (
        <Box>
            <Stack
                sx={{ marginTop: 12, mb: 4 }}
                direction="row"
                alignItems="center"
                justifyContent={'space-around'}
            >
                <Box className={cx('web-logo')}>
                    <Link to="/" title="GIMME SHOES">
                        <img src={gimmeLogo} alt="Logo" />
                    </Link>
                </Box>
                <Stack direction="row" alignItems="center">
                    <CustomAvatar>
                        <LocalShippingIcon fontSize="large" />
                    </CustomAvatar>
                    <Stack direction="column" spacing={0}>
                        {/* body1 makes the right font size */}
                        <CustomTypography variant="body1" align="left" className={cx('test-fontS')}>
                            FREE DELIVERY WORLDWIDE
                        </CustomTypography>
                        <CustomTypography variant="body1" align="left" fontSize={'14px'}>
                            On order over $100
                        </CustomTypography>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center">
                    <CustomAvatar>
                        <CloudUploadIcon fontSize="large" />
                    </CustomAvatar>
                    <Stack direction="column" spacing={0}>
                        <CustomTypography variant="body1" align="left">
                            UP TO 20% OFF COSY LAYERS
                        </CustomTypography>
                        <CustomTypography variant="body1" align="left" fontSize="14px">
                            Lorem ipsum dolor sit amet
                        </CustomTypography>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center">
                    <CustomAvatar>
                        <CardGiftcardIcon fontSize="large" />
                    </CustomAvatar>
                    <Stack direction="column" spacing={0}>
                        <CustomTypography variant="body1" align="left">
                            BUY 1 GET 1 FREE
                        </CustomTypography>
                        <CustomTypography variant="body1" align="left" fontSize="14px">
                            On order over $100
                        </CustomTypography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default SubHeader;
