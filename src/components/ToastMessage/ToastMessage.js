import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CustomTypography from '../CustomTyporaphy/CustomTyporaphy';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ToastMessage({ message, type }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    <CustomTypography>{message}</CustomTypography>
                </Alert>
            </Snackbar>
        </Stack>
    );
}
