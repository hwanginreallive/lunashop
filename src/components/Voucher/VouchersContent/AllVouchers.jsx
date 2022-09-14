import React from 'react';
import PropTypes from 'prop-types';

import VoucherItems from '../VoucherItems/VoucherItems';

const AllVouchers = (props) => {
    return (
        <>
            <VoucherItems freeShip></VoucherItems>
            <VoucherItems refund></VoucherItems>
            <VoucherItems discount></VoucherItems>
        </>
    );
};

AllVouchers.propTypes = {};

export default AllVouchers;
