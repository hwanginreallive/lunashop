import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import './VoucherItems.scss';
const VoucherItems = (props) => {
    return (
        <div className="voucher-item">
            <div className="voucher-item__left">
                <div className="voucher-item__left__label">
                    <Typography variant="subtitle2">Số lượng có hạn</Typography>
                </div>
                <div className="voucher-item__left__content">
                    <Typography variant="h5">Miễn phí vận chuyển</Typography>
                </div>
            </div>
            <div className="voucher-item__right">
                <div className="voucher-item__right__content"></div>
            </div>
        </div>
    );
};

VoucherItems.propTypes = {};

export default VoucherItems;
