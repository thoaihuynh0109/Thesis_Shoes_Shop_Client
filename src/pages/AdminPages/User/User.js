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
import userService from '~/services/userServices';
import ToastMessage from '~/components/ToastMessage/ToastMessage';

function User() {
    const [selectedUserId, setSelectedUserId] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState(''); // New state for search term
    const navigate = useNavigate();
    const fetchUsers = async () => {
        const listUser = await userService.getAllUser();
        setUsers(listUser);
    };
    React.useEffect(() => {
        fetchUsers();
    }, []);

    React.useEffect(() => {
        // Fetch users when the search term changes
        fetchUsers();
    }, [searchTerm]);

    const handleDelete = (id) => {
        setSelectedUserId(id);
        // show pop up to confirm this action
        setShowPopup(true);
    };

    const confirmDelete = async (id) => {
        // call api để xóa user
        const respone = await userService.deleteUser(id);
        console.log(respone);
        if (respone.status === 204) {
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

    //  filter users based on search term: last name --> full name, email, and phone number
    const filteredUsers = users.filter(
        (user) =>
            (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase())),
    );

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
            {/* Search */}
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                {/* <TextField
                    placeholder="Search Customer"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ height: 25, width: 25 }} />
                            </InputAdornment>
                        ),
                        style: { fontSize: '1.4rem', color: '#000', borderRadius: 8 },
                    }}
                /> */}

                <TextField
                    placeholder="Search Customer"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                            <CustomTableCell align="left">Email</CustomTableCell>
                            <CustomTableCell align="left">Phone</CustomTableCell>
                            <CustomTableCell align="center">Active</CustomTableCell>
                            <CustomTableCell align="center">Action</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length > 0 &&
                            filteredUsers.map((row, index) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <CustomTableCell component="th" scope="row">
                                        {index + 1}
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                        {row.lastName + ' ' + row.firstName}
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
