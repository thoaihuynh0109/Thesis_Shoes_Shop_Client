import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CustomTableCell from '../CustomTableCell/CustomTableCell';
import userService from '~/services/userServices';
import './User.scss';

function User() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        async function fetchUsers() {
            const listUser = await userService.getAllUser();
            setUsers(listUser);
        }
        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        // show pop up to confirm this action

        // call api to delete the user with id

        console.log(id);
    };

    const navigate = useNavigate();
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
                    marginBottom: 2,
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Customers</Typography>
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
                        {users.length > 0 &&
                            users.map((row, index) => (
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
        </Box>
    );
}

export default User;
