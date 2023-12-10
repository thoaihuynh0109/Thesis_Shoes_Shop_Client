import React, { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
// import { CustomTypography, MakeProductsCard } from '~/Layouts/DefaultLayout';
import { ArrowBackIos } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import productService from '~/services/productServices';

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
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [listLastest, setListLastest] = useState([]);

    // previous item
    const handleGoToPrevImage = () => {
        const firstImageIndex = currentImages[0];
        const prevImageIndex = (firstImageIndex - 1 + listLastest.length) % listLastest.length;
        setCurrentImages((prevImages) => [prevImageIndex, ...prevImages.slice(0, -1)]);
    };

    // next item
    const handleGoToNextImage = () => {
        const lastImageIndex = currentImages[currentImages.length - 1];
        const nextImageIndex = (lastImageIndex + 1) % listLastest.length;
        setCurrentImages((prevImages) => [...prevImages.slice(1), nextImageIndex]);
    };

    // call api
    useEffect(() => {
        const fetchData = async () => {
            const listProduct = await productService.getLastestProduct();
            setListLastest(listProduct);
        };
        fetchData();
    }, []);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                sx={{
                    mr: '-12px',
                    zIndex: 1,
                    height: '40px',
                    mt: '-5%',
                    // color: '#9d3030',
                    '&:hover': { backgroundColor: 'transparent' },
                    '&:focus': { outline: 'none' }, // Remove outline on focus
                }}
                onClick={handleGoToPrevImage}
                // Disable touch ripple effect
                disableTouchRipple
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
                    {listLastest.length > 0 &&
                        currentImages.map((product, index) => {
                            if (index <= listLastest.length) {
                                return (
                                    <MakeProductsCard
                                        key={product._id}
                                        _id={listLastest[product]._id}
                                        images={listLastest[product].images}
                                        name={listLastest[product].name}
                                        price={listLastest[product].price.toLocaleString()}
                                        rating={listLastest[product].rating}
                                        label={listLastest[product].priceSale}
                                        // labelNew={product.labelNew}
                                        // labelNew={true}
                                        sx={{ margin: '0 20px' }}
                                        mr={0}
                                        showToast={showToast}
                                        setShowToast={setShowToast}
                                        // show suitable toast message
                                        toastMessage={toastMessage}
                                        setToastMessage={setToastMessage}
                                    />
                                );
                            }
                        })}
                </Box>
            </Container>
            <Button
                sx={{
                    ml: '10px',
                    height: '40px',
                    mt: '-5%',
                    // color: '#9d3030',
                    // Remove outline on focus
                    '&:focus': { outline: 'none' },
                    '&:hover': { backgroundColor: 'transparent' },
                }}
                onClick={handleGoToNextImage}
                // Disable touch ripple effect
                disableTouchRipple
            >
                <ArrowForwardIosIcon sx={{ fontSize: '36px', ml: '12px' }} />
            </Button>
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
