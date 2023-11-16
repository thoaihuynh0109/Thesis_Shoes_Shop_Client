import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'green',
    '&:hover': {
        backgroundColor: 'blue',
        // backgroundColor: alpha(theme.palette.common.blue, 0.8),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme, onClick }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    onClick: onClick,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {
    const handleNavigate = () => {
        navigate('/shop');
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const handleKeywordChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    // const handleSearch = () => {
    //     const query = encodeURIComponent(searchKeyword.trim());
    //     navigate(`/shop?search=${query}`);
    // };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
                <Toolbar>
                    <Search onSearch={handleSearch}>
                        <IconButton onButton color="inherit" onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search', value: searchKeyword }}
                            onChange={handleKeywordChange}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
