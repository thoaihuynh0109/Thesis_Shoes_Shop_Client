import React, { useState, useEffect } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { styled } from '@mui/system';

// search section
import { useSelector, useDispatch } from 'react-redux';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

export default function ProductGrid({
    getValue,
    page,
    PER_PAGE,
    _DATA,
    storeValue,
    filteredProducts,
    brandFilteredProducts,
    sorting,
    hasProducts,
    navigate,
}) {
    // const [showToast, setToast] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.search.searchTerm);

    const sortProducts = (data) => {
        switch (sorting) {
            case 'az':
                return data.sort((a, b) => a.title.localeCompare(b.title));
            case 'za':
                return data.sort((a, b) => b.title.localeCompare(a.title));
            case 'asc':
                return data.sort(
                    (a, b) =>
                        parseFloat(a.price.replace(/,/g, '').replace('đ', '')) -
                        parseFloat(b.price.replace(/,/g, '').replace('đ', '')),
                );
            case 'desc':
                return data.sort(
                    (a, b) =>
                        parseFloat(b.price.replace(/,/g, '').replace('đ', '')) -
                        parseFloat(a.price.replace(/,/g, '').replace('đ', '')),
                );
            default:
                return data;
        }
    };

    // without searching
    const renderProductCards = () => {
        let data;

        if (getValue) {
            const startIndex = (page - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;
            const paginatedData = storeValue.slice(startIndex, endIndex);
            data = paginatedData;
        } else {
            const productsToRender =
                filteredProducts.length > 0 ? filteredProducts : brandFilteredProducts;
            const filteredProducts2 = productsToRender.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            const startIndex = (page - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;
            const paginatedData = filteredProducts2.slice(startIndex, endIndex);
            data = sortProducts(paginatedData);
        }

        if (!hasProducts) {
            return (
                <Box style={{ width: '100%', textAlign: 'center', mt: 4 }}>
                    <EmptyCard message={'Không có sản phẩm phù hợp'} />
                </Box>
            );
        }

        return data.map((product, index) => (
            <Grid item xs={6} sm={3} md={3} key={index} style={{ display: 'flex', mb: 2 }}>
                <MakeProductsCard
                    productId={product.id}
                    onClick={() => navigate('/product-details')}
                    title={product.title}
                    price={product.price}
                    image={product.img}
                    rating={product.rating}
                    label={product.label}
                    minWidthCard={'210px'}
                    maxHeightCard={'210px'}
                    imgHeight={'140px'}
                    imgWidth={'150px'}
                    showToast={showToast}
                    setShowToast={setShowToast}
                    // show suitable toast message
                    toastMessage={toastMessage}
                    setToastMessage={setToastMessage}
                />
            </Grid>
        ));
    };

    return (
        <Box style={{ display: 'flex', flexWrap: 'wrap', minHeight: '500px' }}>
            {renderProductCards()}
            {/* show toast message after adding product to cart */}
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
