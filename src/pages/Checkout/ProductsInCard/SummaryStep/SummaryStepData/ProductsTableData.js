import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Stack, Grid, Button, styled } from '@mui/material';
import { Item } from '../Contants';
import DeleteIcon from '@mui/icons-material/Delete';
import { Update } from '@mui/icons-material';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

// custom bytton for update quantity
export const CustomizeButtonUpdateQuantity = styled(Button)(({}) => ({
    size: 'small',
    minWidth: '40px',
    fontSize: '14px',
    fontWeight: 'bold',
}));

// Data Products are added to cart
function createData(
    productImage,
    description,
    unitPrice,
    stockStatus,
    quantity,
    totalPriceQuantity,
    removeIcon,
) {
    return {
        productImage,
        description,
        unitPrice,
        stockStatus,
        quantity,
        totalPriceQuantity,
        removeIcon,
    };
}

// export default createData;

export const rowsTest = [
    createData(
        // image product
        <img
            src="https://i.pinimg.com/originals/2f/39/cb/2f39cbc5566366d03f7f00c36854f552.gif "
            style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                border: '1px solid #333',
            }}
        />,
        // description of the product
        <Box>
            <Typography fontSize="14px">Gimme Shoes</Typography>
            <Typography fontSize="14px">SKU: UTE S1</Typography>
            <Typography fontSize="14px">Size : 41, Color : Orange Black</Typography>
        </Box>,
        // price of the product
        true,

        // status of the product
        20.0,

        // update the quantity
        <UpdateQuantity />,

        // total the price for each product
        <CustomTypography fontSize="16px" variant="body1">
            80
        </CustomTypography>,
        // icon remove product
        <Tooltip arrow title="Delete">
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>,
    ),
    createData(
        // image product
        <img
            src="https://i.pinimg.com/564x/57/af/3a/57af3a52b9cf2cc14b7e8de3dd4b5020.jpg  "
            style={{
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                border: '1px solid #333',
            }}
        />,
        // description of the product
        <Box>
            <CustomTypography variant="body1">Gimme Shoes</CustomTypography>
            <CustomTypography variant="body2">SKU: UTE S1</CustomTypography>
            <CustomTypography variant="body2">Size : 41, Color : Orange Black</CustomTypography>
        </Box>,
        // status of the product
        true,
        // price of the prodcut
        20.0,

        // update the quantity
        <UpdateQuantity />,
        // total the price for each product
        <CustomTypography variant="body1">80</CustomTypography>,
        // icon remove product
        <Tooltip arrow title="Delete">
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>,
    ),
];

function UpdateQuantity() {
    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        // khi count > 1 thì mới được giảm
        if (count > 1) {
            setCount(count - 1);
        }
    };
    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            <CustomizeButtonUpdateQuantity variant="contained" onClick={decrement}>
                -
            </CustomizeButtonUpdateQuantity>
            <Item>{count}</Item>
            <CustomizeButtonUpdateQuantity variant="contained" onClick={increment}>
                +
            </CustomizeButtonUpdateQuantity>
        </Stack>
    );
}
