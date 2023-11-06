import React, { useState } from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
    Typography,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import StoreIcon from '@mui/icons-material/Store';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

function BrandInformation() {
    // set true --> for auto show menu list
    const [open, setOpen] = useState(true);
    // choose many branches
    const [selectedItem, setSelectedItem] = useState([]);

    const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Nai Kì'];

    // choose the brand when clicking on name
    const handleBrandClick = (index) => {
        if (selectedItem.includes(index)) {
            // nếu item đc click chọn,
            //mà click chọn nữa thì loại bỏ nó khỏi mảng selectedItem
            setSelectedItem(selectedItem.filter((item) => item !== index));
        } else {
            // nếu chưa tồn tại -> add item đc chọn vào mảng
            setSelectedItem([...selectedItem, index]);
        }
    };

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
                <ListItemIcon>
                    <StoreIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <CustomTypography sx={{ fontWeight: 'bold' }}>Thương hiệu</CustomTypography>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {brands.map((brand, index) => (
                        <ListItemButton
                            key={index}
                            // xác định xem brand item hiện tại có
                            // nằm trong danh sách các item được chọn không?
                            selected={selectedItem.includes(index)}
                            onClick={() => handleBrandClick(index)}
                        >
                            <Checkboxes checked={selectedItem.includes(index)} />
                            <ListItemText
                                primary={
                                    <CustomTypography variant="body1">{brand}</CustomTypography>
                                }
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}

export default BrandInformation;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Checkboxes({ checked }) {
    return (
        <div>
            <Checkbox {...label} checked={checked} />
        </div>
    );
}
