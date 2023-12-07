import React, { useState, useEffect } from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import categoryService from '~/services/categoryServices';
import brandService from '~/services/brandServices';
export default function BrandFilterInformation({ handleBrandFilter, selectedBrands }) {
    // export default function BrandFilterInformation({ handleBrandFilter, selectedBrands }) {
    const [open, setOpen] = useState(true);

    const [listBrands, setListBrands] = useState([]);

    // call api all product brands
    useEffect(() => {
        const fetchBrandsData = async () => {
            const listProductBrands = await brandService.getAllBrand();
            console.log(listProductBrands);
            setListBrands(listProductBrands);
        };
        fetchBrandsData();
    }, []);

    const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Nai Kì'];

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{
                width: '95%',
                maxWidth: '320px',
                bgcolor: 'background.paper',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <StoreIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <CustomTypography sx={{ fontWeight: 'bold' }}>Thương Hiệu</CustomTypography>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {selectedBrands &&
                        listBrands.length > 0 &&
                        listBrands.map((brand, index) => (
                            <ListItemButton
                                key={brand._id}
                                selected={selectedBrands.includes(brand.name)}
                                onClick={() => {
                                    handleBrandFilter(brand.name);
                                }}
                            >
                                <Checkbox
                                    checked={selectedBrands.includes(brand.name)}
                                    onChange={() => handleBrandFilter(brand.name)}
                                />
                                {/* <ListItemText primary={brand} /> */}
                                <ListItemText
                                    key={brand._id}
                                    primary={
                                        <CustomTypography sx={{ fontSize: '14px' }} variant="body1">
                                            {brand.name}
                                        </CustomTypography>
                                    }
                                />
                            </ListItemButton>
                        ))}
                </List>
            </Collapse>
        </List>
    );
}
