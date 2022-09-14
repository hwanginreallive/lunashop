import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './VoucherItems.scss';
import VoucherIMG from '~/assets/images/voucher-extra.png';
const VoucherItems = (props) => {
    const { refund, freeShip, discount } = props;

    return (
        <div className="voucher-item">
            <div className="voucher-item__left" style={refund && { backgroundColor: '#ee4d2d' }}>
                <div className="voucher-item__left__label">
                    <Typography variant="subtitle2">Số lượng có hạn</Typography>
                </div>
                {refund && <img src={VoucherIMG} style={{ width: 56 }} alt="voucher"></img>}
                {freeShip && (
                    <div className="voucher-item__left__content">
                        <Typography variant="h5">Miễn phí vận chuyển</Typography>
                    </div>
                )}
                {discount && (
                    <div className="voucher-item__left__content">
                        <Typography variant="h5">{'Mã Giảm Giá'}</Typography>
                    </div>
                )}
            </div>
            <div className="voucher-item__right">
                <div className="voucher-item__right__content">
                    <div className="voucher-item__right__content__title">
                        <Typography variant="h7">Số lượng có hạn</Typography>
                    </div>
                    <div className="voucher-item__right__content__label">
                        <Button variant="outlined" disableRipple={true}>
                            Tối đa 30k
                        </Button>
                    </div>
                    <div className="voucher-item__right__content__info">
                        <Typography variant="subtitle1" style={{ color: '#ff424f' }}>
                            Sắp hết hạn: Còn 12 giờ
                        </Typography>
                    </div>
                </div>
                <div className="voucher-item__right__btn">
                    <Button endIcon={<NavigateNextIcon />}>{' Dùng ngay '}</Button>
                    <Button style={{ color: '#ee4d2d' }}>Điều kiện</Button>
                </div>
            </div>
        </div>
    );
};

VoucherItems.propTypes = {};

export default VoucherItems;
