import React, { useState } from 'react';
import {
    List,
    ListItemButton,
    Radio,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import FemaleIcon from '@mui/icons-material/Female';
import WcIcon from '@mui/icons-material/Wc';
export default function GenderFilterInformation({ handleGenderFilter, selectedGender }) {
    const [open, setOpen] = useState(true);

    const genders = ['All', 'Male', 'Female'];

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
                    <WcIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <CustomTypography sx={{ fontWeight: 'bold' }}>Gender</CustomTypography>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {genders.map((gender, index) => (
                        <ListItemButton
                            key={index}
                            selected={selectedGender === gender}
                            onClick={() => handleGenderFilter(gender)}
                        >
                            <Radio
                                checked={selectedGender === gender}
                                onChange={() => handleGenderFilter(gender)}
                            />

                            <ListItemText
                                primary={
                                    <CustomTypography sx={{ fontSize: '14px' }} variant="body1">
                                        {gender}
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
