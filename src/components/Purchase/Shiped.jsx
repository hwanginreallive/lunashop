import React from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem/CartItem';

const Shiped = ({ product }) => {
    return (
        <div>
            {product.map((item, index) => (
                <CartItem item={item} key={index} Shiped></CartItem>
            ))}
        </div>
    );
};

Shiped.propTypes = {};

export default Shiped;
