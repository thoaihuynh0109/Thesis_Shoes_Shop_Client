import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
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

// make rating
export default function RatingProductInformation() {
    // set true --> for auto show menu list
    const [open, setOpen] = useState(false);
    // choose many branches
    const [selectedItem, setSelectedItem] = useState([]);

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
                <ListItemText
                    primary={
                        <CustomTypography sx={{ fontWeight: 'bold' }}>Review(0)</CustomTypography>
                    }
                />
                <ListItemIcon sx={{ mr: 2 }}>
                    <ReviewsRating />
                </ListItemIcon>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* // xác định xem brand item hiện tại có
                    // nằm trong danh sách các item được chọn không?
                    // selected={selectedItem.includes(index)}
                    // onClick={() => handleBrandClick(index)} */}
                    <ListItemText
                        primary={
                            <Box>
                                <CustomTypography
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ReviewsRating /> (0 star)
                                </CustomTypography>
                                <CustomTypography variant="body1">
                                    Have your say. Be the first to review the Nike Dunk Low Retro
                                    Premium.
                                </CustomTypography>
                                <CustomTypography
                                    sx={{
                                        mt: 2,
                                        textDecoration: 'underline',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Write a Review
                                </CustomTypography>
                            </Box>
                        }
                    />
                </List>
            </Collapse>
        </List>
    );
}

function ReviewsRating() {
    const [value, setValue] = React.useState(0);

    return (
        <Box>
            <Rating name="read-only" value={value} readOnly />
        </Box>
    );
}
