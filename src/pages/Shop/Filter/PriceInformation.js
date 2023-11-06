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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

function PriceInformation() {
    // set true --> for auto show menu list
    const [open, setOpen] = useState(true);
    // choose many branches
    const [selectedItem, setSelectedItem] = useState([]);

    const prices = [
        'Dưới 1,000,000đ',
        '1,000,000đ - 2,000,000đ',
        '2,000,000đ - 3,000,000đ',
        'Trên 3,000,000đ',
    ];

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
                <ListItemIcon sx={{ minWidth: '40px' }}>
                    <AttachMoneyIcon fontSize="large" />
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
                            x
                            // xác định xem brand item hiện tại có
                            // nằm trong danh sách các item được chọn không?
                            selected={selectedItem.includes(index)}
                            onClick={() => handleBrandClick(index)}
                        >
                            <Checkboxes checked={selectedItem.includes(index)} />
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

export default PriceInformation;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Checkboxes({ checked }) {
    return (
        <div>
            <Checkbox {...label} checked={checked} />
        </div>
    );
}
