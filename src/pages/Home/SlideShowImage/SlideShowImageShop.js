import React from 'react';
import { Grid, Paper, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CarouselImage from './CarouselImage';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
}));

export default function SlideShowImageShop() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 2, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item sx={{ p: 2, backgroundColor: '#c1bcbc' }}>
                        <CarouselImage />
                    </Item>
                </Grid>

                <Grid item xs={6}>
                    <Item sx={{ height: '100%', p: 2, backgroundColor: '#d9ecd9' }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            sx={{ height: '100%' }}
                        >
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    border: '1px solid #696183',
                                    borderRadius: '5px',
                                    mr: '-1px',
                                    backgroundColor: '#d9ecd9',
                                }}
                            >
                                <img
                                    src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375124/Gimme-shoes-images/Puma/Palermo_Sneakers_xsf4kf.png`}
                                    alt={'item.title'}
                                    height="180px"
                                    width="200px"
                                    loading="lazy"
                                />
                            </Grid>

                            <Grid
                                item
                                xs={6}
                                sx={{
                                    border: '1px solid #696183',
                                    borderRadius: '5px',
                                    backgroundColor: '#d9ecd9',
                                }}
                            >
                                <img
                                    src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375104/Gimme-shoes-images/Puma/Electrify_NITRO_2_x8xbrh.png`}
                                    alt={'item.title'}
                                    height="180px"
                                    width="200px"
                                    loading="lazy"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    mt: '0px',
                                    border: '1px solid #696183',
                                    borderRadius: '5px',
                                    backgroundColor: '#d9ecd9',
                                }}
                            >
                                <img
                                    src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375324/Gimme-shoes-images/Nike/Female/1960142320_zm_pnlsf4_fjuzuw.png`}
                                    alt={'item.title'}
                                    height="200px"
                                    width="auto"
                                    loading="lazy"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="Outlined"
                            sx={{ mt: -4, fontSize: '16px', color: '#0d6efd' }}
                            onClick={() => {
                                navigate('/shop');
                                // Scroll to the top of the location
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Shop Now
                        </Button>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
