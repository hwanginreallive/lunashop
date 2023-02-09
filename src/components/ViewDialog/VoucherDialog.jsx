import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function VoucherDialog({ handleCloseDialog, dialogVoucherOpen, dataVoucherById }) {
    return (
        <div>
            <Dialog open={dialogVoucherOpen} TransitionComponent={Transition} onClose={handleCloseDialog}>
                <DialogTitle
                    style={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                    }}
                >
                    {dataVoucherById?.title}
                </DialogTitle>
                <div style={{ maxWidth: '400px', padding: '0 20px 20px' }}>
                    <div style={{ paddingTop: '20px' }}>
                        <h3> Ưu đãi</h3>
                        <div>{dataVoucherById?.incentives}</div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <h3>Thời gian sử dụng mã</h3>
                        <div>
                            {dataVoucherById?.startDate} - {dataVoucherById?.endDate}{' '}
                        </div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <h3>Sản phẩm</h3>
                        <div>{dataVoucherById?.detail}</div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <h3>Thanh toán</h3>
                        <div>{dataVoucherById?.payments}</div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <h3>Đơn vị vận chuyển</h3>
                        <div>{dataVoucherById?.logistics.join(', ')}</div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <h3>Thanh toán</h3>
                        <div>{dataVoucherById?.payments}</div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <h3>Chi tiết</h3>
                        <div>{`Mã voucher ${dataVoucherById?.voucherCode}, ${dataVoucherById?.detail}`}</div>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Quay lại</Button>
                    <Link to="/cart">
                        <Button variant="contained" onClick={handleCloseDialog} autoFocus>
                            Dùng ngay
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
