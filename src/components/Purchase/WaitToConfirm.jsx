import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem/CartItem';
const WaitToConfirm = ({ product }) => {
    return (
        <div>
            {product.map((item, index) => (
                <CartItem item={item} key={index} delete></CartItem>
            ))}
        </div>
    );
};

WaitToConfirm.propTypes = {};

export default WaitToConfirm;
