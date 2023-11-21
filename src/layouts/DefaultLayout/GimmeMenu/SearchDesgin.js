import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '~/redux/SearchManagemenet/searchActions';
import { Box, InputBase, IconButton, Grow, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ccc', // Added border
    backgroundColor: 'lightGray',
    '&:hover': {
        backgroundColor: 'white',
    },
    width: '12ch',
    transition: 'width 0.3s ease-in-out',
    [theme.breakpoints.up('sm')]: {
        width: '20ch',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    marginLeft: theme.spacing(1),
    flex: 1,
    border: 'none', // Removed the default input border
    outline: 'none', // Removed the default input outline
}));

const SearchIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.5),
}));

export default function SearchAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // save data in input when user is not at '/shop'
    const handleSearchChange = (e) => {
        const term = e.target.value;
        dispatch(setSearchTerm(term));
    };

    // Navigate to '/shop' when the search icon is clicked
    const handleSearchClick = () => {
        navigate('/shop');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <SearchContainer>
                <StyledInputBase
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search' }}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    onChange={handleSearchChange}
                />
                <Grow in={isSearchFocused}>
                    <SearchIconButton
                        color="inherit"
                        onClick={handleSearchClick}
                        aria-label="search"
                        sx={{ padding: 0 }}
                    >
                        <Zoom in={isSearchFocused} style={{ transitionDelay: '150ms' }}>
                            <SearchIcon />
                        </Zoom>
                    </SearchIconButton>
                </Grow>
            </SearchContainer>
        </Box>
    );
}
