import React, { useState, useEffect } from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
} from '@mui/material';
import { AttachMoneyOutlined } from '@mui/icons-material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function PriceFilterInformation({ handlePriceFilter, selectedPriceRange }) {
    // set true --> for auto show menu list
    const [open, setOpen] = useState(true);

    const prices = [
        'Dưới 1,000,000đ',
        '1,000,000đ - 2,000,000đ',
        '2,000,000đ - 3,000,000đ',
        'Trên 3,000,000đ',
    ];

    // close menu
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
                <ListItemIcon sx={{ minWidth: '40px' }}>
                    <AttachMoneyOutlined fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <CustomTypography sx={{ fontWeight: 'bold' }}>
                            Giá Sản Phẩm
                        </CustomTypography>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
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
                </List>
            </Collapse>
        </List>
    );
}
