import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

export default function SortingProducts() {
    const [sorting, setSorting] = React.useState('');

    const handleChange = (event) => {
        setSorting(event.target.value);
    };
    const handleChangeSorting = (event) => {
        setSorting(event.target.value);
        // Thực hiện hành động sắp xếp danh sách sản phẩm tại đây
    };

    const [sortState, setSortState] = useState('none');
    const sortMethods = {
        none: { method: (a, b) => null },
        ascending: { method: undefined },
        descending: { method: (a, b) => (a > b ? -1 : 1) },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
        >
            {/* <Box sx={{ minWidth: '150px', mr: '60px', mb: 2 }}>
                <FormControl
                    fullWidth
                    sx={{
                        '& .MuiInputBase-root': {
                            fontSize: '1.4rem',
                        },
                        '& .MuiFormLabel-filled': {
                            fontSize: '16px',
                        },
                    }}
                >
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        Sorting
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sorting}
                        label="Sorting"
                        onChange={handleChange}
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
            </Box> */}

            <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
                <option value="DEFAULT" disabled>
                    None
                </option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
            <ul>
                {data.sort(sortMethods[sortState].method).map((el, i) => (
                    <li key={i}>{el}</li>
                ))}
            </ul>
        </Box>
    );
}
