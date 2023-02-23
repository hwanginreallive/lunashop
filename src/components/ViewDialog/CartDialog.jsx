import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@mui/material';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CartDialog = ({ handleCloseDialog, removeCartItem, isDialogOpen, id }) => {
    return (
        <>
            <Dialog
                open={isDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent
                    sx={{
                        height: 100,
                        maxWidth: 350,
                        borderTop: '7px solid #1976d2',
                    }}
                >
                    <DialogContentText id="alert-dialog-slide-description">
                        Sản phẩm này sẽ bị xóa khỏi giỏ hàng
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="outlined">
                        Hủy Bỏ
                    </Button>
                    <Button onClick={() => removeCartItem(id)} variant="contained">
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CartDialog;
