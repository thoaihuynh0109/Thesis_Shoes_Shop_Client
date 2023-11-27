import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { Box, TextField } from '@mui/material';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from './utils';

const CreditCard = () => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = ({ target }) => {
        let value = target.value;

        if (target.name === 'number') {
            value = formatCreditCardNumber(value);
        } else if (target.name === 'expiry') {
            value = formatExpirationDate(value);
        } else if (target.name === 'cvc') {
            value = formatCVC(value);
        }

        setState((prev) => ({ ...prev, [target.name]: value }));
    };

    const handleInputFocus = ({ target }) => {
        setState((prev) => ({ ...prev, focus: target.name }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('You have finished payment!');
        // Reset form fields
        setState({
            number: '',
            expiry: '',
            cvc: '',
            name: '',
            focus: '',
        });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />

            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <CustomizeTextField
                        label="Card Number"
                        variant="outlined"
                        type="text"
                        name="number"
                        placeholder="Input Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </Box>

                <Box>
                    <CustomizeTextField
                        label="Name"
                        variant="outlined"
                        type="text"
                        name="name"
                        placeholder="Name On Card"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </Box>
                <Box>
                    <CustomizeTextField
                        label="Date"
                        variant="outlined"
                        name="expiry"
                        placeholder="Expiration Date"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        sx={{ width: 200 }}
                    />
                    <CustomizeTextField
                        label="CVC"
                        variant="outlined"
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        sx={{ width: 200 }}
                    />
                </Box>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </Box>
        </Box>
    );
};

export default CreditCard;
