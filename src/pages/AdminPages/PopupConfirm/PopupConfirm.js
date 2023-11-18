import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
export default function PopupConfirm({ handleClose, id, confirmDelete }) {
    const handleConfirmClick = () => {
        confirmDelete(id);
        handleClose();
    };

    return (
        <Dialog
            open={true} // Mở dialog khi được render
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography fontSize="20px">Bạn có muốn xóa vĩnh viễn không ?</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography fontSize="16px">
                        Hành động này sẽ không thể khôi phục. Bạn chắc chắn chứ ?
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{ fontSize: '14px' }} onClick={handleClose}>
                    Cancel
                </Button>
                <Button sx={{ fontSize: '14px' }} onClick={handleConfirmClick}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
