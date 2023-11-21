import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, IconButton, styled, Tooltip, Typography, CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { removeFromWishlist } from '~/redux/WishListManagement/wishlistActions';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';

const CustomizeTableCell = styled(TableCell)({
    fontSize: '18px',
    borderRadius: '20px',
    align: 'center',
});

function WishListTable() {
    const dispatch = useDispatch();
    const selectWishlistItems = useSelector((state) => state.wishlist.wishlistItems);

    const handleRemoveFromWishlist = (productId) => {
        console.log('Removing product from wishlist:', productId);
        dispatch(removeFromWishlist(productId));
    };

    if (selectWishlistItems.length === 0) {
        // return <div>No items in the wishlist.</div>;
        return <EmptyCard message={'No items in the wishlist.'} />;
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <CustomizeTableCell>Remove Icon</CustomizeTableCell>
                        <CustomizeTableCell>Image</CustomizeTableCell>
                        <CustomizeTableCell>Products Name</CustomizeTableCell>
                        <CustomizeTableCell>Unit Price</CustomizeTableCell>
                        <CustomizeTableCell>Stock Status</CustomizeTableCell>
                        <CustomizeTableCell>Shopping</CustomizeTableCell>
                    </TableRow>
                </TableHead>
                {/* removeIcon, productImage, unitPrice, stockStatus, shoppingButton */}
                <TableBody>
                    {selectWishlistItems.map((product) => (
                        <TableRow
                            key={product.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <CustomizeTableCell align="left">
                                <Tooltip arrow title="Delete">
                                    {/* <IconButton onClick={() => handleRemoveItem(item.productId)}> */}
                                    <IconButton
                                        onClick={() => handleRemoveFromWishlist(product.productId)}
                                    >
                                        <DeleteIcon
                                            onClick={() =>
                                                handleRemoveFromWishlist(product.productId)
                                            }
                                        />
                                    </IconButton>
                                    {/* <PopUpMessage
                                        open={openConfirmation}
                                        title="Confirm Removal"
                                        message="Are you sure you want to remove this item from your cart?"
                                        onCancel={handleCancelRemove}
                                        onConfirm={handleConfirmRemove}
                                    /> */}
                                </Tooltip>
                            </CustomizeTableCell>
                            <CustomizeTableCell borderRadius="20px">
                                <img
                                    src={product.image}
                                    alt={`Product: ${product.title}`}
                                    style={{ width: '50px' }}
                                />
                            </CustomizeTableCell>
                            <CustomizeTableCell>{product.title}</CustomizeTableCell>
                            <CustomizeTableCell>{product.price}</CustomizeTableCell>
                            <CustomizeTableCell>
                                {product.stockStatus ? 'In Stock' : 'Sold Out'}
                            </CustomizeTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default WishListTable;
