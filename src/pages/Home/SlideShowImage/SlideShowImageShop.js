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
                    <Item sx={{ p: 2, mb: 9, backgroundColor: '#c1bcbc' }}>
                        <CarouselImage />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            backgroundColor: '#c1bcbc',
                            borderRadius: '4px',
                            p: 1,
                            maxHeight: '445px',
                            cursor: 'pointer',
                        }}
                    >
                        <Box sx={{ display: 'flex', borderRadius: '4px', mt: '-4px', mb: '4px' }}>
                            <img
                                src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1702361770/Gimme-shoes-images/Logo/Cream_and_Blue_Creative_Shoes_Big_Sale_Facebook_Post_oxrrkv.png`}
                                alt={`item.title`}
                                height="175px"
                                width="90%"
                                style={{
                                    marginRight: '10px',
                                    borderRadius: '10px',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.opacity = 0.5)}
                                onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                            />
                            <img
                                src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1702361771/Gimme-shoes-images/Logo/Yellow_Modern_New_Arrival_Promotion_Instagram_Post_kck791.png`}
                                alt={`item.title`}
                                height="175px"
                                width="90%"
                                style={{
                                    borderRadius: '10px',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.opacity = 0.5)}
                                onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                            />
                        </Box>
                        <div className="hover-image-container">
                            <img
                                src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1702361773/Gimme-shoes-images/Logo/banner_4x_kxrma4.jpg`}
                                alt={'item.title'}
                                height="255px"
                                width="100%"
                                loading="lazy"
                                className="hover-image"
                            />
                            <div className="hover-overlay">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: 'white',
                                        fontSize: '16px',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'yellowGreen',
                                            color: 'yellowGreen',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    onClick={() => {
                                        navigate('/shop');
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
