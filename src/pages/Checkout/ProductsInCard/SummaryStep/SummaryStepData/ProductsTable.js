import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

import { styled } from '@mui/system';

import { rowsTest } from './ProductsTableData';




const CustomizeTableCell = styled(({ fontSize, fontWeight, ...rest }) => (
    <TableCell {...rest} />
  ))(({ fontSize, fontWeight }) => ({
    fontSize: fontSize || '16px',
    fontWeight: fontWeight || 'normal',
  }));
function ProductsTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        {/* show image */}
                        <CustomizeTableCell align="left">Product</CustomizeTableCell>
                        <CustomizeTableCell align="left">Description</CustomizeTableCell>
                        <CustomizeTableCell align="left">Status</CustomizeTableCell>
                        <CustomizeTableCell align="left">Unit Price</CustomizeTableCell>
                        {/* can increase the quantity of the product */}
                        <CustomizeTableCell align="left">Quantity</CustomizeTableCell>
                        <CustomizeTableCell align="left">Total</CustomizeTableCell>
                        <CustomizeTableCell align="left">Remove Icon</CustomizeTableCell>
                    </TableRow>
                </TableHead>
                {/* removeIcon, productImage, unitPrice, stockStatus, shoppingButton */}
                <TableBody>
                    {rowsTest.map((row) => (
                        <TableRow
                            key={row.unitPrice}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <CustomizeTableCell component="th" scope="row">
                                {row.productImage}
                            </CustomizeTableCell>
                            <CustomizeTableCell align="left" fontSize='999px'>{row.description}</CustomizeTableCell>
                            <CustomizeTableCell align="left">
                                {row.stockStatus ? 'In Stock' : 'Sold Out'}
                            </CustomizeTableCell>
                            <CustomizeTableCell align="left">{row.unitPrice}</CustomizeTableCell>
                            <CustomizeTableCell align="left">{row.quantity}</CustomizeTableCell>
                            <CustomizeTableCell align="left">{row.totalPriceQuantity}</CustomizeTableCell>
                            <CustomizeTableCell align="left">{row.removeIcon}</CustomizeTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductsTable;