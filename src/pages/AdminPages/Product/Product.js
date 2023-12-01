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
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import CustomTableCell from '../CustomTableCell/CustomTableCell';
import PopupConfirm from '../PopupConfirm/PopupConfirm';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import productService from '~/services/productServices';

function Product() {
    const [products, setProducts] = React.useState([]);
    const [selectedProductId, setSelectedProductId] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const navigate = useNavigate();

    const fetchCategory = async () => {
        const listCategory = await productService.getAllProduct();
        setProducts(listCategory);
    };
    React.useEffect(() => {
        fetchCategory();
    }, []);

    const handleDelete = (cateId) => {
        setSelectedProductId(cateId);
        // show pop up to confirm this action
        setShowPopup(true);
    };

    const confirmDelete = async (id) => {
        // call api để xóa
        const respone = await productService.deleteProduct(id);

        if (respone.status === 204) {
            setMessage('Xóa product thành công');
            setTypeMessage('success');

            const updatedProducts = products.filter((product) => product._id !== id);
            setProducts(updatedProducts);
        } else {
            setMessage('Xóa product thất bại');
            setTypeMessage('error');
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
        }, 3000);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleEdit = (id) => {
        navigate(`${id}/edit`);
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
                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Products</Typography>
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
                    placeholder="Search Customer"
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
                            <CustomTableCell align="left">Name</CustomTableCell>
                            <CustomTableCell align="left">Image</CustomTableCell>
                            <CustomTableCell align="left">Brand</CustomTableCell>
                            <CustomTableCell align="left">Category</CustomTableCell>
                            <CustomTableCell align="left">Price</CustomTableCell>
                            <CustomTableCell align="center">Active</CustomTableCell>
                            <CustomTableCell align="center">Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.length > 0 &&
                            products.map((row, index) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <CustomTableCell component="th" scope="row">
                                        {index + 1}
                                    </CustomTableCell>
                                    <CustomTableCell
                                        align="left"
                                        sx={{
                                            width: '320px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {row.name}
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                        <img src={row.images} width="80px" height="80px" />
                                    </CustomTableCell>
                                    <CustomTableCell align="left">{row.brand}</CustomTableCell>
                                    <CustomTableCell align="left">{row.categoryId}</CustomTableCell>
                                    <CustomTableCell align="left">{row.price}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        {row.isActive ? (
                                            <CheckIcon color="success" fontSize="large" />
                                        ) : (
                                            <CloseIcon color="error" fontSize="large" />
                                        )}
                                    </CustomTableCell>
                                    <CustomTableCell align="center">
                                        <IconButton onClick={() => handleDelete(row._id)}>
                                            <DeleteIcon color="error" fontSize="large" />
                                        </IconButton>

                                        <IconButton onClick={() => handleEdit(row._id)}>
                                            <EditNoteIcon color="info" fontSize="large" />
                                        </IconButton>
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {showPopup && (
                <PopupConfirm
                    handleClose={handleClosePopup}
                    id={selectedProductId}
                    confirmDelete={confirmDelete}
                />
            )}
        </Box>
    );
}

export default Product;
