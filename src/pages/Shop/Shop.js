<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
import {
    styled,
    Container,
    Box,
    Paper,
    Grid,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import BrandInformation from './Filter/BrandInformation';
import PriceInformation from './Filter/PriceInformation';
import Color from './Filter/Color';
import { MakeProductsCard } from '~/components/MakeProductCards/MakeProductCards';
import ProductsInShop from './ProductsInShop/ProductsInShop';
<<<<<<< HEAD
import PaginationControlled from './Pagination/Pagination';
=======
// import SortingProducts from './SortingProduct';
import TestPagination from './Pagination/p1';
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622

function Shop() {
    return (
        <Box sx={{ ml: 4 }}>
            <BasicGrid />
        </Box>
    );
}

export default Shop;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    fontSize: '16px',
}));

function BasicGrid() {
    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {/* this box for category, filter products */}
                    {/* <Box sx={{ border: '1px solid #333', mr: 12 }}> */}
                    <Box sx={{ border: '1px solid #333', mr: 6, ml: 3 }}>
                        <Typography
                            sx={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', p: 2 }}
                        >
                            All Categories
                        </Typography>
                        <Divider sx={{ ml: 4, mr: 4 }} />

                        {/* Filter by brand */}
                        <BrandInformation />
                        {/* Filter by Price */}
                        <PriceInformation />

                        {/* Filter by Color */}
                        {/* <Color/> */}
                    </Box>
                </Grid>

                {/* this box for item of website */}
                {/* display 16 products for 1 page */}
                <Grid item xs={9}>
                    {/* <Item><ProductsInShop/></Item> */}
<<<<<<< HEAD
                    <ProductsInShop />

                    {/* phân trang */}
                    <PaginationControlled />
=======
                    {/* <SortingProducts /> */}

                    {/* <ProductsInShop /> */}
                    <TestPagination />
                    {/* phân trang */}
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
                </Grid>
            </Grid>
        </Box>
    );
}
<<<<<<< HEAD
=======

function SortingProducts() {
    const [sorting, setSorting] = React.useState('');

    const handleChange = (event) => {
        setSorting(event.target.value);
    };
    const handleChangeSorting = (event) => {
        setSorting(event.target.value);
        // Thực hiện hành động sắp xếp danh sách sản phẩm tại đây
    };

    const [sortState, setSortState] = useState('none');
    const sortMethods = {
        none: { method: (a, b) => null },
        ascending: { method: undefined },
        descending: { method: (a, b) => (a > b ? -1 : 1) },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
        >
            {/* <Box sx={{ minWidth: '150px', mr: '60px', mb: 2 }}>
                <FormControl
                    fullWidth
                    sx={{
                        '& .MuiInputBase-root': {
                            fontSize: '1.4rem',
                        },
                        '& .MuiFormLabel-filled': {
                            fontSize: '16px',
                        },
                    }}
                >
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        Sorting
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sorting}
                        label="Sorting"
                        onChange={handleChange}
                    >
                        <MenuItem value="az">
                            <CustomTypography>Name: A - Z</CustomTypography>
                        </MenuItem>
                        <MenuItem value="za" fontSize="16px">
                            <CustomTypography>Name: Z - A</CustomTypography>
                        </MenuItem>
                        <MenuItem value="asc">
                            <CustomTypography>Price: Low - High</CustomTypography>
                        </MenuItem>
                        <MenuItem value="desc">
                            <CustomTypography>Price: High - Low</CustomTypography>
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box> */}

            <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
                <option value="DEFAULT" disabled>
                    None
                </option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
            <ul></ul>
        </Box>
    );
}
>>>>>>> aab4ce165ef233fb97ff67685ca469c5f1ecb622
