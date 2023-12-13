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
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity } from '~/redux/CartManagement/cartActions';
import { addToWishlist } from '~/redux/WishListManagement/wishlistActions';

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
        <Box sx={{ minHeight: '80vh', ml: 2, mr: 2 }}>
            <MakeProductDetailDescription />

            {/* some products suggestion */}
            <Box>
                {/* <CustomTypography sx={{ mt: 8, fontWeight: 'bold' }}>
                    You Might Also Like
                </CustomTypography> */}
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
            {/* <Box sx={{ display: 'flex', overflow: 'scroll', mt: 4 }}>
                {listAllProducts.map((imageIndex) => (
                    <MakeProductsCard
                        _id={imageIndex._id}
                        key={imageIndex._id}
                        images={imageIndex.images}
                        name={imageIndex.name}
                        price={imageIndex.price.toLocaleString()}
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
            </Box> */}
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
