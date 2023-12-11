import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeProduct,
} from '~/redux/CartManagement/cartActions';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';

const CustomizeTableCell = styled(({ fontSize, fontWeight, ...rest }) => <TableCell {...rest} />)(
    ({ fontSize, fontWeight }) => ({
        fontSize: fontSize || '16px',
        fontWeight: fontWeight || 'normal',
    }),
);

function ProductsTable() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const navigate = useNavigate();
    const cartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // save product data to local storage
    // Fetch cart items from localStorage on component mount
    // useEffect(() => {
    //     const storedCartItems = localStorage.getItem('cartItems');

    //     if (storedCartItems) {
    //         const parsedCartItems = JSON.parse(storedCartItems);
    //         // Dispatch action to update cart items in the Redux store
    //         parsedCartItems.forEach((item) => dispatch(addToCart(item)));
    //     }
    // }, [dispatch]);

    // // Update localStorage whenever cart items change
    // useEffect(() => {
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // }, [cartItems]);

    // Ask user wanna remove Item?
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    // this is toast message for pop up message to confirm
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

    // show toast message
    const [showToast, setShowToast] = useState(false);
    const [toastMessage2, setToastMessage2] = useState('');
    const [typeMessage2, setTypeMessage2] = useState('');

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
            removeItem(itemToRemove); // Dispatch your removeProduct action
            setOpenConfirmation(false);
            setItemToRemove(null);
            setShowToast(true);
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
            // const parsedPrice = parseFloat(price);

            // Check if both price is a valid number
            if (!isNaN(parsedPrice) && typeof quantity === 'number' && !isNaN(quantity)) {
                const total = parsedPrice * quantity;
                // This will add "commas - ," for better readability
                return total.toLocaleString(); // convert to vnd
                // console.log(total.toString());
                // return total; // convert to vnd
            }
        }

        // default value
        return '0';
    };

    const calculateCartTotal = () => {
        let total = 0;
        for (const item of cartItems) {
            const itemPrice = parseFloat(item.price.replace(/,/g, ''));
            const itemQuantity = parseFloat(item.quantity);

            if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                total += itemPrice * itemQuantity;
            }
        }
        return total;
    };

    const tax = 2;
    const totalWithTax = (tax / 100 + 1) * calculateCartTotal();
    // Format totalWithTax without decimal places and commas
    // Làm tròn totalWithTax lên đến nghìn gần nhất
    const roundedTotalWithTax = Math.ceil(totalWithTax / 1000) * 1000;
    // Format totalWithTax without decimal places and commas
    // 2,929,010 --> 2,930,000
    const formattedTotalWithTax = roundedTotalWithTax.toLocaleString();

    // check if there is no products in cart before adding item
    if (cartItems.length === 0) {
        return <EmptyCard message={'No product in cart'} />;
    }

    // Show Checkout Page and check user logged into Websites?
    const handleCheckoutPage = () => {
        // Check if the "user" key exists in local storage
        const checkUserLoggedIn = localStorage.getItem('user') !== null;

        // If the user is not logged in, navigate to the sign-in page
        if (!checkUserLoggedIn) {
            setShowToast(true);
            setToastMessage2('Must Login Before Checkout');
            setTypeMessage2('warning');
            setTimeout(() => {
                setShowToast(true);
                navigate('/signin');
            }, 2000);
        } else {
            // If the user is logged in, proceed to the checkout page
            navigate('/checkout-page');
        }
    };

    return (
        <Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <CustomizeTableCell align="left">Product Image</CustomizeTableCell>
                                <CustomizeTableCell align="left">Description</CustomizeTableCell>
                                <CustomizeTableCell align="left">Status</CustomizeTableCell>
                                <CustomizeTableCell align="left">Unit Price</CustomizeTableCell>
                                <CustomizeTableCell align="left">Quantity</CustomizeTableCell>
                                <CustomizeTableCell align="left">
                                    <Typography sx={{ ml: 6, fontSize: '16px' }}>Total</Typography>
                                </CustomizeTableCell>
                                <CustomizeTableCell align="left">Actions</CustomizeTableCell>
                            </TableRow>
                        </TableHead>

                        {/* content of table */}
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item._id}>
                                    <CustomizeTableCell component="th" scope="row">
                                        <img
                                            src={item.images}
                                            alt={`Product: ${item.name}`}
                                            style={{ width: '50px' }}
                                        />
                                    </CustomizeTableCell>

                                    <CustomizeTableCell align="left">
                                        {item.name}
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        {item.countInStock}
                                        {/* {item.countInstock ? 'In Stock' : 'Sold Out'} */}
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        {item.price.toLocaleString()}
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            justifyContent="center"
                                            sx={{ ml: -8 }}
                                        >
                                            <Button
                                                variant="contained"
                                                onClick={() => decrement(item._id)}
                                                sx={{ minWidth: '40px', height: '30px' }}
                                            >
                                                <CustomTypography>-</CustomTypography>
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button
                                                variant="contained"
                                                onClick={() => increment(item._id)}
                                                sx={{ minWidth: '40px', height: '30px' }}
                                            >
                                                <CustomTypography>+</CustomTypography>
                                            </Button>
                                        </Stack>
                                    </CustomizeTableCell>
                                    {/* total for one product */}
                                    <CustomizeTableCell align="left">
                                        <Box sx={{ ml: 6 }}>
                                            {calculateTotalPrice(item.price, item.quantity)}
                                        </Box>
                                    </CustomizeTableCell>
                                    <CustomizeTableCell align="left">
                                        <Tooltip
                                            arrow
                                            title={
                                                <CustomTypography sx={{ fontSize: '12px' }}>
                                                    Delete
                                                </CustomTypography>
                                            }
                                        >
                                            <IconButton onClick={() => handleRemoveItem(item._id)}>
                                                <DeleteIcon fontSize="large" />
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
            </Box>

            <TotalToCheckout
                tax={2}
                subtotal={calculateCartTotal().toLocaleString()}
                totalWithTax={formattedTotalWithTax}
            />
            <Box sx={{ mb: '10px', display: 'flex', justifyContent: 'end', mt: 2 }}>
                <Button
                    sx={{ p: '12px 30px', fontSize: ' 15px', textTransform: 'capitalize' }}
                    variant="contained"
                    onClick={handleCheckoutPage}
                    endIcon={<ArrowForwardIosIcon />}
                >
                    Checkout
                </Button>
                <ToastMessage2
                    message={toastMessage2}
                    type={typeMessage2}
                    showToast={showToast}
                    setShowToast={setShowToast}
                />
            </Box>
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

function TotalToCheckout({ tax, totalWithTax, subtotal }) {
    const commonTypographyStyles = {
        // Set a fixed width for all Typography components
        width: '5px',
        display: 'inline-block',
        textAlign: 'right', // Align the text to the right
    };

    return (
        <Box
            sx={{
                border: '1px solid #333',
                mt: 2,
                maxWidth: 600,
                ml: '674px',
            }}
        >
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CustomTypography sx={{ mr: 24, fontSize: '16px', ...commonTypographyStyles }}>
                        Subtotal
                    </CustomTypography>
                    <CustomTypography sx={{ commonTypographyStyles, ml: '-30px' }}>
                        {subtotal}
                    </CustomTypography>
                </Box>

                <Divider sx={{ ml: 14, mr: 15 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CustomTypography sx={{ mr: 29, fontSize: '16px', ...commonTypographyStyles }}>
                        Tax
                    </CustomTypography>
                    <CustomTypography sx={{ commonTypographyStyles, ml: '-45px' }}>
                        {tax}%
                    </CustomTypography>
                </Box>
                <Divider sx={{ ml: 14, mr: 15 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                    <CustomTypography sx={{ mr: 24, fontSize: '16px', ...commonTypographyStyles }}>
                        Total
                    </CustomTypography>
                    <CustomTypography sx={{ commonTypographyStyles, ml: '-30px' }}>
                        {totalWithTax}
                    </CustomTypography>
                </Box>
            </Box>
        </Box>
    );
}
