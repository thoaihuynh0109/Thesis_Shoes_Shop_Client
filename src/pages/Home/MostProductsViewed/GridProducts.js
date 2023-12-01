import React, { useState } from 'react';
import { Box, styled, Grid, Button, Container, Divider } from '@mui/material';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { ArrowBackIos } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
const ButtonContainer = styled(Button)({
    alignItems: 'center',
    justifyContent: 'center',
});

const products = [
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
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375580/Gimme-shoes-images/Adidas/Female/jd_HP3294_a_d4r8th_ak3gpn.png',
        title: 'RAPIDMOVE TRAINER',
        price: '3,200,000',
        rating: 3,
        label: false,
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700364891/Gimme-shoes-images/Adidas/tyle_running_trang_hp2757_01_standard_d50cb46326c3436682610a2d02b21c1d_464ae878e179491c97840eebfda414dc_grande_nanuat_tcwspk.png',
        title: 'FORUM LOW SHOES',
        price: '2,600,000',
        rating: 4,
        label: false,
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375101/Gimme-shoes-images/Puma/Suede_Brand_Love_k1wihf.png',
        title: 'Suede Brand Love',
        price: '2,350,000',
        rating: 4,
        label: true,
    },
    {
        id: 5,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375100/Gimme-shoes-images/Puma/SEASONS_Voyage_NITRO_3_dhfjcw.png',
        title: 'SEASONS Voyage NITRO™ 3',
        price: '2,400,000',
        rating: 4,
        label: true,
    },
    {
        id: 6,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700364892/Gimme-shoes-images/Adidas/4-9_jutp8f_zqsikt.png',
        title: 'TRAINER V SHOES',
        price: '2,200,000',
        rating: 4,
        label: false,
    },
    {
        id: 7,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700374884/Gimme-shoes-images/New%20Balance/FuelCell_2190.jgp_wksaga_djc1i7.png',
        title: 'FuelCell 2190',
        price: '3,289,765',
        rating: 5,
        label: false,
    },
    {
        id: 8,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700364892/Gimme-shoes-images/Adidas/gx7256-giay-adidas-galaxy-6-w-chinh-hang-gia-tot-den-king-shoes-3_zmtclo_gdtdte.png',
        title: 'GALAXY 6 SHOES',
        price: '1,800,000',
        rating: 3,
        label: false,
    },
    {
        id: 9,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375049/Gimme-shoes-images/Converse/Chuck_70_Jungle_Cloth_High_Top_y4nsoq_hetnmr.png',
        title: 'Chuck 70 Jungle Cloth High Top',
        price: '3,200,000',
        rating: 3,
        label: false,
    },
    {
        id: 10,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700364892/Gimme-shoes-images/Adidas/1548101847_stan_smith_shoes_white_cg6014_01_standard_pamqem_xojrnn.png',
        title: 'TRAINER V SHOES',
        price: '2,200,000',
        rating: 4,
        label: false,
    },
    {
        id: 11,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375057/Gimme-shoes-images/Converse/Converse_x_ADER_ERROR_Chuck_70_High_Top_jpomo7_jst0it.png',
        title: 'Converse x ADER ERROR Chuck 70 High Top',
        price: '2,585,000',
        rating: 5,
        label: false,
    },
    {
        id: 12,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375473/Gimme-shoes-images/Adidas/Female/download_c7hcyo_xevvnh.png',
        title: 'ASTIR SHOES',
        price: '2,800,000',
        rating: 5,
        label: false,
    },
    {
        id: 13,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700375515/Gimme-shoes-images/Adidas/Female/adidas-dropset-2-trainer-w-623876-hq8777_bpkscv_hf0zke.png',
        title: 'DROPSET 2 TRAINER',
        price: '3,500,000',
        rating: 5,
        label: false,
    },
    {
        id: 14,
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700366308/Gimme-shoes-images/Nike/Nike_Invincible_3_z3xcf2.png',
        title: 'Nike Invincible 3',
        price: '5,279,000',
        rating: 5,
        label: false,
    },
];

export default function ResponsiveViewedProducts() {
    const [currentImages, setCurrentImages] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

    const handleNext = () => {
        const updatedImages = [...currentImages];
        const nextIndices = [];

        for (let i = 0; i < currentImages.length; i++) {
            nextIndices[i] = (currentImages[i] + 1) % products.length;
            updatedImages[i] = nextIndices[i];
        }

        setCurrentImages(updatedImages);
    };

    const handlePrevious = () => {
        const updatedImages = [...currentImages];
        const previousIndices = [];

        for (let i = 0; i < currentImages.length; i++) {
            previousIndices[i] = (currentImages[i] - 1 + products.length) % products.length;
            updatedImages[i] = previousIndices[i];
        }

        setCurrentImages(updatedImages);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CustomTypography variant="h3" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                    MOST PRODUCTS VIEWED
                </CustomTypography>
                <Box>
                    <ButtonContainer onClick={handlePrevious} variant="contained" sx={{ mr: 2 }}>
                        <ArrowBackIos sx={{ fontSize: '24px', marginRight: '-25%' }} />
                    </ButtonContainer>
                    <ButtonContainer onClick={handleNext} variant="contained">
                        <ArrowForwardIosIcon sx={{ fontSize: '24px', margin: '0 auto' }} />
                    </ButtonContainer>
                </Box>
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ ml: 9, mt: 4 }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {currentImages.map((imageIndex) => (
                        <Grid item xs={6} sm={3} md={3} sx={{ display: 'flex' }}>
                            <MakeProductsCard
                                image={products[imageIndex].img}
                                title={products[imageIndex].title}
                                price={products[imageIndex].price}
                                rating={products[imageIndex].rating}
                                label={products[imageIndex].label}
                                // custom card
                                minWidthCard={'240px'}
                                maxHeightCard={'210px'}
                                imgHeight={'140px'}
                                imgWidth={'180px'}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            ;
        </Box>
    );
}
