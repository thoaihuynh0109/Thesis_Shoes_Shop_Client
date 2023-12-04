import React, { useState, useEffect } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { TestProducts } from '../Shop/ProductsInShop/ProductsInShop';
import MakeProductDetailDescription from './MakeProductDetailDescription';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import productService from '~/services/productServices';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
const TestProducts = [
    {
        id: 1,
        img: 'https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg',
        title: 'Jordan',
        price: '3,600,000',
        rating: 4,
        label: false,
        labelNew: true,
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

function DetailsPage() {
    const [currentImages, setCurrentImages] = useState([0, 1, 2, 3]);
    const [listAllProducts, setListAllProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    // previous item
    const handleGoToPrevImage = () => {
        const firstImageIndex = currentImages[0];
        const prevImageIndex =
            (firstImageIndex - 1 + listAllProducts.length) % listAllProducts.length;
        setCurrentImages((prevImages) => [prevImageIndex, ...prevImages.slice(0, -1)]);
    };

    // next item
    const handleGoToNextImage = () => {
        const lastImageIndex = currentImages[currentImages.length - 1];
        const nextImageIndex = (lastImageIndex + 1) % listAllProducts.length;
        setCurrentImages((prevImages) => [...prevImages.slice(1), nextImageIndex]);
    };

    // call api
    useEffect(() => {
        const fetchProductData = async () => {
            const listAllProducts = await productService.getAllProduct();
            setListAllProducts(listAllProducts);
        };
        fetchProductData();
    }, []);

    return (
        <Box sx={{ minHeight: '150vh', ml: 2, mr: 2 }}>
            <MakeProductDetailDescription />
            {/* some products suggestion */}
            <Box>
                <CustomTypography sx={{ mt: 8, fontWeight: 'bold' }}>
                    You Might Also Like
                </CustomTypography>
                {/* next and back */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* <IconButton onClick={handlePreviousImage}> */}
                    {/* <IconButton onClick={handleGoToPrevImage}>
                        <Avatar>
                            <ArrowBackIosIcon sx={{ ml: '3px' }} />
                        </Avatar>
                    </IconButton>

                    <IconButton onClick={handleGoToNextImage}>
                        <Avatar>
                            <ArrowForwardIosIcon />
                        </Avatar>
                    </IconButton> */}
                </Box>
            </Box>

            {/* scroll image */}
            <Box sx={{ display: 'flex', overflow: 'scroll', mt: 4 }}>
                {listAllProducts.map((imageIndex) => (
                    <MakeProductsCard
                        _id={imageIndex._id}
                        key={imageIndex._id}
                        images={imageIndex.images}
                        name={imageIndex.name}
                        price={imageIndex.price}
                        rating={imageIndex.rating}
                        label={imageIndex.priceSale}
                        minWidthCard={'280px'}
                        maxHeightCard={'270px'}
                        showToast={showToast}
                        setShowToast={setShowToast}
                        // show suitable toast message
                        toastMessage={toastMessage}
                        setToastMessage={setToastMessage}
                    />
                ))}
            </Box>
            <ToastMessage2
                // message="Product added to cart!"
                message={toastMessage}
                type="success"
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Box>
    );
}

export default DetailsPage;
