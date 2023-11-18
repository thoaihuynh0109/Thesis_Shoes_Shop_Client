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

export default function BrandFilterInformation({ handleBrandFilter, selectedBrands }) {
    const [open, setOpen] = useState(true);

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
                            {/* <ListItemText primary={brand} /> */}
                            <ListItemText
                                primary={
                                    <CustomTypography sx={{ fontSize: '14px' }} variant="body1">
                                        {brand}
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
