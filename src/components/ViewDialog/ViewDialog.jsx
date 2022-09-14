import React, { forwardRef } from 'react';
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ViewDialog = ({ handleCloseDialog, removeCartItem, isDialogOpen }) => {
    return (
        <div>
            <Dialog
                open={isDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent
                    maxWidth="md"
                    sx={{
                        height: 100,
                        width: 350,
                    }}
                >
                    <DialogContentText id="alert-dialog-slide-description">
                        Sản phẩm này sẽ bị xóa khỏi giỏ hàng
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained">
                        Hủy Bỏ
                    </Button>
                    <Button onClick={removeCartItem} variant="contained">
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewDialog;
