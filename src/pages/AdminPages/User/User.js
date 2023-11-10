import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CustomTableCell from '~/components/CustomTableCell/CustomTableCell';

import './User.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function createData(id, name, email, phone, address, action) {
    return {
        id,
        name,
        email,
        phone,
        address,
    };
}

const rows = [
    createData(
        1,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        2,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        3,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        4,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        5,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        6,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        7,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        8,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        9,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(
        10,
        'Carson Darrin',
        'carson.darrin@devias.io',
        '304-428-3097',
        'Cleveland, Ohio, USA',
    ),
    createData(11, 'Marshmallow', 'fran.perez@devias.io', '712-351-5711', 'Atlanta, Georgia, USA'),
    createData(12, 'Anika Visser', 'anika.visser@devias.io', '908-691-3242', 'Madrid, , Spain'),
    createData(
        13,
        'Miron Vitold',
        'miron.vitold@devias.io',
        '972-333-4106',
        'San Diego, California, USA',
    ),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <CustomTableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </CustomTableCell>
                {headCells.map((headCell) => (
                    <CustomTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </CustomTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function User() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleCheckClick = (event, id) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            const selectedIndex = selected.indexOf(id);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
            setSelected(newSelected);
        }
    };

    const handleDelete = (event, id) => {
        // show pop up to confirm this action

        // call api to delete the user with id

        console.log(id);
    };

    const navigate = useNavigate();
    const handleEdit = (event, id) => {
        navigate(`${id}/edit`);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

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
                    sx={{ fontSize: '1.6rem', borderRadius: 2.5 }}
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
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, borderRadius: 4 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <CustomTableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) =>
                                                        handleCheckClick(event, row.id)
                                                    }
                                                />
                                            </CustomTableCell>
                                            <CustomTableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </CustomTableCell>
                                            <CustomTableCell align="left">
                                                {row.email}
                                            </CustomTableCell>
                                            <CustomTableCell align="left">
                                                {row.phone}
                                            </CustomTableCell>
                                            <CustomTableCell align="left">
                                                {row.address}
                                            </CustomTableCell>
                                            <CustomTableCell align="left">
                                                <IconButton
                                                    onClick={(event) => handleDelete(event, row.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <EditNoteIcon
                                                        onClick={(event) =>
                                                            handleEdit(event, row.id)
                                                        }
                                                    />
                                                </IconButton>
                                            </CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <CustomTableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className="custom-table-pagination"
                    />
                </Paper>
            </Box>
        </Box>
    );
}

export default User;
