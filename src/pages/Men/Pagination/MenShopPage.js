import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    IconButton,
    TextField,
    Typography,
    Pagination,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';

import usePagination from '~/pages/Shop/Pagination/PaginationManagement';
import shopData from '../shop.json';
import SearchIcon from '@mui/icons-material/Search';
import BrandFilterInformation from '~/pages/Shop/Pagination/BrandFilterInformation';
import PriceFilterInformation from '~/pages/Shop/Pagination/PriceFilterInformation';
import SortingSection from '~/pages/Shop/Pagination/SortingSection';
import RenderProductForGender from './RenderProductForGender';
import useProductFilter from '../Filter/MakeUseProductFilter';

export default function TestProductPagination() {
    const {
        products,
        searchVal,
        storeValue,
        getValue,
        currentImages,
        filteredProducts,
        hasProducts,
        brandFilteredProducts,
        page,
        PER_PAGE,
        count,
        _DATA,
        sorting,
        selectedPriceRange,
        selectedBrands,
        setSearchVal,
        handleChange,
        handleSearchClickPagination,
        handleBrandFilter,
        handlePriceFilter,
        handleSortChange,
    } = useProductFilter();

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {/* this box for category, filter products */}
                    <Box sx={{ border: '1px solid #333', mr: 6, ml: 3 }}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                p: 2,
                            }}
                        >
                            All Categories
                        </Typography>
                        <Divider sx={{ ml: 4, mr: 4 }} />
                        <BrandFilterInformation
                            handleBrandFilter={handleBrandFilter}
                            selectedBrands={selectedBrands}
                        />
                        <PriceFilterInformation
                            handlePriceFilter={handlePriceFilter}
                            selectedPriceRange={selectedPriceRange}
                        />
                    </Box>
                </Grid>

                {/* display 8 products for 1 page */}
                <Grid item xs={9}>
                    {/* Product Grid */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            ml: 6,
                            mr: 6,
                            mb: 2,
                        }}
                    >
                        <TextField
                            onChange={(e) => setSearchVal(e.target.value)}
                            label="Searching..."
                            variant="outlined"
                        />
                        <IconButton
                            onClick={handleSearchClickPagination}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <SearchIcon />
                        </IconButton>
                        <SortingSection sorting={sorting} handleSortChange={handleSortChange} />
                    </Box>
                    {hasProducts ? (
                        <>
                            <RenderProductForGender
                                getValue={getValue}
                                page={page}
                                PER_PAGE={PER_PAGE}
                                _DATA={_DATA}
                                storeValue={storeValue}
                                filteredProducts={filteredProducts}
                                brandFilteredProducts={brandFilteredProducts}
                                sorting={sorting}
                                hasProducts={hasProducts}
                                navigate={navigate}
                                selectedGender={'Male'}
                            />
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
                        </>
                    ) : (
                        <EmptyCard message={'Không có sản phẩm phù hợp'} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
