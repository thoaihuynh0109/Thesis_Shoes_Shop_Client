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
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import CustomTableCell from '../CustomTableCell/CustomTableCell';
import PopupConfirm from '../PopupConfirm/PopupConfirm';
import userService from '~/services/userServices';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Loading from '~/pages/Home/Loading/Loading';
import EmptyCard from '~/pages/Checkout/EmptyCard/EmptyCard';
function User() {
    const [selectedUserId, setSelectedUserId] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(6);
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);
    const [isLoadingData, setIsLoadingData] = React.useState(true);
    // make pagination

    const navigate = useNavigate();

    const fetchUsers = async () => {
        const listUser = await userService.getAllUser();
        setIsLoadingData(false);
        setUsers(listUser);
    };

    React.useEffect(() => {
        fetchUsers();
        // setCurrentPage(1);
    }, [searchTerm, currentPage, itemsPerPage]);

    // reset current page to 1 when the searchTerm changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleDelete = (id) => {
        setSelectedUserId(id);
        setShowPopup(true);
    };

    const confirmDelete = async (id) => {
        const response = await userService.deleteUser(id);
        console.log(response);
        if (response.status === 204) {
            setMessage('Xóa user thành công');
            setTypeMessage('success');
            setTimeout(() => {
                setMessage('');
                setTypeMessage('');
            }, 3000);
            const updatedUsers = users.filter((user) => user._id !== id);
            setUsers(updatedUsers);
        } else {
            setMessage('Xóa user thất bại');
            setTypeMessage('error');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleEdit = (id) => {
        navigate(`${id}/edit`);
    };

    const filteredUsers = users.filter(
        (user) =>
            (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    // make pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const renderPageNumbers = Array.from({ length: pageNumbers }).map((_, index) => (
        <Button key={index} onClick={() => setCurrentPage(index + 1)} sx={{ mt: 2 }}>
            <CustomTypography>{index + 1}</CustomTypography>
        </Button>
    ));

    //search animation
    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    };

    if (isLoadingData) {
        return <Loading />;
    }

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
                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Customers</Typography>
                    {/* <Stack spacing={1} direction="row">
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <UploadIcon sx={{ mr: 1 }} />
                            Import
                        </Button>
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <DownloadIcon sx={{ mr: 1 }} />
                            Export
                        </Button>
                    </Stack> */}
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
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <TextField
                    placeholder="Search Customer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ height: 25, width: 25 }} />
                            </InputAdornment>
                        ),
                        style: {
                            fontSize: '1.4rem',
                            color: '#000',
                            borderRadius: 8,
                            width: isSearchFocused ? '300px' : '200px',
                            transition: 'width 0.3s ease-in-out', // Add transition effect
                        },
                    }}
                />
            </Paper>
            {filteredUsers.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <CustomTableCell sx={{ fontWeight: 'bold' }}>No</CustomTableCell>
                                <CustomTableCell sx={{ fontWeight: 'bold' }} align="left">
                                    Name
                                </CustomTableCell>
                                <CustomTableCell sx={{ fontWeight: 'bold' }} align="left">
                                    Email
                                </CustomTableCell>
                                <CustomTableCell sx={{ fontWeight: 'bold' }} align="left">
                                    Phone
                                </CustomTableCell>
                                <CustomTableCell sx={{ fontWeight: 'bold' }} align="center">
                                    Active
                                </CustomTableCell>
                                <CustomTableCell sx={{ fontWeight: 'bold' }} align="center">
                                    Action
                                </CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.length > 0 &&
                                currentItems.map((row, index) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <CustomTableCell component="th" scope="row">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </CustomTableCell>
                                        <CustomTableCell align="left">
                                            {row.firstName + ' ' + row.lastName}
                                        </CustomTableCell>
                                        <CustomTableCell align="left">{row.email}</CustomTableCell>
                                        <CustomTableCell align="left">{row.phone}</CustomTableCell>
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
            ) : (
                <EmptyCard message={'No users found.'} />
            )}

            <CustomTypography sx={{ mt: 2, fontSize: '16px' }}>
                <strong>Total of users:</strong> {filteredUsers.length}
            </CustomTypography>

            {filteredUsers.length > 0 ? (
                <Box
                    sx={{ display: 'flex', justifyContent: 'center', mt: 2, alignItems: 'center' }}
                >
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
                        <CustomTypography sx={{ textTransform: 'capitalize' }}>
                            Next
                        </CustomTypography>
                    </Button>
                    <Button
                        onClick={() => setCurrentPage(pageNumbers)}
                        disabled={currentPage === pageNumbers}
                    >
                        {/* <CustomTypography sx={{ textTransform: 'capitalize' }}>Last</CustomTypography> */}
                        <LastPageIcon fontSize="large" />
                    </Button>
                </Box>
            ) : (
                // hide pagination
                <Box></Box>
            )}
            {showPopup && (
                <PopupConfirm
                    handleClose={handleClosePopup}
                    id={selectedUserId}
                    confirmDelete={confirmDelete}
                />
            )}
        </Box>
    );
}

export default User;
