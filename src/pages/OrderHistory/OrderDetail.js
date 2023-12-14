import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomTableCell from '../AdminPages/CustomTableCell/CustomTableCell';

import ProductDetailView from './ProductDetailView';
import userService from '~/services/userServices';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
function OrderDetail() {
    // call api
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState([]);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // get userID from local storage
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user')) || '');
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    // search
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // reset current page to 1 when the searchTerm changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Fetch user data from local storage
    // const storedUserData = useEffect(() => {
    //     setUserData(storedUserData);
    //     setUserId(storedUserData._id);
    // }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            // console.log('userId:', userId._id);
            const listOrder = await userService.getAllOrderById(userId._id);
            console.log(`listOrder of user has id:${userId._id} `, listOrder);
            setOrders(listOrder);
        };
        fetchOrder();
    }, [searchTerm, currentPage, itemsPerPage]);

    useEffect(() => {
        const fetchOrder = async () => {
            // console.log('userId:', userId._id);
            const listUser = await userService.getUserById(userId._id);
            console.log(`User get by ID:${userId._id} `, listUser);
            setUser(listUser);
        };
        fetchOrder();
    }, []);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleView = (id) => {
        setSelectedOrderId(id);
        setShowForm(true);
    };

    // pagination
    // make pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(orders.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    //search animation
    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    };

    return (
        <Box>
            {/* Table */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, minHeight: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>No</CustomTableCell>
                            <CustomTableCell align="left">Times</CustomTableCell>
                            <CustomTableCell align="left">Total</CustomTableCell>
                            <CustomTableCell align="left">Payment</CustomTableCell>
                            <CustomTableCell align="center">Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.length > 0 &&
                            currentItems.map((order, index) => (
                                <TableRow
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <CustomTableCell component="th" scope="order">
                                        {index + 1}
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                        {order.totalAmount} VND
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                        {order.paymentMethod}
                                    </CustomTableCell>
                                    <CustomTableCell align="center">
                                        <IconButton onClick={() => handleView(order._id)}>
                                            <VisibilityIcon color="info" fontSize="large" />
                                        </IconButton>
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, alignItems: 'center' }}>
                <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                    {/* <CustomTypography sx={{ textTransform: 'capitalize' }}>First</CustomTypography> */}

                    <FirstPageIcon fontSize="large" />
                </Button>
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                    <CustomTypography sx={{ textTransform: 'capitalize' }}>
                        Previous
                    </CustomTypography>
                </Button>
                {/* {renderPageNumbers} */}
                <Button onClick={handleNextPage} disabled={currentPage === pageNumbers}>
                    <CustomTypography sx={{ textTransform: 'capitalize' }}>Next</CustomTypography>
                </Button>
                <Button
                    onClick={() => setCurrentPage(pageNumbers)}
                    disabled={currentPage === pageNumbers}
                >
                    {/* <CustomTypography sx={{ textTransform: 'capitalize' }}>Last</CustomTypography> */}
                    <LastPageIcon fontSize="large" />
                </Button>
            </Box>
            {showForm && <ProductDetailView handleClose={handleCloseForm} id={selectedOrderId} />}
        </Box>
    );
}

export default OrderDetail;
