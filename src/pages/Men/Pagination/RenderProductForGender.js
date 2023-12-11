import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import productService from '~/services/productServices';
import categoryService from '~/services/categoryServices';

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
    const initialItemsToShow = 8;
    const itemsPerLoad = 8;

    const [visibleItems, setVisibleItems] = useState(initialItemsToShow);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [listAllProducts, setListAllProducts] = useState([]);

    // call api

    useEffect(() => {
        const fetchProductByCategory = async () => {
            const listAllProducts2 = await productService.getProductByCategory(selectedGender);
            // const listAllProducts = await productService.getAllProduct();
            console.log('List cate for male: ', listAllProducts2);
            // console.log('List cate for male22:', listAllProducts);
            setListAllProducts(listAllProducts2);
        };
        fetchProductByCategory();
    }, []);

    const sortProducts = (data) => {
        switch (sorting) {
            case 'az':
                return data.sort((a, b) => a.name.localeCompare(b.name));
            case 'za':
                return data.sort((a, b) => b.name.localeCompare(a.name));
            case 'asc':
                return data.sort(
                    (a, b) =>
                        // parseFloat(a.price.replace(/,/g, '').replace('đ', '')) -
                        // parseFloat(b.price.replace(/,/g, '').replace('đ', '')),
                        parseFloat(a.price) - parseFloat(b.price),
                );
            case 'desc':
                return data.sort(
                    (a, b) =>
                        // parseFloat(b.price.replace(/,/g, '').replace('đ', '')) -
                        // parseFloat(a.price.replace(/,/g, '').replace('đ', '')),
                        parseFloat(b.price) - parseFloat(a.price),
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
                (product) => product.category === selectedGender,
                // console.log(product.category),
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

        // show 4 products in rows
        return (
            <Grid container spacing={2}>
                {data.length > 0 &&
                    data.map((product, index) => (
                        // <Grid item key={product._id} xs={12} sm={6} md={3}>
                        <Grid item key={product._id} xs={12} sm={6} md={3} lg={3} xl={2}>
                            <MakeProductsCard
                                key={product._id}
                                _id={product._id}
                                images={product.images}
                                name={product.name}
                                price={product.price.toLocaleString()}
                                rating={product.rating}
                                label={product.priceSale}
                                // labelNew={product.labelNew}
                                // labelNew={true}
                                sx={{ margin: '0 20px' }}
                                minWidthCard={'210px'}
                                maxHeightCard={'220px'}
                                imgHeight={'140px'}
                                imgWidth={'150px'}
                                showToast={showToast}
                                setShowToast={setShowToast}
                                // show suitable toast message
                                toastMessage={toastMessage}
                                setToastMessage={setToastMessage}
                            />
                        </Grid>
                    ))}
            </Grid>
        );
    };

    // Check if the "Load More" button should be visible
    const isLoadMoreVisible = visibleItems < listAllProducts.length;

    // Handle the "Load More" button click
    const handleButtonLoadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerLoad);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                {/* , flexDirection: 'column' */}
                <Box sx={{ display: 'flex' }}>
                    {/* , flexDirection: 'column'  */}
                    <Box
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            minHeight: '500px',
                            // marginLeft: '64px',
                        }}
                    >
                        {renderProductCards()}
                        {/* {renderProductCards()} */}

                        <ToastMessage2
                            // message="Product added to cart!"
                            message={toastMessage}
                            type="success"
                            showToast={showToast}
                            setShowToast={setShowToast}
                        />
                    </Box>
                </Box>
            </Box>
            {/* hide button when there is no product to load more */}
            {isLoadMoreVisible && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handleButtonLoadMore}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            fontSize: '14px',
                            padding: '8px 24px',
                            mt: 2,
                        }}
                    >
                        Load More
                    </Button>
                </Box>
            )}
        </Box>
    );
}
