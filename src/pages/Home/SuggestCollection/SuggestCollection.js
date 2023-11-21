import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
// import { CustomTypography, MakeProductsCard } from '~/Layouts/DefaultLayout';
import { ArrowBackIos } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';

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
        img: 'https://res.cloudinary.com/dd4gcajeh/image/upload/v1700364891/Gimme-shoes-images/Adidas/ultrabounce-shoes-core-black-hp5786-0_ev1uxk_hiytlr.png',
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
];

function SuggestCollection() {
    return (
        <Box sx={{ mt: 6 }}>
            <CustomTypography variant="h3" sx={{ fontSize: '24px', fontWeight: 'bold', mb: 2 }}>
                SUGGEST COLLECTION
            </CustomTypography>

            {/* <CustomBasicGrid /> */}
            <CustomSuggestCollection />
        </Box>
    );
}

export default SuggestCollection;

function CustomSuggestCollection() {
    const [currentImages, setCurrentImages] = useState([0, 1, 2, 3]);

    // previous item
    const handleGoToPrevImage = () => {
        const firstImageIndex = currentImages[0];
        const prevImageIndex = (firstImageIndex - 1 + products.length) % products.length;
        setCurrentImages((prevImages) => [prevImageIndex, ...prevImages.slice(0, -1)]);
    };

    // next item
    const handleGoToNextImage = () => {
        const lastImageIndex = currentImages[currentImages.length - 1];
        const nextImageIndex = (lastImageIndex + 1) % products.length;
        setCurrentImages((prevImages) => [...prevImages.slice(1), nextImageIndex]);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                sx={{ mr: '-12px', zIndex: 1, height: '40px', mt: '-5%', color: '#9d3030' }}
                onClick={handleGoToPrevImage}
            >
                <ArrowBackIos sx={{ fontSize: '36px' }} />
            </Button>
            <Container sx={{ display: 'flex', ml: -8, mr: -8, flexGrow: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    {currentImages.map((imageIndex) => (
                        <MakeProductsCard
                            key={products[imageIndex].id}
                            image={products[imageIndex].img}
                            title={products[imageIndex].title}
                            price={products[imageIndex].price}
                            rating={products[imageIndex].rating}
                            label={products[imageIndex].label}
                        />
                    ))}
                </Box>
            </Container>
            <Button
                sx={{ ml: '10px', height: '40px', mt: '-5%', color: '#9d3030' }}
                onClick={handleGoToNextImage}
            >
                <ArrowForwardIosIcon sx={{ fontSize: '36px', ml: '12px' }} />
            </Button>
        </Box>
    );
}
