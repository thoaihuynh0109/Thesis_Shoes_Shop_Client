import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, Box, IconButton, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ProductInformation from './ProductInformation';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { useDispatch } from 'react-redux';
import { setProductDetails } from '~/redux/ProductDetails/productDetailsActions';
import productService from '~/services/productServices';
import Loading from '../Home/Loading/Loading';

export default function MakeProductDetailDescription() {
    const { id } = useParams();

    const [productDetail, setProductDetail] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await productService.getProductById(id);

                if (response) {
                    setProductDetail(response);
                    setSelectedImage(response.images[0]);
                    setCurrentImageIndex(0);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };

    const handleNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % productDetail.images.length;
        setSelectedImage(productDetail.images[nextIndex]);
        setCurrentImageIndex(nextIndex);
    };

    const handlePreviousImage = () => {
        const previousIndex =
            (currentImageIndex - 1 + productDetail.images.length) % productDetail.images.length;
        setSelectedImage(productDetail.images[previousIndex]);
        setCurrentImageIndex(previousIndex);
    };

    if (!productDetail) {
        // Loading state or error handling
        return <Loading />;
    }

    return (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            maxHeight: '550px',
                            maxWidth: '720px',
                            bgcolor: '#f1f1f1',
                            borderRadius: '10px',
                            display: 'flex',
                            position: 'relative',
                        }}
                    >
                        <Box sx={{ minHeight: '600px', minWidth: '540px' }}>
                            {/* <CustomTypography>{productDetail.gender}</CustomTypography> */}

                            <img
                                // src={`${selectedImage}`}
                                src={productDetail.images}
                                alt={`Image ${productDetail.productId}`}
                                width="75%"
                                height="400px"
                                style={{
                                    marginTop: '12px',
                                    margin: '58px 75px',
                                }}
                            />
                        </Box>

                        {/* <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                ml: 2,
                                '&:hover': {
                                    background: 'transparent',
                                },
                            }}
                            onClick={handleNextImage}
                            disabled={productDetail.images.length <= 1}
                        >
                            <Avatar>
                                <NavigateNextIcon
                                    sx={{
                                        fontSize: 28,
                                        '&:hover': {
                                            color: 'greenyellow',
                                        },
                                    }}
                                />
                            </Avatar>
                        </IconButton>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '50px',
                                mr: 2,
                                '&:hover': {
                                    background: 'transparent',
                                },
                            }}
                            onClick={handlePreviousImage}
                            disabled={productDetail.images.length <= 1}
                        >
                            <Avatar>
                                <NavigateBeforeIcon
                                    sx={{
                                        fontSize: 28,
                                        '&:hover': {
                                            color: 'greenyellow',
                                        },
                                    }}
                                />
                            </Avatar>
                        </IconButton> */}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Render additional product information here */}
                    <ProductInformation product={productDetail} />
                </Grid>
            </Grid>
        </Box>
    );
}
