import React from 'react';
import PropTypes from 'prop-types';

import VoucherItems from '../VoucherItems/VoucherItems';

const DiscountVoucher = (props) => {
    return (
        <>
            <VoucherItems discount></VoucherItems>
            <VoucherItems discount></VoucherItems>
            <VoucherItems discount></VoucherItems>
            <VoucherItems discount></VoucherItems>
            <VoucherItems discount></VoucherItems>
            <VoucherItems discount></VoucherItems>
        </>
    );
};

DiscountVoucher.propTypes = {};

export default DiscountVoucher;
