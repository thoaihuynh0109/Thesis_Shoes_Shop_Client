// SortingSection.js
import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

export default function SortingSection({ sorting, handleSortChange }) {
    return (
        <Box style={{ minWidth: '150px', mr: '60px', mb: 2 }}>
            <FormControl
                fullWidth
                style={{
                    '& .MuiInputBase-root': {
                        fontSize: '1.4rem',
                    },
                    '& .MuiFormLabel-filled': {
                        fontSize: '16px',
                    },
                }}
                // styled for border
                sx={{
                    '& .MuiInputBase-root': {
                        fontSize: '14px',
                    },
                }}
            >
                <InputLabel
                    id="demo-simple-select-label"
                    style={{
                        fontSize: '14px',
                    }}
                >
                    Sorting
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sorting"
                    value={sorting}
                    onChange={handleSortChange}
                >
                    <MenuItem value="az">
                        <CustomTypography>Name: A - Z</CustomTypography>
                    </MenuItem>
                    <MenuItem value="za" fontSize="16px">
                        <CustomTypography>Name: Z - A</CustomTypography>
                    </MenuItem>
                    <MenuItem value="asc">
                        <CustomTypography>Price: Low - High</CustomTypography>
                    </MenuItem>
                    <MenuItem value="desc">
                        <CustomTypography>Price: High - Low</CustomTypography>
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}







