import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from 'react-router-dom';
import CustomTableCell from '../AdminPages/CustomTableCell/CustomTableCell';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import orderService from '~/services/orderServices';
import FormOrderDetail from '../AdminPages/Order/FormOrderDetail';
import ProductDetailView from './ProductDetailView';

// function OrderDetail() {
//     const navigate = useNavigate();
//     const [orders, setOrders] = useState([]);
//     const [selectedOrderId, setSelectedOrderId] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState('');
//     const [typeMessage, setTypeMessage] = useState('');
//     const [showForm, setShowForm] = useState(false);

//     const [userData, setUserData] = useState({});
//     const [userId, setUserId] = useState('');
//     // Fetch user data from local storage
//     useEffect(() => {
//         const storedUserData = JSON.parse(localStorage.getItem('user')) || {};
//         setUserData(storedUserData);
//         setUserId(storedUserData._id); // Assuming userId is part of the user data
//         console.log('storedUserData._id: ', storedUserData._id);
//     }, []);

//     // useEffect(() => {
//     //     const storedUserData = JSON.parse(localStorage.getItem('user')) || {};
//     //     setUserData(storedUserData);
//     //     setUserId(storedUserData._id);
//     // }, []);

//     // console.log('user id;:', userId);

//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 console.log('userId:', userId); // Log the userId
//                 const listOrder = await orderService.getAllOrderById(userId);
//                 // console.log('listOrder: ', listOrder);
//                 console.log(`listOrder of user has id:${userId} `, listOrder);
//                 setOrders(listOrder);
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//             }
//         };
//         fetchOrder();
//     }, [userId]);

//     const handleCloseForm = () => {
//         setShowForm(false);
//     };

//     const handleClosePopup = () => {
//         setShowPopup(false);
//     };

//     const handleView = (id) => {
//         setSelectedOrderId(id);
//         setShowForm(true);
//     };

//     return (
//         <Box>
//             {/* Table */}
//             <ToastMessage message={message} type={typeMessage} />
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <CustomTableCell>No</CustomTableCell>
//                             <CustomTableCell align="left">Times</CustomTableCell>
//                             <CustomTableCell align="left">Total</CustomTableCell>
//                             <CustomTableCell align="left">Payment</CustomTableCell>

//                             <CustomTableCell align="center">Action</CustomTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {orders.length > 0 &&
//                             orders.map((order, index) => (
//                                 <TableRow
//                                     key={order._id}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                     <CustomTableCell component="th" scope="order">
//                                         {index + 1}
//                                     </CustomTableCell>
//                                     <CustomTableCell align="left">
//                                         {new Date(order.createdAt).toLocaleString()}
//                                         {/* {order.createdAt} */}
//                                     </CustomTableCell>
//                                     <CustomTableCell align="left">
//                                         {order.totalAmount}
//                                     </CustomTableCell>
//                                     <CustomTableCell align="left">
//                                         {order.paymentMethod}
//                                     </CustomTableCell>

//                                     <CustomTableCell align="center">
//                                         <IconButton onClick={() => handleView(order._id)}>
//                                             <VisibilityIcon color="info" fontSize="large" />
//                                         </IconButton>
//                                     </CustomTableCell>
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             {showForm && <ProductDetailView handleClose={handleCloseForm} id={selectedOrderId} />}
//         </Box>
//     );
// }

// export default OrderDetail;

import userService from '~/services/userServices';
function OrderDetail() {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user')) || '');

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
    }, []);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleView = (id) => {
        setSelectedOrderId(id);
        setShowForm(true);
    };

    return (
        <Box>
            {/* Table */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                        {orders.length > 0 &&
                            orders.map((order, index) => (
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
                                        {order.totalAmount}
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
            {showForm && <ProductDetailView handleClose={handleCloseForm} id={selectedOrderId} />}
        </Box>
    );
}

export default OrderDetail;
