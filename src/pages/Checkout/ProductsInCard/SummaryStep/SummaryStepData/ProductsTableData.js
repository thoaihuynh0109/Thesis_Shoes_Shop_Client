import { Box, Typography, IconButton, Tooltip, Stack } from '@mui/material';
import { Item } from '../Contants';
import DeleteIcon from '@mui/icons-material/Delete';
// import { CustomTypography } from '~/Layouts/DefaultLayout';

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
        <Box sx={{ width: 200 }}>
            <Item>4</Item>
            <Stack
                spacing={{ xs: 2, sm: 2 }}
                sx={{ mt: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
            >
                <Item>-</Item>
                <Item>+</Item>
            </Stack>
        </Box>,
        // total the price for each product
        <Typography fontSize="16px" variant="body1">
            80
        </Typography>,
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
            <Typography variant="body1">Gimme Shoes</Typography>
            <Typography variant="body2">SKU: UTE S1</Typography>
            <Typography variant="body2">Size : 41, Color : Orange Black</Typography>
        </Box>,
        // status of the product
        true,
        // price of the prodcut
        20.0,
        // update the quantity
        <Box sx={{ width: 200 }}>
            <Item>4</Item>
            <Stack
                spacing={{ xs: 2, sm: 2 }}
                sx={{ mt: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
            >
                <Item>-</Item>
                <Item>+</Item>
            </Stack>
        </Box>,
        // total the price for each product
        <Typography variant="body1">80</Typography>,
        // icon remove product
        <Tooltip arrow title="Delete">
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>,
    ),
];
