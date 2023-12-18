import React, { useState, useEffect } from 'react';
import {
    Box,
    ListItemText,
    ListItemButton,
    Checkbox,
    Grid,
    Button,
    Popover,
    Typography,
    ButtonGroup,
} from '@mui/material';
import { Storefront, AttachMoneyOutlined } from '@mui/icons-material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import brandService from '~/services/brandServices';
import useProductFilter from './Filter/MakeUseProductFilter';
function FilterBrandPriceByPopover({
    handleBrandFilter,
    selectedBrands,
    handlePriceFilter,
    selectedPriceRange,
}) {
    const { sorting, handleSortChange } = useProductFilter();

    const [listBrands, setListBrands] = useState([]);
    const [brandPopoverAnchorEl, setBrandPopoverAnchorEl] = useState(null);
    const [pricePopoverAnchorEl, setPricePopoverAnchorEl] = useState(null);
    const prices = [
        'Under 1,000,000đ',
        '1,000,000đ - 2,000,000đ',
        '2,000,000đ - 3,000,000đ',
        'Above 3,000,000đ',
    ];

    useEffect(() => {
        const fetchBrandsData = async () => {
            const listProductBrands = await brandService.getAllBrand();
            setListBrands(listProductBrands);
        };
        fetchBrandsData();
    }, []);

    const handleBrandButtonClick = (event) => {
        setBrandPopoverAnchorEl(event.currentTarget);
    };

    const handlePriceButtonClick = (event) => {
        setPricePopoverAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setBrandPopoverAnchorEl(null);
        setPricePopoverAnchorEl(null);
    };

    const brandPopoverOpen = Boolean(brandPopoverAnchorEl);
    const pricePopoverOpen = Boolean(pricePopoverAnchorEl);

    return (
        <Box>
            <Box>
                <Box sx={{ display: 'flex', ml: 20 }}>
                    <Button
                        variant="outlined"
                        onClick={handleBrandButtonClick}
                        startIcon={<Storefront />}
                        sx={{ mb: 2 }}
                    >
                        <CustomTypography>Brands</CustomTypography>
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handlePriceButtonClick}
                        startIcon={<AttachMoneyOutlined />}
                        sx={{ mb: 2, ml: 10 }}
                    >
                        <CustomTypography>Prices</CustomTypography>
                    </Button>
                </Box>
                <Popover
                    open={brandPopoverOpen}
                    anchorEl={brandPopoverAnchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {/* Brands Popover Content */}
                    <Box p={2} width={'600px'}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: 'blue',
                            }}
                        >
                            Choose Brands
                        </Typography>
                        <Grid container spacing={0}>
                            {listBrands.map((brand, index) => (
                                <Grid item xs={6} sm={4} md={4} key={index}>
                                    <ListItemButton
                                        selected={selectedBrands.includes(brand.name)}
                                        onClick={() => handleBrandFilter(brand.name)}
                                    >
                                        <Checkbox
                                            checked={selectedBrands.includes(brand.name)}
                                            onChange={() => handleBrandFilter(brand.name)}
                                        />
                                        <ListItemText
                                            primary={
                                                <CustomTypography
                                                    sx={{ fontSize: '14px' }}
                                                    variant="body1"
                                                >
                                                    {brand.name}
                                                </CustomTypography>
                                            }
                                        />
                                    </ListItemButton>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Popover>

                <Popover
                    open={pricePopoverOpen}
                    anchorEl={pricePopoverAnchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {/* Prices Popover Content */}
                    <Box p={2} width={'600px'}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: 'blue',
                            }}
                        >
                            Choose Prices
                        </Typography>
                        <Grid container spacing={2}>
                            {prices.map((price, index) => (
                                <Grid item xs={6} sm={4} md={6} key={index}>
                                    <ListItemButton
                                        selected={selectedPriceRange.includes(price)}
                                        onClick={() => handlePriceFilter(price)}
                                    >
                                        <Checkbox
                                            checked={selectedPriceRange.includes(price)}
                                            onChange={() => handlePriceFilter(price)}
                                        />
                                        <ListItemText
                                            primary={
                                                <CustomTypography
                                                    sx={{ fontSize: '14px' }}
                                                    variant="body1"
                                                >
                                                    {price}
                                                </CustomTypography>
                                            }
                                        />
                                    </ListItemButton>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Popover>
            </Box>
            {/* <SortingSection2 sorting={sorting} handleSortChange={handleSortChange} /> */}
        </Box>
    );
}

export default FilterBrandPriceByPopover;
