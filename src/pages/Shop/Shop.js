import React from 'react';
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
import PaginationControlled from './Pagination/Pagination';

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
                    <ProductsInShop />

                    {/* phân trang */}
                    <PaginationControlled />
                </Grid>
            </Grid>
        </Box>
    );
}
