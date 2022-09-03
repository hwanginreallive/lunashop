import React from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem/CartItem';
const WaitToConfirm = ({ product }) => {
    return (
        <div>
            {product.map((item, index) => (
                <CartItem item={item} key={index} confirm></CartItem>
            ))}
        </div>
    );
};

WaitToConfirm.propTypes = {
    product: PropTypes.array,
};

export default WaitToConfirm;
