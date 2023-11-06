import React, {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

function Popup({content, title}) {
    
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    // openDialog

    return (
        <Dialog
            // open={props.openDialog}
            // open={handleOpenDialog}
            
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <CheckCircleIcon color="success" />
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} startIcon={<CloseIcon />}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Popup;
