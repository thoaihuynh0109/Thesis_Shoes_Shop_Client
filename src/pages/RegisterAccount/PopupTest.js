import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Box,
    Typography,
    Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Slide from '@mui/material/Slide';
// success-icon-removebg-preview.png
// import SuccessImage from '~/assets/images/success-icon.png';
import SuccessImage from '~/assets/images/success-icon-removebg-preview.png';
import ErrorImage from '~/assets/images/signs-close-icon-png.webp';

// make slide animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PopupTest(props) {
    const { open, title, content, handleClose, isSuccess = true } = props;

    return (
        <Dialog TransitionComponent={Transition} keepMounted onClose={handleClose} open={open}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: '8px',
                    top: '8px',
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '20vh',
                    mt: 5,
                    mb: 4,
                }}
            >
                {isSuccess ? (
                    <img
                        // src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png"
                        src={SuccessImage}
                        style={{ width: '200px', height: '100px' }}
                        alt="Success Logo"
                    />
                ) : (
                    <img
                        // src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png"
                        src={ErrorImage}
                        style={{ width: '200px', height: '100px' }}
                        alt="Error Logo"
                    />
                )}

                <Typography variant="h3" sx={{ color: '#6bc839', fontWeight: 'bold' }}>
                    {title}
                    {/* Success! */}
                </Typography>
            </Box>
            {/* <DialogTitle>{title}</DialogTitle> */}
            <DialogContent>
                <DialogContentText>
                    <Typography variant="body1" sx={{ fontSize: '20px', mt: -2 }}>
                        {content}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Chip
                            label="Continue"
                            color="success"
                            sx={{
                                backgroundColor: '#6bc839',
                                fontSize: '16px',
                                color: '#fff',
                                fontWeight: 'bold',
                                p: 2,
                                mt: 2,
                                mb: 2,
                            }}
                            variant="outlined"
                        />
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default PopupTest;
