import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

export default function GenderSection({ handleGenderChange }) {
    const [gender, setGender] = useState('all');

    // const handleGenderChangeLocal = (event) => {
    //     const selectedGender = event.target.value;
    //     setGender(selectedGender);
    //     handleGenderChange(selectedGender); // Gọi hàm xử lý thay đổi giới tính ở component cha nếu cần
    // };

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
                    Gender
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sorting"
                    value={gender}
                    onChange={handleGenderChange}
                >
                    <MenuItem value="all">
                        <CustomTypography>All</CustomTypography>
                    </MenuItem>
                    <MenuItem value="male">
                        <CustomTypography>Male</CustomTypography>
                    </MenuItem>
                    <MenuItem value="female">
                        <CustomTypography>Female</CustomTypography>
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
