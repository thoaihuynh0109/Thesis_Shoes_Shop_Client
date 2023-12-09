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
        const toLowerCase = (str) => str.toLowerCase();

        switch (sorting) {
            case 'az':
                return data.sort((a, b) => toLowerCase(a.name).localeCompare(toLowerCase(b.name)));
            case 'za':
                return data.sort((a, b) => toLowerCase(b.name).localeCompare(toLowerCase(a.name)));
            case 'asc':
                return data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            case 'desc':
                return data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            default:
                return data;
        }
    };

    // const sortProducts2 = (data) => {
    //     switch (sorting) {
    //         case 'az':
    //             return data.sort((a, b) => a.name.localeCompare(b.name));
    //         case 'za':
    //             return data.sort((a, b) => b.name.localeCompare(a.name));
    //         case 'asc':
    //             return data.sort(
    //                 (a, b) =>
    //                     // parseFloat(a.price.replace(/,/g, '').replace('đ', '')) -
    //                     // parseFloat(b.price.replace(/,/g, '').replace('đ', '')),
    //                     parseFloat(a.price) - parseFloat(b.price),
    //             );
    //         case 'desc':
    //             return data.sort(
    //                 (a, b) =>
    //                     // parseFloat(b.price.replace(/,/g, '').replace('đ', '')) -
    //                     // parseFloat(a.price.replace(/,/g, '').replace('đ', '')),
    //                     parseFloat(b.price) - parseFloat(a.price),
    //             );
    //         default:
    //             return data;
    //     }
    // };

    // render Product with searching
    const renderProductCards = () => {
        let data;

        if (getValue) {
            // For the entire dataset (storeValue)
            data = sortProducts(storeValue);

            // Paginate the sorted data
            // PER_PAGE: The number of products in 1 page - 8
            // page: total of page - 1
            const startIndex = (page - 1) * PER_PAGE; // 0
            // console.log('page in start index: ', page);
            // console.log('Start Index: ', startIndex);
            const endIndex = startIndex + PER_PAGE; // 8
            // console.log('End Index: ', endIndex);
            data = data.slice(startIndex, endIndex); // lấy sản phẩm trong list từ vị trí 0 --> 7 tương ứng với 8 sản phẩm
            // console.log('Data in Shop: ', data);
        } else {
            const productsToRender =
                filteredProducts.length > 0 ? filteredProducts : brandFilteredProducts;
            const filteredProducts2 = productsToRender.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );

            if (filteredProducts2.length > 0) {
                // Sort the filtered data
                data = sortProducts(filteredProducts2);

                // Paginate the sorted data
                const startIndex = (page - 1) * PER_PAGE;
                const endIndex = startIndex + PER_PAGE;
                data = data.slice(startIndex, endIndex);
                // console.log('page in start index2: ', page);
                // console.log('22_PER_PAGE: ', PER_PAGE);
                // console.log('22_Start Index: ', startIndex);
                // console.log('22_End Index: ', endIndex);
                // console.log('22_Data in Shop: ', data);
            } else {
                return (
                    <Box style={{ width: '100%', textAlign: 'center', mt: 4 }}>
                        <EmptyCard message={'No result is found'} />
                    </Box>
                );
            }
        }

        if (!hasProducts) {
            return (
                <Box style={{ width: '100%', textAlign: 'center', mt: 4 }}>
                    <EmptyCard message={'Không có sản phẩm phù hợp'} />
                </Box>
            );
        }

        return (
            data.length > 0 &&
            data.map((product, index) => (
                <Grid item xs={6} sm={3} md={3} key={index} style={{ display: 'flex', mb: 2 }}>
                    <MakeProductsCard
                        _id={product._id}
                        onClick={() => navigate('/product-details')}
                        name={product.name}
                        price={product.price.toLocaleString()}
                        images={product.images}
                        rating={product.rating}
                        label={product.priceSale}
                        minWidthCard={'210px'}
                        maxHeightCard={'210px'}
                        imgHeight={'140px'}
                        imgWidth={'150px'}
                        showToast={showToast}
                        marginRight={4}
                        setShowToast={setShowToast}
                        toastMessage={toastMessage}
                        setToastMessage={setToastMessage}
                    />
                </Grid>
            ))
        );
    };

    // render Product with searching
    const renderProductCards2 = () => {
        // initial
        let data;

        if (getValue) {
            // render product with pagination
            const startIndex = (page - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;
            const paginatedData = storeValue.slice(startIndex, endIndex);
            data = paginatedData;
        } else {
            // render product with pagination + with filtered
            const productsToRender =
                filteredProducts.length > 0 ? filteredProducts : brandFilteredProducts;
            const filteredProducts2 = productsToRender.filter(
                (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()),
                // product.name,
            );

            // console.log('filter này ne ahihi:', filteredProducts2);
            if (filteredProducts2.length > 0) {
                // console.log('List Product:', filteredProducts2);
                const startIndex = (page - 1) * PER_PAGE;
                const endIndex = startIndex + PER_PAGE;
                const paginatedData = filteredProducts2.slice(startIndex, endIndex);
                data = sortProducts(paginatedData);
            }
            // Update the state to reflect whether there are products or not
            else {
                return (
                    <Box style={{ width: '100%', textAlign: 'center', mt: 4 }}>
                        <EmptyCard message={'No result is found'} />
                    </Box>
                );
            }
        }

        if (!hasProducts) {
            return (
                <Box style={{ width: '100%', textAlign: 'center', mt: 4 }}>
                    <EmptyCard message={'Không có sản phẩm phù hợp'} />
                </Box>
            );
        }

        return (
            data.length > 0 &&
            data.map((product, index) => (
                <Grid item xs={6} sm={3} md={3} key={index} style={{ display: 'flex', mb: 2 }}>
                    <MakeProductsCard
                        _id={product._id}
                        onClick={() => navigate('/product-details')}
                        name={product.name}
                        price={product.price.toLocaleString()}
                        images={product.images}
                        rating={product.rating}
                        label={product.priceSale}
                        minWidthCard={'210px'}
                        maxHeightCard={'210px'}
                        imgHeight={'140px'}
                        imgWidth={'150px'}
                        showToast={showToast}
                        marginRight={4}
                        setShowToast={setShowToast}
                        // show suitable toast message
                        toastMessage={toastMessage}
                        setToastMessage={setToastMessage}
                    />
                </Grid>
            ))
        );
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
