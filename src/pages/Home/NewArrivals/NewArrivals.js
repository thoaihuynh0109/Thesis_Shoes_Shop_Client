// import React from 'react';
// import { Box, Container, Grid, Paper, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// // import { CustomTypography, CustomizeButton } from '~/Layouts/DefaultLayout';

// import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
// import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';

// function NewArrivals() {
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 border: '1px solid #f0f0f0',
//                 alignItems: 'start',
//                 bgcolor: '#f0f0f0',
//                 borderRadius: '10px',
//                 mt: '4px',
//             }}
//         >
//             <Box sx={{ flexGrow: 1, padding: '0 100px', objectFit: 'contain' }}>
//                 <img
//                     src="https://res.cloudinary.com/dd4gcajeh/image/upload/v1698238037/Gimme-shoes-images/New%20Balance/Fresh_Foam_X_More_Trail_v3.jgp_u65qgy.webp"
//                     alt="New Arrivals"
//                     height="380px"
//                     width="360px"
//                     // height="50%"
//                     // width="50%"
//                 />
//             </Box>
//             <Box sx={{ flexGrow: 1, marginRight: '50px', mt: '35px' }}>
//                 <CustomTypography
//                     variant="h2"
//                     sx={{ fontSize: '24px', fontWeight: 'bold' }}
//                     gutterBottom
//                 >
//                     Fresh Foam X More Trail v3
//                 </CustomTypography>
//                 <CustomTypography variant="body2" sx={{ fontSize: '20px' }} gutterBottom>
//                     New Products
//                 </CustomTypography>
//                 <CustomTypography
//                     variant="body2"
//                     sx={{ fontSize: '16px', textAlign: 'justify' }}
//                     gutterBottom
//                 >
//                     Whether you're hitting the trails for training or just to enjoy the scenery, you
//                     can keep your feet cool, comfortable and cushioned with the New Balance Fresh
//                     Foam X More Trail v3. This trail running shoe includes a synthetic/mesh upper
//                     for breathability, and a two-part Fresh Foam X midsole for exceptional comfort.
//                     Also featuring Toe Protect technology and our highest all-terrain stack height,
//                     these shoes help keep your feet protected from debris, no matter where you roam.
//                 </CustomTypography>
//                 {/* Need to href somewhere? */}
//                 <CustomizeButton variant="contained" sx={{ mt: 8 }}>
//                     Buy Now
//                 </CustomizeButton>
//             </Box>
//         </Box>
//     );
// }

// export default NewArrivals;

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { CustomizeButton } from '~/components/CustomizeButton/CustomizeButton';
import productService from '~/services/productServices';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { storeProductDetails } from '~/redux/ProductDetails/productDetailsActions';

import Loading from '~/pages/Home/Loading/Loading';
function NewArrivals() {
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Replace 'your_product_id' with the actual product ID
                const productID = '656f5ac507890ef58e7c4fd0';
                const product = await productService.getProductById(productID);
                setProductDetails(product);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, []);

    const handleNavigateToProductDetails = () => {
        const navigateToProdcut = {
            _id: productDetails._id,
            name: productDetails.name,
            images: productDetails.images,
            price: productDetails.price.toLocaleString(),
        };
        // Dispatch the action to store product details
        dispatch(storeProductDetails(navigateToProdcut));
        // Navigate to the product detail page
        navigate(`/product-details/${productDetails._id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                border: '1px solid #f0f0f0',
                alignItems: 'start',
                bgcolor: '#f0f0f0',
                borderRadius: '10px',
                mt: '4px',
            }}
        >
            <Box sx={{ flexGrow: 1, padding: '0 100px', objectFit: 'contain' }}>
                {productDetails && (
                    <img
                        src={productDetails.images}
                        alt={productDetails.name}
                        height="380px"
                        width="360px"
                    />
                )}
            </Box>
            <Box sx={{ flexGrow: 1, marginRight: '50px', mt: '35px' }}>
                {productDetails && (
                    <>
                        <CustomTypography
                            variant="h2"
                            sx={{ fontSize: '24px', fontWeight: 'bold' }}
                            gutterBottom
                        >
                            {productDetails.name}
                        </CustomTypography>
                        <CustomTypography variant="body2" sx={{ fontSize: '20px' }} gutterBottom>
                            New Products
                        </CustomTypography>
                        <CustomTypography
                            variant="body2"
                            sx={{ fontSize: '16px', textAlign: 'justify' }}
                            gutterBottom
                        >
                            Whether you're hitting the trails for training or just to enjoy the
                            scenery, you can keep your feet cool, comfortable and cushioned with the
                            New Balance Fresh Foam X More Trail v3. This trail running shoe includes
                            a synthetic/mesh upper for breathability, and a two-part Fresh Foam X
                            midsole for exceptional comfort. Also featuring Toe Protect technology
                            and our highest all-terrain stack height, these shoes help keep your
                            feet protected from debris, no matter where you roam.
                        </CustomTypography>
                        <CustomizeButton
                            variant="contained"
                            sx={{ mt: 8 }}
                            onClick={handleNavigateToProductDetails}
                        >
                            Buy Now
                        </CustomizeButton>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default NewArrivals;
