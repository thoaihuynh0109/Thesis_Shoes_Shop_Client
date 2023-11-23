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
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'lightGray',
    },
    width: '12px',
    padding: '8px 4px',
    transition: 'width 0.3s ease-in-out',
    [theme.breakpoints.up('sm')]: {
        width: '20ch',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    marginLeft: theme.spacing(1),
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    transition: 'width 0.3s ease-in-out', // Added transition
}));

const SearchIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.5),
}));

export default function SearchAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        dispatch(setSearchTerm(term));
    };

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
                    className={isSearchFocused ? 'focused' : ''} // Apply the 'focused' class when input is focused
                />
                <Grow in={isSearchFocused}>
                    <SearchIconButton
                        color="inherit"
                        onClick={handleSearchClick}
                        aria-label="search"
                        sx={{
                            padding: '0 8px',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
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
