import React from 'react';
import { Button, IconButton, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


// Test data 
function createData(removeIcon, productImage, unitPrice, stockStatus, shoppingButton) {
    return { removeIcon, productImage, unitPrice, stockStatus, shoppingButton };
  }
  
  const rowsTest = [
    createData(
      <IconButton>
        <DeleteIcon fontSize="large"/>
      </IconButton>,
      // <ProductImage imageSrc="path/to/image" />,
      <img src='https://i.pinimg.com/564x/57/af/3a/57af3a52b9cf2cc14b7e8de3dd4b5020.jpg ' style={{borderRadius:'20px', border:'1px solid #333', width: '100px', height: '100px' }}/>,
      69.0,
      true,
      <Button variant="contained" sx={{fontSize: '13px'}} startIcon={<AddShoppingCartIcon />}>
        Add to Cart
      </Button>
    ),
  
    createData(
      <IconButton>
        <DeleteIcon fontSize="large"/>
      </IconButton>,
      // <ProductImage imageSrc="path/to/image" />,
      <img src='https://i.pinimg.com/originals/2f/39/cb/2f39cbc5566366d03f7f00c36854f552.gif ' style={{borderRadius:'20px', border:'1px solid #333', width: '100px', height: '100px' }}/>,
      20.0,
      true,
      <Button variant="contained" sx={{fontSize: '13px'}} startIcon={<AddShoppingCartIcon />}>
        Add to Cart
      </Button>
    ),
  
    createData(
      <IconButton >
        <DeleteIcon  fontSize="large"/>
      </IconButton>,
      // <ProductImage imageSrc="path/to/image" />,
      <img src='https://i.pinimg.com/564x/39/a4/a6/39a4a617bb1fa017a1593eccba7df149.jpg ' style={{borderRadius:'20px', border:'1px solid #333', width: '100px', height: '100px' }}/>,
      99.0,
      true,
      <Button variant="contained" sx={{fontSize: '13px'}} startIcon={<AddShoppingCartIcon />}>
        Add to Cart
      </Button>
    ),
    
  ];
  
  const CustomizeTableCell = (styled)(TableCell) ({
    fontSize: '18px',
    borderRadius: '20px',
    align:"center",
  });



  function WishListTable() {
    return (
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow >
              <CustomizeTableCell >Remove Icon</CustomizeTableCell>
              <CustomizeTableCell>Image</CustomizeTableCell>
              <CustomizeTableCell>Unit Price</CustomizeTableCell>
              <CustomizeTableCell>Stock Status</CustomizeTableCell>
              <CustomizeTableCell>Shopping</CustomizeTableCell>
            </TableRow>
          </TableHead>
          {/* removeIcon, productImage, unitPrice, stockStatus, shoppingButton */}
          <TableBody>
            {rowsTest.map((row) => (
              <TableRow
                key={row.unitPrice}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CustomizeTableCell component="th" scope="row" fontSize='large'>
                  {row.removeIcon}
                </CustomizeTableCell>
                <CustomizeTableCell borderRadius='20px'>{row.productImage}</CustomizeTableCell>
                <CustomizeTableCell>{row.unitPrice}</CustomizeTableCell>
                <CustomizeTableCell>
                  {row.stockStatus ? 'In Stock' : 'Sold Out'}
                </CustomizeTableCell>
                <CustomizeTableCell >{row.shoppingButton}</CustomizeTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default WishListTable;