import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function PopupConfirm({ handleClose, userId, confirmDelete }) {
    const handleConfirmClick = () => {
        confirmDelete(userId);
        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog
                open={true} // Mở dialog khi được render
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Bạn có muốn xóa người này vĩnh viễn không ?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Hành động này sẽ không thể khôi phục. Bạn chắc chắn chứ ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmClick}>Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
