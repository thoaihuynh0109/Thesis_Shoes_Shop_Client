import React, { useState } from 'react';
import {
    Box,
    IconButton,
    TextField,
    Grid,
    ListItemText,
    ListItemButton,
    Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AttachMoneyOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import SortingSection from '~/pages/Shop/Pagination/SortingSection';
import { LoadMoreProduct } from './RenderProductForGender';
import useProductFilter from '../Filter/MakeUseProductFilter';

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
        <Box sx={{ flexGrow: 1, minHeight: '500vh', mt: 4 }}>
            <Box>
                <CustomTypography sx={{ fontWeight: 'bold', fontSize: '18px', mt: 4, mb: 2 }}>
                    Lọc Sản Phẩm
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
                    {/* searching product */}
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
                    <Box sx={{ mt: 4 }}>
                        <SortingSection sorting={sorting} handleSortChange={handleSortChange} />
                    </Box>
                </Box>
            </Box>
            <Box>
                {hasProducts ? (
                    <>
                        <LoadMoreProduct
                            getValue={getValue}
                            _DATA={_DATA}
                            storeValue={storeValue}
                            filteredProducts={filteredProducts}
                            brandFilteredProducts={brandFilteredProducts}
                            sorting={sorting}
                            hasProducts={hasProducts}
                            navigate={navigate}
                            // selectedGender={'Male'}
                            selectedGender={selectedGender}
                        />
                    </>
                ) : (
                    <EmptyCard message={'Không có sản phẩm phù hợp'} />
                )}
            </Box>
        </Box>
    );
}

// filter product for men and women page
function FilterBrandPriceByAccordion({
    handleBrandFilter,
    selectedBrands,
    handlePriceFilter,
    selectedPriceRange,
}) {
    const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Nai Kì'];
    const prices = [
        'Dưới 1,000,000đ',
        '1,000,000đ - 2,000,000đ',
        '2,000,000đ - 3,000,000đ',
        'Trên 3,000,000đ',
    ];
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <StoreIcon fontSize="large" />
                        <CustomTypography sx={{ ml: 4, fontSize: '16px', fontWeight: 'bold' }}>
                            Thương Hiệu
                        </CustomTypography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {brands.map((brand, index) => (
                        <ListItemButton
                            key={index}
                            selected={selectedBrands.includes(brand)}
                            onClick={() => handleBrandFilter(brand)}
                        >
                            <Checkbox
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandFilter(brand)}
                            />
                            <ListItemText
                                primary={
                                    <CustomTypography sx={{ fontSize: '14px' }} variant="body1">
                                        {brand}
                                    </CustomTypography>
                                }
                            />
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <AttachMoneyOutlined fontSize="large" />
                        <CustomTypography sx={{ ml: 4, fontSize: '16px', fontWeight: 'bold' }}>
                            Giá
                        </CustomTypography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {prices.map((price, index) => (
                        <ListItemButton
                            key={index}
                            selected={selectedPriceRange.includes(price)}
                            onClick={() => handlePriceFilter(price)}
                        >
                            <Checkbox
                                checked={selectedPriceRange.includes(price)}
                                onChange={() => handlePriceFilter(price)}
                            />
                            <ListItemText
                                primary={
                                    <CustomTypography sx={{ fontSize: '14px' }} variant="body1">
                                        {price}
                                    </CustomTypography>
                                }
                            />
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
