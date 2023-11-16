import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Box,
    Grid,
    Typography,
    TableRow,
    Paper,
    Stack,
    Button,
    Tooltip,
    IconButton,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    incrementQuantity,
    decrementQuantity,
    removeProduct,
} from '~/redux/CartManagement/cartActions';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

const CustomizeTableCell = styled(({ fontSize, fontWeight, ...rest }) => <TableCell {...rest} />)(
    ({ fontSize, fontWeight }) => ({
        fontSize: fontSize || '16px',
        fontWeight: fontWeight || 'normal',
    }),
);

const CustomTypographyPriceDetails = styled(Typography)(({ fontSize }) => ({
    fontSize: fontSize || '16px',
}));

const CustomTableCellPriceDetails = styled(TableCell)(({ fontSize }) => ({
    fontSize: fontSize || '16px',
}));

function ProductsTable() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Ask user wanna remove Item?
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

    // decrease product quantity
    const decrement = (productId) => {
        // dispatch action to decrement quantity
        dispatch(decrementQuantity(productId, 1));
    };

    // increase product quantity
    const increment = (productId) => {
        // dispatch action to increment quantity
        dispatch(incrementQuantity(productId, 1));
    };

    const removeItem = (productId) => {
        // dispatch action to remove item from the cart
        dispatch(removeProduct(productId));
    };

    // remove item section
    const handleRemoveItem = (productId) => {
        setItemToRemove(productId);
        setOpenConfirmation(true);
    };

    const handleConfirmRemove = () => {
        if (itemToRemove !== null) {
            removeItem(itemToRemove);
            setOpenConfirmation(false);
            setItemToRemove(null);
            setToastMessage('Item removed successfully');
            setToastType('success');
        }
    };

    const handleCancelRemove = () => {
        setOpenConfirmation(false);
        setItemToRemove(null);
    };

    const calculateTotalPrice = (price, quantity) => {
        // check if price is defined and not null
        if (price && typeof price === 'string') {
            // remove commas, ',' and convert to float for price
            const parsedPrice = parseFloat(price.replace(/,/g, ''));

            // Check if both price is a valid number
            if (!isNaN(parsedPrice) && typeof quantity === 'number' && !isNaN(quantity)) {
                const total = parsedPrice * quantity;
                // This will add "commas - ," for better readability
                return total.toLocaleString();
            }
        }

        // default value
        return '0';
    };

    const calculateCartTotal = () => {
        let total = 0;
        for (const item of cartItems) {
            // assuming price is a string
            const itemPrice = parseFloat(item.price.replace(/,/g, ''));
            const itemQuantity = parseFloat(item.quantity);

            if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                total += itemPrice * itemQuantity;
            }
        }
        return total;
    };
    const tax = 8.75;
    const totalWithTax = (tax / 100 + 1) * calculateCartTotal();

    return (
        <Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <CustomizeTableCell align="left">Product Image</CustomizeTableCell>
                                <CustomizeTableCell align="left">Description</CustomizeTableCell>
                                <CustomizeTableCell align="left">Status</CustomizeTableCell>
                                <CustomizeTableCell align="left">Unit Price</CustomizeTableCell>
                                <CustomizeTableCell align="left">Quantity</CustomizeTableCell>
                                <CustomizeTableCell align="left">Total</CustomizeTableCell>
                                <CustomizeTableCell align="left">Actions</CustomizeTableCell>
                            </TableRow>
                        </TableHead>

                        {/* content of table */}
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.productId}>
                                    <CustomizeTableCell component="th" scope="row">
                                        {/* <img
                                    src={
                                        'https://www.bike-discount.de/media/image/6f/89/4b/adidas_Terrex-Free-Hiker-2-Low-GTX-Wanderschuhe_IG5459_2.jpg'
                                    }
                                    alt="Product"
                                    style={{ width: '50px' }}
                                /> */}
                                        <img
                                            src={item.image}
                                            alt={`Product: ${item.title}`}
                                            style={{ width: '50px' }}
                                        />
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        {item.title}
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        {item.stockStatus ? 'In Stock' : 'Sold Out'}
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        {item.price}
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        <Stack direction="row" spacing={2} justifyContent="center">
                                            <Button
                                                variant="contained"
                                                onClick={() => decrement(item.productId)}
                                            >
                                                -
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button
                                                variant="contained"
                                                onClick={() => increment(item.productId)}
                                            >
                                                +
                                            </Button>
                                        </Stack>
                                    </CustomizeTableCell>
                                    {/* total for one product */}
                                    <CustomizeTableCell align="left">
                                        {calculateTotalPrice(item.price, item.quantity)}
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        <Tooltip arrow title="Delete">
                                            <IconButton
                                                onClick={() => handleRemoveItem(item.productId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <PopUpMessage
                                                open={openConfirmation}
                                                title="Confirm Removal"
                                                message="Are you sure you want to remove this item from your cart?"
                                                onCancel={handleCancelRemove}
                                                onConfirm={handleConfirmRemove}
                                            />
                                        </Tooltip>
                                    </CustomizeTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ToastMessage message={toastMessage} type={toastType} />

                {/* <Typography variant="h6" align="right">
                    Total: {calculateCartTotal()} - {totalWithTax}
                </Typography> */}
            </Box>

            <TestLastRows
                tax={8.75}
                subtotal={calculateCartTotal().toLocaleString()}
                totalWithTax={totalWithTax.toLocaleString()}
            />
        </Box>
    );
}

export default ProductsTable;

export function PopUpMessage({ open, title, message, onCancel, onConfirm }) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <CustomTypography>{message}</CustomTypography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    <CustomTypography>Cancel</CustomTypography>
                </Button>
                <Button onClick={onConfirm} color="primary">
                    <CustomTypography>Confirm</CustomTypography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function TestLastRows({ tax, totalWithTax, subtotal }) {
    return (
        <Box sx={{ mt: 2, border: '1px solid #757575', borderRadius: '5px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableBody align="right">
                        <TableRow>
                            <CustomTableCellPriceDetails rowSpan={4} />
                            <CustomTableCellPriceDetails colSpan={2}>
                                Subtotal
                            </CustomTableCellPriceDetails>
                            <CustomTableCellPriceDetails align="right">
                                <CustomTypographyPriceDetails
                                    sx={{
                                        width: '300px',
                                        pr: '99px',
                                        display: 'inline-block',
                                    }}
                                >
                                    {subtotal}
                                </CustomTypographyPriceDetails>
                            </CustomTableCellPriceDetails>
                        </TableRow>
                        <TableRow>
                            <CustomTableCellPriceDetails>Tax</CustomTableCellPriceDetails>
                            <CustomTableCellPriceDetails align="right"></CustomTableCellPriceDetails>
                            <CustomTableCellPriceDetails align="right">
                                <CustomTypographyPriceDetails
                                    sx={{
                                        width: '300px',
                                        pr: '99px',
                                        display: 'inline-block',
                                    }}
                                >
                                    {tax}%
                                </CustomTypographyPriceDetails>
                            </CustomTableCellPriceDetails>
                        </TableRow>
                        <TableRow>
                            <CustomTableCellPriceDetails colSpan={2}>
                                Total
                            </CustomTableCellPriceDetails>
                            <CustomTableCellPriceDetails align="right">
                                <CustomTypographyPriceDetails
                                    sx={{
                                        width: '300px',
                                        pr: '99px',
                                        display: 'inline-block',
                                    }}
                                >
                                    {totalWithTax}
                                </CustomTypographyPriceDetails>
                            </CustomTableCellPriceDetails>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ToastMessage({ message, type }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
