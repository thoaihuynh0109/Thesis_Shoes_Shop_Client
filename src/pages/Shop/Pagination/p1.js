import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import usePagination from './p2';
import shopData from './shop.json';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import { Search } from '@mui/icons-material';

export default function TestPagination() {
    // search product
    // const [products, setProducts] = useState(shopData.title);
    const [products, setProducts] = useState(shopData);
    const [searchVal, setSearchVal] = useState([]);

    const [storeValue, setStoreValue] = useState([]);
    const [getValue, setGetValue] = useState(false);

    const [currentImages, setCurrentImages] = useState([]);
    // trang đầu tiên
    let [page, setPage] = useState(1);
    const PER_PAGE = 6; // số lượng sản phẩm trên 1 trang

    // chia số trang dựa trên số lượng sản phẩm
    const count = Math.ceil(shopData.length / PER_PAGE);
    const _DATA = usePagination(shopData, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const navigate = useNavigate();
    useEffect(() => {
        setCurrentImages(Array.from({ length: _DATA.length }, (_, index) => index));
    }, []);

    const [sortState, setSortState] = useState('none');

    const sortMethods = {
        none: { method: (a, b) => null },
        ascending: { method: undefined },
        descending: { method: (a, b) => (a > b ? -1 : 1) },
    };

    // searching...
    function handleSearchClick() {
        if (!searchVal.trim()) {
            setProducts(shopData);
            return;
        }

        const filteredProducts = shopData.filter((item) =>
            item.title.toLowerCase().includes(searchVal.toLowerCase()),
        );

        setStoreValue(filteredProducts);
        setGetValue(true);
    }

    // searching with pagination
    function handleSearchClickPagination() {
        if (!searchVal.trim()) {
            setProducts(shopData);
            setGetValue(false);
            setPage(1);
            return;
        }

        const filteredProducts = shopData.filter((item) =>
            item.title.toLowerCase().includes(searchVal.toLowerCase()),
        );

        setStoreValue(filteredProducts);
        setGetValue(true);
        setPage(1);
    }

    const renderProductCards = () => {
        if (getValue) {
            return storeValue.map((product, index) => (
                <Grid item xs={6} sm={3} md={3} key={index} sx={{ display: 'flex', mb: 2 }}>
                    <MakeProductsCard
                        onClick={() => navigate('/product-details')}
                        title={product.title}
                        price={product.price}
                        image={product.img}
                        rating={product.rating}
                        label={product.label}
                        // custom minWidthCard
                        minWidthCard={'210px'}
                        maxHeightCard={'210px'}
                        imgHeight={'140px'}
                        imgWidth={'75%'}
                        key={index}
                    />
                </Grid>
            ));
        } else {
            return _DATA.currentData().map((product, index) => (
                <Grid item xs={6} sm={3} md={3} key={index} sx={{ display: 'flex', mb: 2 }}>
                    <MakeProductsCard
                        onClick={() => navigate('/product-details')}
                        title={product.title}
                        price={product.price}
                        image={product.img}
                        rating={product.rating}
                        label={product.label}
                        // custom minWidthCard
                        minWidthCard={'210px'}
                        maxHeightCard={'210px'}
                        imgHeight={'140px'}
                        imgWidth={'75%'}
                        key={index}
                    />
                </Grid>
            ));
        }
    };

    const renderProductCardsP = () => {
        if (getValue) {
            const startIndex = (page - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;
            const paginatedData = storeValue.slice(startIndex, endIndex);

            return paginatedData.map((product, index) => (
                <Grid item xs={6} sm={3} md={3} key={index} sx={{ display: 'flex', mb: 2 }}>
                    {/* // Render the product card with the necessary props */}
                    <MakeProductsCard
                        key={index}
                        onClick={() => navigate('/product-details')}
                        title={product.title}
                        price={product.price}
                        image={product.img}
                        rating={product.rating}
                        label={product.label}
                        minWidthCard={'210px'}
                        maxHeightCard={'210px'}
                        imgHeight={'140px'}
                        imgWidth={'75%'}
                    />
                </Grid>
            ));
        } else {
            return _DATA.currentData().map((product, index) => (
                <Grid item xs={6} sm={3} md={3} key={index} sx={{ display: 'flex', mb: 2 }}>
                    {/* // Render the product card with the necessary props */}
                    <MakeProductsCard
                        key={index}
                        onClick={() => navigate('/product-details')}
                        title={product.title}
                        price={product.price}
                        image={product.img}
                        rating={product.rating}
                        label={product.label}
                        minWidthCard={'210px'}
                        maxHeightCard={'210px'}
                        imgHeight={'140px'}
                        imgWidth={'75%'}
                    />
                </Grid>
            ));
        }
    };

    return (
        <Box p="5">
            <div>
                <TextField onChange={(e) => setSearchVal(e.target.value)} />
                {/* <Search onClick={handleSearchClick} /> */}
                <Search onClick={handleSearchClickPagination} />
            </div>

            {/* show products for each pagination and searching */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minHeight: '500px' }}>
                {/* {renderProductCards()} */}
                {renderProductCardsP()}
            </Box>

            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', minHeight: '500px' }}>
                {_DATA.currentData().map((product, index) => (
                    <Grid xs={6} sm={3} md={3} key={index} sx={{ display: 'flex', mb: 2 }}>
                        <MakeProductsCard
                            onClick={() => navigate('/product-details')}
                            title={product.title}
                            price={product.price}
                            image={product.img}
                            rating={product.rating}
                            label={product.label}
                            // custom minWidthCard
                            minWidthCard={'210px'}
                            maxHeightCard={'210px'}
                            imgHeight={'140px'}
                            imgWidth={'75%'}
                        />
                    </Grid>
                ))}
            </Box> */}

            <Box>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
}
