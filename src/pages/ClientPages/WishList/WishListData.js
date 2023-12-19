import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
    Table,
    TableBody,
    TableCell,
    Button,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Paper,
    Tooltip,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromWishlist } from '~/redux/WishListManagement/wishlistActions';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { PopUpMessage } from '~/pages/Checkout/ProductsInCard/SummaryStep/SummaryStepData/ProductsTable';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { useNavigate } from 'react-router-dom';
import { storeProductDetails } from '~/redux/ProductDetails/productDetailsActions';
const CustomizeTableCell = styled(TableCell)({
    fontSize: '18px',
    borderRadius: '20px',
    align: 'center',
});

const WishListTable = () => {
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const selectWishlistItems = useSelector((state) => state.wishlist.wishlistItems);

    // Một state để theo dõi hàng nào đang mở hộp thoại xác nhận
    const [openConfirmationMap, setOpenConfirmationMap] = useState({});

    const handleRemoveFromWishlist = (productId) => {
        // Mở hộp thoại xác nhận khi bấm vào nút xóa
        setOpenConfirmationMap((prev) => ({ ...prev, [productId]: true }));
    };

    const handleCancelRemove = (productId) => {
        // Đóng hộp thoại xác nhận khi hủy bỏ
        setOpenConfirmationMap((prev) => ({ ...prev, [productId]: false }));
    };

    const removeItem = (productId) => {
        dispatch(removeFromWishlist(productId));
        // Đóng hộp thoại xác nhận sau khi xóa thành công
        setOpenConfirmationMap((prev) => ({ ...prev, [productId]: false }));
    };

    const handleConfirmRemove = (productId) => {
        if (productId !== null) {
            removeItem(productId);
            setShowToast(true);
            setToastMessage('Bạn đã xoá sản phẩm ra khỏi wishlist');
        }
    };

    const handleNavigateToProductDetails = (product) => {
        // Dispatch the action to store product details
        dispatch(storeProductDetails(product));
        // Navigate to the product detail page
        navigate(`/product-details/${product._id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // không có sản phẩm nào trong wish list
    if (selectWishlistItems.length === 0) {
        // return <div>No items in the wishlist.</div>;
        return <EmptyCard message={'Không Có Sản Phẩm Nào Trong Danh Sách Yêu Thích!'} />;
    }
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <CustomizeTableCell>Remove Icon</CustomizeTableCell>
                            <CustomizeTableCell>Image</CustomizeTableCell>
                            <CustomizeTableCell>Products Name</CustomizeTableCell>
                            <CustomizeTableCell>Unit Price</CustomizeTableCell>
                            {/* <CustomizeTableCell>Stock Status</CustomizeTableCell> */}
                            <CustomizeTableCell>Shopping</CustomizeTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectWishlistItems.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <CustomizeTableCell align="left">
                                    <Tooltip
                                        arrow
                                        title={
                                            <CustomTypography fontSize="11px">
                                                Delete
                                            </CustomTypography>
                                        }
                                    >
                                        <IconButton
                                            onClick={() => handleRemoveFromWishlist(product._id)}
                                        >
                                            <DeleteIcon fontSize="large" />
                                        </IconButton>
                                        {openConfirmationMap[product._id] && (
                                            <PopUpMessage
                                                open={openConfirmationMap}
                                                title="Confirm Removal"
                                                message="Are you sure you want to remove this item from your wishlist?"
                                                onCancel={() => handleCancelRemove(product._id)}
                                                onConfirm={() => handleConfirmRemove(product._id)}
                                            />
                                        )}
                                    </Tooltip>
                                </CustomizeTableCell>
                                <CustomizeTableCell borderRadius="20px">
                                    <img
                                        src={product.images}
                                        alt={`Product: ${product.name}`}
                                        style={{ width: '50px' }}
                                    />
                                </CustomizeTableCell>
                                <CustomizeTableCell>{product.name}</CustomizeTableCell>
                                <CustomizeTableCell>
                                    {/* {product.price} */}
                                    {product.price.toLocaleString()} VND
                                </CustomizeTableCell>
                                {/* <CustomizeTableCell>
                                {product.countInStock}
                                {/* {product.countInStock ? 'In Stock' : 'Sold Out'} 
                            </CustomizeTableCell> */}
                                <CustomizeTableCell>
                                    <Button
                                        variant="contained"
                                        sx={{ fontSize: '14px' }}
                                        onClick={() => handleNavigateToProductDetails(product)}
                                    >
                                        Buy Now
                                    </Button>
                                    {/* {product.countInStock ? 'In Stock' : 'Sold Out'} */}
                                </CustomizeTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastMessage2
                message={toastMessage}
                type="success"
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Box>
    );
};

export default WishListTable;
