import  React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import ProductsInShop from '../ProductsInShop/ProductsInShop'
const StyledPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    fontSize: '18px', // Adjust the font size as desired
  },
});

function PaginationControlled() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>

      <StyledPagination
        count={10}
        page={page}
        onChange={handleChange}
        size="large"
      />
    </Stack>
  );
}

export default PaginationControlled;