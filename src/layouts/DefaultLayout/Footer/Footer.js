import React from 'react';
import classNames from 'classnames/bind';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Avatar, Box, styled } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MailIcon from '@mui/icons-material/Mail';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import styles from '../Footer/Footer.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const CustomizeFooterHeading = styled(Typography)(({}) => ({
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '22px',
}));

const CustomizeFooterText = styled(Typography)(({}) => ({
    fontSize: '14px',
}));

function Footer() {
    const navigate = useNavigate();
    return (
        <Box
            className={cx('footer', 'fixed-footer')}
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
                mb: -6,
            }}
        >
            <Container>
                <Grid container spacing={4}>
                    {/* Stores */}
                    <Grid item xs={12} md={3}>
                        <Box>
                            <img
                                src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1702262334/Gimme-shoes-images/Logo/Gimme_cropped_zcl77c.png"
                                height={'75%'}
                                width={'75%'}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            sx={{ fontSize: '14px', padding: '2px 28px', ml: 2, mr: 2, mt: 2 }}
                            onClick={() => {
                                navigate('/contact');
                                // Scroll to the top of the location
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            FIND STORES
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container>
                            {/* Products */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Box>
                                    <CustomizeFooterHeading>Products</CustomizeFooterHeading>
                                    <CustomizeFooterText sx={{ mb: 1 }}>
                                        Men Shoes
                                    </CustomizeFooterText>
                                    <CustomizeFooterText sx={{ mb: 1 }}>
                                        Women Shoes
                                    </CustomizeFooterText>
                                    <CustomizeFooterText sx={{ mb: 1 }}>
                                        Children Shoes
                                    </CustomizeFooterText>
                                </Box>
                            </Grid>
                            {/* About Us */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Box>
                                    <CustomizeFooterHeading>About Us</CustomizeFooterHeading>
                                    <CustomizeFooterText sx={{ mb: 1 }}>
                                        We are students from HCMUTE.
                                    </CustomizeFooterText>
                                    <CustomizeFooterText sx={{ mb: 1 }}>
                                        Huynh Quoc Thoai
                                    </CustomizeFooterText>
                                    <CustomizeFooterText sx={{ mb: 1 }}>
                                        Huynh Dang Khoa
                                    </CustomizeFooterText>
                                </Box>
                            </Grid>
                            {/* Contact */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Box>
                                    <CustomizeFooterHeading>Contact</CustomizeFooterHeading>
                                    <Stack direction="row" sx={{ mb: 2 }}>
                                        <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
                                            <LocationCityIcon fontSize="large" />
                                        </Avatar>
                                        <CustomizeFooterText sx={{ mt: 1 }}>
                                            Số 1 Võ Văn Ngân
                                        </CustomizeFooterText>
                                    </Stack>
                                    <Stack direction={'row'} sx={{ mb: 2 }}>
                                        <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
                                            <MailIcon fontSize="large" />
                                        </Avatar>
                                        <CustomizeFooterText sx={{ mt: 1 }}>
                                            gimme.shoes@ute.vn
                                        </CustomizeFooterText>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
                                            <SmartphoneIcon fontSize="large" />
                                        </Avatar>
                                        <CustomizeFooterText sx={{ mt: 1 }}>
                                            +84 234 567 8901
                                        </CustomizeFooterText>
                                    </Stack>
                                </Box>
                            </Grid>
                            {/* Follow */}
                            <Grid item xs={12} sm={6} md={3}>
                                <Box>
                                    <CustomizeFooterHeading>Follow</CustomizeFooterHeading>
                                    <Box sx={{ display: 'flex' }}>
                                        <Link
                                            href="https://www.facebook.com/"
                                            sx={{ mr: 2 }}
                                            target="_blank"
                                            color="inherit"
                                        >
                                            <Facebook
                                                sx={{ cursor: 'pointer', fontSize: 32 }}
                                                className={cx('footer-follow-icon')}
                                            />
                                        </Link>
                                        <Link
                                            href="https://www.instagram.com/"
                                            color="inherit"
                                            sx={{ pl: 1, pr: 1, mr: 2 }}
                                            target="_blank"
                                        >
                                            <Instagram
                                                sx={{ cursor: 'pointer', fontSize: 32 }}
                                                className={cx('footer-follow-icon')}
                                            />
                                        </Link>
                                        <Link
                                            href="https://www.twitter.com/"
                                            target="_blank"
                                            color="inherit"
                                        >
                                            <Twitter
                                                sx={{ cursor: 'pointer', fontSize: 32 }}
                                                className={cx('footer-follow-icon')}
                                            />
                                        </Link>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            {/* Copyright section */}
            <Box mt={6}>
                <Typography variant="body2" fontSize="17px" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link
                        color="inherit"
                        href="https://www.facebook.com/profile.php?id=100016889957630"
                        target="_blank"
                    >
                        Gimme Shoes
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
