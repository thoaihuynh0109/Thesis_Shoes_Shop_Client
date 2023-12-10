import React from 'react';
import { Box, ButtonGroup, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import SortingSection from '~/pages/Shop/Pagination/SortingSection';
import { LoadMoreProduct } from './RenderProductForGender';
import useProductFilter from '../Filter/MakeUseProductFilter';
import FilterBrandPriceByAccordion from '../FilterProductForGender';

export default function ProductPageForGender({ selectedGender }) {
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
        <Box sx={{ flexGrow: 1, minHeight: '100vh', mt: 4 }}>
            {/* <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4 }}> */}
            <Box>
                <CustomTypography sx={{ fontWeight: 'bold', fontSize: '18px', mt: 4, mb: 2 }}>
                    {/* Lọc Sản Phẩm */}
                    Filter Products
                </CustomTypography>
                {/* filter by brand and price */}
                <FilterBrandPriceByAccordion
                    handleBrandFilter={handleBrandFilter}
                    selectedBrands={selectedBrands}
                    handlePriceFilter={handlePriceFilter}
                    selectedPriceRange={selectedPriceRange}
                />
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
                    <Box sx={{ mt: 4 }}>
                        <SortingSection sorting={sorting} handleSortChange={handleSortChange} />
                    </Box>
                </Box>
            </Box>
            <Box>
                {hasProducts ? (
                    <Box sx={{ ml: '100px', mr: '163px' }}>
                        <LoadMoreProduct
                            getValue={getValue}
                            _DATA={_DATA}
                            storeValue={storeValue}
                            filteredProducts={filteredProducts}
                            brandFilteredProducts={brandFilteredProducts}
                            sorting={sorting}
                            hasProducts={hasProducts}
                            navigate={navigate}
                            // selectedGender={'Nam'}
                            selectedGender={selectedGender}
                        />
                    </Box>
                ) : (
                    // <EmptyCard message={'Không có sản phẩm phù hợp'} />
                    <EmptyCard message={'No result is found'} />
                )}
            </Box>
        </Box>
    );
}
