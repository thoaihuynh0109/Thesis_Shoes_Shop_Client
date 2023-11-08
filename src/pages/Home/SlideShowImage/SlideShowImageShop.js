import React from 'react';
import { Grid, Paper, Box} from '@mui/material';
import { styled } from '@mui/material/styles';
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
    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item sx={{ p: 2 }}>
                        <CarouselImage />
                    </Item>
                </Grid>

                <Grid item xs={6}>
                    <Item sx={{ height: '100%', p: 2 }}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="flex-end"
                            sx={{ height: '100%' }}
                        >
                            <Grid item xs={6}>
                                <img
                                    src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1698214558/Gimme-shoes-images/Nike/Nike%20Air%20Max%2090%20GORE-TEX.jpg`}
                                    alt={'item.title'}
                                    height="140px"
                                    width="100%"
                                    loading="lazy"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <img
                                    src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1698214835/Gimme-shoes-images/Adidas/4-9_jutp8f.jpg`}
                                    alt={'item.title'}
                                    height="140px"
                                    width="100%"
                                    loading="lazy"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: '-4px' }}>
                                <img
                                    src={`https://res.cloudinary.com/dd4gcajeh/image/upload/v1698226178/Gimme-shoes-images/Converse/Converse_x_GOLF_WANG_Chuck_70_Flames_High_Top_dbfbzd.jpg`}
                                    alt={'item.title'}
                                    height="240px"
                                    width="100%"
                                    loading="lazy"
                                />
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
