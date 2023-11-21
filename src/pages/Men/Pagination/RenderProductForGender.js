import React, { useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';

export default function RenderProductForGender({
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
    selectedGender,
}) {
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

            // Filter products for males
            // const maleProducts = productsToRender.filter((product) => product.gender === 'Male');
            // dynamic
            const maleProducts = productsToRender.filter(
                (product) => product.gender === selectedGender,
            );

            const startIndex = (page - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;
            const paginatedData = sortProducts(maleProducts).slice(startIndex, endIndex);
            data = paginatedData;
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
                />
            </Grid>
        ));
    };

    return (
        <Box style={{ display: 'flex', flexWrap: 'wrap', minHeight: '500px' }}>
            {renderProductCards()}
        </Box>
    );
}

export function LoadMoreProduct({
    getValue,
    _DATA,
    storeValue,
    filteredProducts,
    brandFilteredProducts,
    sorting,
    hasProducts,
    navigate,
    selectedGender,
}) {
    const initialItemsToShow = 10;
    const itemsPerLoad = 15;

    const [visibleItems, setVisibleItems] = useState(initialItemsToShow);

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

    const renderProductCards = () => {
        let data;

        if (getValue) {
            const paginatedData = storeValue.slice(0, visibleItems);
            data = paginatedData;
        } else {
            const productsToRender =
                filteredProducts.length > 0 ? filteredProducts : brandFilteredProducts;

            // Filter products for males
            // const maleProducts = productsToRender.filter((product) => product.gender === 'Male');
            // dynamic
            const maleProducts = productsToRender.filter(
                (product) => product.gender === selectedGender,
            );

            const paginatedData = sortProducts(maleProducts);
            data = paginatedData.slice(0, visibleItems);
        }

        if (!hasProducts || data.length === 0) {
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
                    minWidthCard={'220px'}
                    maxHeightCard={'260px'}
                    imgHeight={'140px'}
                    marginRight={4}
                    imgWidth={'150px'}
                />
            </Grid>
        ));
    };

    // this button will load more products
    const handleButtonLoadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerLoad);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    minHeight: '500px',
                    marginLeft: '64px',
                }}
            >
                {renderProductCards()}
            </Box>

            <Button
                variant="contained"
                onClick={handleButtonLoadMore}
                sx={{ fontSize: '14px', padding: '8px 24px', mt: 2 }}
            >
                Load More
            </Button>
        </Box>
    );
}
