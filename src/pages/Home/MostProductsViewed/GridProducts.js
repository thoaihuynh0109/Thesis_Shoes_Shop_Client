// import React, { useState, useEffect } from 'react';
// import { Box, styled, Grid, Button, Container, Divider } from '@mui/material';
// import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
// import { ArrowBackIos } from '@mui/icons-material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
// import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
// import shopData from '~/pages/Shop/Pagination/shop.json';
// import productService from '~/services/productServices';
// const ButtonContainer = styled(Button)({
//     alignItems: 'center',
//     justifyContent: 'center',
// });

// export default function ResponsiveViewedProducts() {
//     const [currentImages, setCurrentImages] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
//     const [showToast, setShowToast] = useState(false);
//     const [toastMessage, setToastMessage] = useState('');
//     const [listLastest, setListLastest] = useState([]);
//     // call api

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const listProduct = await productService.getLastestProduct();
//                 setListLastest(listProduct);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleNext = () => {
//         const updatedImages = [...currentImages];
//         const nextIndices = [];

//         for (let i = 0; i < currentImages.length; i++) {
//             nextIndices[i] = (currentImages[i] + 1) % listLastest.length;
//             updatedImages[i] = nextIndices[i];
//         }

//         setCurrentImages(updatedImages);
//     };

//     const handlePrevious = () => {
//         const updatedImages = [...currentImages];
//         const previousIndices = [];

//         for (let i = 0; i < currentImages.length; i++) {
//             previousIndices[i] = (currentImages[i] - 1 + listLastest.length) % listLastest.length;
//             updatedImages[i] = previousIndices[i];
//         }

//         setCurrentImages(updatedImages);
//     };

//     const visibleProducts = listLastest.slice(0, 8); // Display only the first 8 items

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <CustomTypography variant="h3" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
//                     MOST PRODUCTS VIEWED
//                 </CustomTypography>
//                 <Box>
//                     <ButtonContainer onClick={handlePrevious} variant="contained" sx={{ mr: 2 }}>
//                         <ArrowBackIos sx={{ fontSize: '24px', marginRight: '-25%' }} />
//                     </ButtonContainer>
//                     <ButtonContainer onClick={handleNext} variant="contained">
//                         <ArrowForwardIosIcon sx={{ fontSize: '24px', margin: '0 auto' }} />
//                     </ButtonContainer>
//                 </Box>
//             </Box>
//             <Divider sx={{ mt: 1, mb: 2 }} />
//             <Box sx={{ ml: 0, mt: 4 }}>
//                 <Grid container spacing={{ xs: 2, md: 3 }}>
//                     {visibleProducts.map((product, index) => (
//                         <Grid item xs={6} sm={3} md={3} key={product._id}>
//                             <MakeProductsCard
//                                 key={product._id}
//                                 _id={product._id}
//                                 images={product.images}
//                                 name={product.name}
//                                 price={product.price.toLocaleString()}
//                                 rating={product.rating}
//                                 label={product.priceSale}
//                                 // sx={{ margin: '0 20px' }}

//                                 showToast={showToast}
//                                 setShowToast={setShowToast}
//                                 toastMessage={toastMessage}
//                                 setToastMessage={setToastMessage}
//                             />
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>
//             <ToastMessage2
//                 message={toastMessage}
//                 type="success"
//                 showToast={showToast}
//                 setShowToast={setShowToast}
//             />
//         </Box>
//     );
// }
import React, { useState, useEffect } from 'react';
import { Box, styled, Grid, Button, Container, Divider } from '@mui/material';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { ArrowBackIos } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import productService from '~/services/productServices';
import { useNavigate } from 'react-router-dom';
const ButtonContainer = styled(Button)({
    alignItems: 'center',
    justifyContent: 'center',
});

export default function ResponsiveViewedProducts() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [listLastest, setListLastest] = useState([]);

    // call api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const listProduct = await productService.getLastestProduct();
                setListLastest(listProduct);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listLastest.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listLastest.length) % listLastest.length);
    };

    const visibleProducts = listLastest.slice(currentIndex, currentIndex + 8); // Display only the first 8 items

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CustomTypography variant="h3" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                    MOST PRODUCTS VIEWED
                </CustomTypography>
                {/* <Box>
                    <ButtonContainer onClick={handlePrevious} variant="contained" sx={{ mr: 2 }}>
                        <ArrowBackIos sx={{ fontSize: '24px', marginRight: '-25%' }} />
                    </ButtonContainer>
                    <ButtonContainer onClick={handleNext} variant="contained">
                        <ArrowForwardIosIcon sx={{ fontSize: '24px', margin: '0 auto' }} />
                    </ButtonContainer>
                </Box> */}
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ ml: 4, mt: 3 }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {visibleProducts.map((product, index) => (
                        <Grid
                            item
                            xs={6}
                            sm={3}
                            md={3}
                            key={index}
                            style={{ display: 'flex', mb: 1 }}
                        >
                            <MakeProductsCard
                                _id={product._id}
                                onClick={() => navigate('/product-details')}
                                name={product.name}
                                price={product.price.toLocaleString()}
                                images={product.images}
                                rating={product.rating}
                                label={product.priceSale}
                                minWidthCard={'250px'}
                                maxHeightCard={'260px'}
                                imgHeight={'140px'}
                                imgWidth={'150px'}
                                showToast={showToast}
                                marginRight={2}
                                setShowToast={setShowToast}
                                toastMessage={toastMessage}
                                setToastMessage={setToastMessage}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <ToastMessage2
                message={toastMessage}
                type="success"
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Box>
    );
}
