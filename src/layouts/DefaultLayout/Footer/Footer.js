import React from 'react';
import classNames from 'classnames/bind';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, Start, Twitter } from '@mui/icons-material';
import { Avatar, Box, styled } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MailIcon from '@mui/icons-material/Mail';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import styles from '../Footer/Footer.module.scss';
const cx = classNames.bind(styles);

const CustomTypographyTitle = styled(Typography)(({}) => ({
    fontWeight: 'bold',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '8px',
}));

const CustomTypographyContent = styled(Typography)(({}) => ({
    fontSize: '14px',
    display: 'flex',
    color: 'text.secondary',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
}));

function Footer() {
    return (
        <Box
            // component="footer"
            className={cx(' footer', 'fixed-footer')}
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
                mb: -6,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    {/* Contact Us section */}
                    <Grid item xs={12} sm={3}>
                        <CustomTypographyTitle>CONTACT US</CustomTypographyTitle>
                        <Box>
                            <Stack direction="row" sx={{ mb: 2 }}>
                                <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
                                    <LocationCityIcon fontSize="large" />
                                </Avatar>
                                <CustomTypographyContent>Số 1 Võ Văn Ngân</CustomTypographyContent>
                            </Stack>

                            <Stack direction={'row'} sx={{ mb: 2 }}>
                                <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
                                    <MailIcon fontSize="large" />
                                </Avatar>
                                <CustomTypographyContent>
                                    gimme.shoes@ute.vn
                                </CustomTypographyContent>
                            </Stack>

                            <Stack direction={'row'}>
                                <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
                                    <SmartphoneIcon fontSize="large" />
                                </Avatar>
                                <CustomTypographyContent>+84 234 567 8901</CustomTypographyContent>
                            </Stack>
                        </Box>
                    </Grid>

                    {/* ABOUT US section */}
                    <Grid item xs={12} sm={3}>
                        <CustomTypographyTitle>ABOUT US</CustomTypographyTitle>
                        <CustomTypographyContent mt={2}>
                            We are student come HCMUTE.
                        </CustomTypographyContent>
                    </Grid>

                    {/* ACCOUNT section */}
                    <Grid item xs={12} sm={3}>
                        <CustomTypographyTitle>ACCOUNT?</CustomTypographyTitle>
                        <CustomTypographyContent color="text.secondary" mt={2}>
                            We are student come HCMUTE.
                        </CustomTypographyContent>
                    </Grid>

                    {/* Follow Us section */}
                    <Grid item xs={12} sm={3}>
                        <CustomTypographyTitle>FOLLOW US</CustomTypographyTitle>
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
                            <Link href="https://www.twitter.com/" target="_blank" color="inherit">
                                <Twitter
                                    sx={{ cursor: 'pointer', fontSize: 32 }}
                                    className={cx('footer-follow-icon')}
                                />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright section */}
                <Box mt={5}>
                    <Typography
                        variant="body2"
                        fontSize="17px"
                        color="text.secondary"
                        align="center"
                    >
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
            </Container>
        </Box>
    );
}

export default Footer;

// function Footer() {
//     return (
//         <Box
//             className={cx('footer', 'fixed-footer')}
//             sx={{
//                 backgroundColor: '#f2f2f2',
//                 padding: '20px',
//                 textAlign: 'center',
//                 position: 'fixed',
//                 left: 0,
//                 bottom: 0,
//                 width: '100%',
//                 zIndex: 91, // Adjust as needed
//             }}
//         >
//             <Container maxWidth="lg">
//                 <Grid container spacing={5}>
//                     {/* Contact Us section */}
//                     <Grid item xs={12} sm={3}>
//                         <CustomTypographyTitle>CONTACT US</CustomTypographyTitle>
//                         <Box>
//                             <Stack direction="row" sx={{ mb: 2 }}>
//                                 <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
//                                     <LocationCityIcon fontSize="large" />
//                                 </Avatar>
//                                 <CustomTypographyContent>Số 1 Võ Văn Ngân</CustomTypographyContent>
//                             </Stack>

//                             <Stack direction={'row'} sx={{ mb: 2 }}>
//                                 <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
//                                     <MailIcon fontSize="large" />
//                                 </Avatar>
//                                 <CustomTypographyContent>
//                                     gimme.shoes@ute.vn
//                                 </CustomTypographyContent>
//                             </Stack>

//                             <Stack direction={'row'}>
//                                 <Avatar sx={{ mr: 2 }} className={cx('footer-icon')}>
//                                     <SmartphoneIcon fontSize="large" />
//                                 </Avatar>
//                                 <CustomTypographyContent>+84 234 567 8901</CustomTypographyContent>
//                             </Stack>
//                         </Box>
//                     </Grid>

//                     {/* ABOUT US section */}
//                     <Grid item xs={12} sm={3}>
//                         <CustomTypographyTitle>ABOUT US</CustomTypographyTitle>
//                         <CustomTypographyContent mt={2}>
//                             We are student come HCMUTE.
//                         </CustomTypographyContent>
//                     </Grid>

//                     {/* ACCOUNT section */}
//                     <Grid item xs={12} sm={3}>
//                         <CustomTypographyTitle>ACCOUNT?</CustomTypographyTitle>
//                         <CustomTypographyContent color="text.secondary" mt={2}>
//                             We are student come HCMUTE.
//                         </CustomTypographyContent>
//                     </Grid>

//                     {/* Follow Us section */}
//                     <Grid item xs={12} sm={3}>
//                         <CustomTypographyTitle>FOLLOW US</CustomTypographyTitle>
//                         <Box sx={{ display: 'flex' }}>
//                             <Link
//                                 href="https://www.facebook.com/"
//                                 sx={{ mr: 2 }}
//                                 target="_blank"
//                                 color="inherit"
//                             >
//                                 <Facebook
//                                     sx={{ cursor: 'pointer', fontSize: 32 }}
//                                     className={cx('footer-follow-icon')}
//                                 />
//                             </Link>
//                             <Link
//                                 href="https://www.instagram.com/"
//                                 color="inherit"
//                                 sx={{ pl: 1, pr: 1, mr: 2 }}
//                                 target="_blank"
//                             >
//                                 <Instagram
//                                     sx={{ cursor: 'pointer', fontSize: 32 }}
//                                     className={cx('footer-follow-icon')}
//                                 />
//                             </Link>
//                             <Link href="https://www.twitter.com/" target="_blank" color="inherit">
//                                 <Twitter
//                                     sx={{ cursor: 'pointer', fontSize: 32 }}
//                                     className={cx('footer-follow-icon')}
//                                 />
//                             </Link>
//                         </Box>
//                     </Grid>
//                 </Grid>

//                 {/* Copyright section */}
//                 <Box mt={5}>
//                     <Typography
//                         variant="body2"
//                         fontSize="17px"
//                         color="text.secondary"
//                         align="center"
//                     >
//                         {'Copyright © '}
//                         <Link
//                             color="inherit"
//                             href="https://www.facebook.com/profile.php?id=100016889957630"
//                             target="_blank"
//                         >
//                             Gimme Shoes
//                         </Link>{' '}
//                         {new Date().getFullYear()}
//                         {'.'}
//                     </Typography>
//                 </Box>
//             </Container>
//         </Box>
//     );
// }

// export default Footer;
