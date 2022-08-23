import React from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem/CartItem';

const Deny = ({ product }) => {
    return (
        <div>
            {product.map((item, index) => (
                <CartItem item={item} key={index} Deny></CartItem>
            ))}
        </div>
    );
};

Deny.propTypes = {};

export default Deny;
