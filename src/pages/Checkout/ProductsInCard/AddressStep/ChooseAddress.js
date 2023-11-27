import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, OutlinedInput, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ITEM_HEIGHT, ITEM_PADDING_TOP, MenuProps } from './contants/TestValue';

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CustomizeMenuItem = styled(MenuItem)(({}) => ({
    fontSize: '16px',
}));

function ChooseAddress({ onAddressChange }) {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [userAddresses, setUserAddresses] = useState([]);

    const userId = '123';
    const key = `address_${userId}`;
    useEffect(() => {
        // Truy xuất danh sách địa chỉ cho userId từ local storage hoặc API
        const storedAddresses = JSON.parse(localStorage.getItem(key)) || [];
        setUserAddresses(storedAddresses);
    }, [key]);

    const handleChange = (event) => {
        const selectedId = event.target.value;
        const selectedAddress = userAddresses.find((address) => address.id === selectedId);

        // Pass the selected address to the parent component
        onAddressChange(selectedAddress);

        // Set the selected address ID to update the state for display purposes
        setSelectedAddress(selectedId);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Typography>Select Address </Typography>
                <Select
                    value={selectedAddress}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Chọn địa chỉ
                    </MenuItem>
                    {userAddresses.map((address) => (
                        <MenuItem key={address.id} value={address.id}>
                            {address.address}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
export default ChooseAddress;
