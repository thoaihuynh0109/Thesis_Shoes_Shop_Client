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
