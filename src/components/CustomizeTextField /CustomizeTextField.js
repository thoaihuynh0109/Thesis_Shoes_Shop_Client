import { styled, TextField } from '@mui/material';

export const CustomizeTextField = styled(TextField)(
    ({ fullWidth, id, label, mt, variant, inputFontSize, labelFontSize }) => ({
        // fullWidth: fullWidth || true,
        width: fullWidth ? '100%' : 'auto',
        id: id || 'outlined-basic',
        marginTop: mt || '8px',
        '& label': {
            fontSize: labelFontSize || '16px',
        },
        '& input': {
            fontSize: inputFontSize || '16px',
        },
        // make space for label in text field
        '& .MuiInputBase-root': {
            fontSize: '2rem',
        },
        label: label || 'Email',
        variant: variant || 'outlined',
    }),
);
