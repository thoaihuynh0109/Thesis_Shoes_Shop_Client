import * as React from 'react';
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
import CustomTableCell from '../CustomTableCell/CustomTableCell';
import PopupConfirm from '../PopupConfirm/PopupConfirm';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import orderService from '~/services/orderServices';
import FormOrderDetail from './FormOrderDetail';

function Order() {
    const [orders, setOrders] = React.useState([]);
    const [selectedOrderId, setSelectedOrderId] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);

    const navigate = useNavigate();

    const fetchOrder = async () => {
        const listOrder = await orderService.getAllOrder();
        setOrders(listOrder);
    };
    React.useEffect(() => {
        fetchOrder();
    }, []);

    const handleDelete = (orderId) => {
        setSelectedOrderId(orderId);
        // show pop up to confirm this action
        setShowPopup(true);
    };

    const confirmDelete = async (id) => {
        // call api để xóa
        const respone = await orderService.deleteOrder(id);
        console.log(respone);
        if (respone.status === 204) {
            setMessage('Xóa order thành công');
            setTypeMessage('success');

            const updatedOrders = orders.filter((order) => order._id !== id);
            setOrders(updatedOrders);
        } else {
            setMessage('Xóa order thất bại');
            setTypeMessage('error');
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
        }, 3000);
    };
    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleView = (id) => {
        setSelectedOrderId(id);
        setShowForm(true);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Categories</Typography>
                    <Stack spacing={1} direction="row">
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <UploadIcon sx={{ mr: 1 }} />
                            Import
                        </Button>
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <DownloadIcon sx={{ mr: 1 }} />
                            Export
                        </Button>
                    </Stack>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ fontSize: '1.6rem', borderRadius: 2.5, textTransform: 'capitalize' }}
                    component={Link}
                    to="create"
                >
                    Add
                </Button>
            </Box>
            {/* Search */}
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <TextField
                    placeholder="Search Category"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ height: 25, width: 25 }} />
                            </InputAdornment>
                        ),
                        style: { fontSize: '1.4rem', color: '#000', borderRadius: 8 },
                    }}
                />
            </Paper>
            {/* Table */}
            <ToastMessage message={message} type={typeMessage} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>No</CustomTableCell>
                            <CustomTableCell align="left">ID</CustomTableCell>
                            <CustomTableCell align="left">Total</CustomTableCell>
                            <CustomTableCell align="left">Payment</CustomTableCell>
                            <CustomTableCell align="left">Status</CustomTableCell>
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
                                    <CustomTableCell align="left">{order._id}</CustomTableCell>
                                    <CustomTableCell align="left">
                                        {order.totalAmount}
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                        {order.paymentMethod}
                                    </CustomTableCell>

                                    <CustomTableCell align="left">{order.status}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        <IconButton onClick={() => handleDelete(order._id)}>
                                            <DeleteIcon color="error" fontSize="large" />
                                        </IconButton>

                                        <IconButton onClick={() => handleView(order._id)}>
                                            <VisibilityIcon color="info" fontSize="large" />
                                        </IconButton>
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {showForm && <FormOrderDetail handleClose={handleCloseForm} id={selectedOrderId} />}

            {showPopup && (
                <PopupConfirm
                    handleClose={handleClosePopup}
                    id={selectedOrderId}
                    confirmDelete={confirmDelete}
                />
            )}
        </Box>
    );
}

export default Order;
