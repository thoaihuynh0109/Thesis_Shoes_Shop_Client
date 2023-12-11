import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, styled } from '@mui/material';
import productService from '~/services/productServices';
// export const productsSize = ['35', '36', '37', '38', '39', '40', '41', '42', '43'];

function MakeProductSize({ data }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleOptionClick = (size) => {
        setSelectedValue(size);
    };
    // useEffect(() => {
    //     const fetchSize =
    // }, []);

    return (
        <Grid container spacing={2}>
            {data.length > 0 &&
                data.map((size) => (
                    <Grid item xs={4} key={size}>
                        <Box>
                            <Button
                                variant={selectedValue === size ? 'contained' : 'outlined'}
                                onClick={() => handleOptionClick(size)}
                                sx={{
                                    width: '80px',
                                    height: '40px',
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                }}
                            >
                                <Box sx={{ fontSize: '16px' }}>{size}</Box>
                            </Button>
                        </Box>
                    </Grid>
                ))}
        </Grid>
    );
}

export default MakeProductSize;
