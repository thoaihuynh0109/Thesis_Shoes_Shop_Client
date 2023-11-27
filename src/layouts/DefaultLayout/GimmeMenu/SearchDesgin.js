import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '~/redux/SearchManagemenet/searchActions';
import { Box, InputBase, IconButton, Grow, Zoom } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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
    transition: 'width 0.3s ease-in-out',
}));

const SearchIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.5),
}));

export default function SearchAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        dispatch(setSearchTerm(term));
    };

    const handleSearchClick = () => {
        navigate('/shop');
    };

    // listen event --> when user type and then press "Enter" or Click Search icon
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Check if the current location is already '/shop'
            if (location.pathname !== '/shop') {
                navigate('/shop');
            }
        }
    };

    // href to '/shop'
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [location.pathname]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <SearchContainer>
                <StyledInputBase
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search' }}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    onChange={handleSearchChange}
                    className={isSearchFocused ? 'focused' : ''}
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
