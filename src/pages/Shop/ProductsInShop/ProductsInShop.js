import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { products } from '~/components/MakeProductCards/MakeProductCards';
import { useNavigate } from 'react-router-dom';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';

import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import ResponsiveViewedProducts from '../../Home/MostProductsViewed/GridProducts';

function ProductsInShop() {
    return (
        <Box>
            <TestShop />
        </Box>
    );
}

export default ProductsInShop;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
}));

export const TestProducts = [
    {
        id: 1,
        img: 'https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg',
        title: 'Jordan',
        price: '3,600,000',
        rating: 4,
        label: false,
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698215220/Gimme-shoes-images/Adidas/adidas-rapidmove-trainers_udkzcn.jpg',
        title: 'RAPIDMOVE TRAINER',
        price: '3,200,000',
        rating: 3,
        label: false,
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698216174/Gimme-shoes-images/Adidas/if2649_wht_01_vkqpnt.jpg',
        title: 'FORUM LOW SHOES',
        price: '2,600,000',
        rating: 4,
        label: false,
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698222786/Gimme-shoes-images/Puma/Suede%20Brand%20Love.jpg',
        title: 'Suede Brand Love',
        price: '2,350,000',
        rating: 4,
        label: true,
    },
    {
        id: 5,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698222886/Gimme-shoes-images/Puma/SEASONS%20Voyage%20NITRO%E2%84%A2%203.jpg',
        title: 'SEASONS Voyage NITRO™ 3',
        price: '2,400,000',
        rating: 4,
        label: true,
    },
    {
        id: 6,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698216072/Gimme-shoes-images/Adidas/adidas-meerkleurig-Ftwbla-Negbas-Plaha-Trainer-V-Hardloopschoenen-Voor_pzznwb.jpg',
        title: 'TRAINER V SHOES',
        price: '2,200,000',
        rating: 4,
        label: false,
    },
    {
        id: 7,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698238039/Gimme-shoes-images/New%20Balance/FuelCell_2190.jgp_wksaga.webp',
        title: 'FuelCell 2190',
        price: '3,289,765',
        rating: 5,
        label: false,
    },
    {
        id: 8,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698226173/Gimme-shoes-images/Converse/Converse_x_Comme_des_Garc%CC%A7ons_PLAY_Chuck_70_Low_Top_wjnjbk.jpg',
        title: 'VANS SK8 HI',
        price: '3,055,000',
        rating: 3,
        label: false,
    },
    {
        id: 9,
        img: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/5b/53/45/5b534578-a065-d11b-e5d2-aebf5a4f62ab/cover.jpg/400x400cc.jpg',
        title: 'RAPIDMOVE TRAINER',
        price: '3,200,000',
        rating: 3,
        label: false,
    },
    {
        id: 10,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1698238025/Gimme-shoes-images/New%20Balance/327_smlqhs.webp',
        title: 'TRAINER V SHOES',
        price: '2,200,000',
        rating: 4,
        label: false,
    },
    {
        id: 11,
        img: 'https://ecdn.game4v.com/g4v-content/uploads/2021/07/game4v-anh-bia-3.jpg',
        title: 'Rengoku',
        price: '9,999,999',
        rating: 5,
        label: false,
    },
    {
        id: 12,
        img: 'https://i.pinimg.com/originals/36/3f/81/363f8103a45204786a1dff39547cfda9.jpg',
        title: 'Last',
        price: '9,999,999',
        rating: 5,
        label: false,
    },
    {
        id: 13,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXpm4ny5GI11GmXzg15iMMkrgeri9OKYvScWaec760Iav2DYoXbStyYw8PwNnA5jRgrQ&usqp=CAU',
        title: 'Smile',
        price: '9,999,999',
        rating: 5,
        label: false,
    },
    {
        id: 14,
        img: 'https://i.pinimg.com/originals/36/3f/81/363f8103a45204786a1dff39547cfda9.jpg',
        title: 'Mugen Train',
        price: '9,999,999',
        rating: 5,
        label: false,
    },
];

function TestShop() {
    const [currentImages, setCurrentImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentImages(Array.from({ length: TestProducts.length }, (_, index) => index));
    }, []);

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {currentImages.map((imageIndex) => (
                <Grid item xs={6} sm={3} md={3} key={imageIndex} sx={{ display: 'flex', mb: 2 }}>
                    {/* onClick={() => navigate('/detail-product')} */}
                    <MakeProductsCard
                        onClick={() => navigate('/product-details')}
                        title={TestProducts[imageIndex]?.title}
                        price={TestProducts[imageIndex]?.price}
                        image={TestProducts[imageIndex]?.img}
                        rating={TestProducts[imageIndex]?.rating}
                        label={TestProducts[imageIndex]?.label}
                        // custom minWidthCard
                        // minWidthCard={'240px'}
                        minWidthCard={'210px'}
                        maxHeightCard={'210px'}
                        imgHeight={'140px'}
                        imgWidth={'75%'}
                    />
                </Grid>
            ))}
        </Box>
    );
}
