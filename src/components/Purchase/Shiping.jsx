import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../CartItem/CartItem';
const Shiping = ({ product }) => {
    return (
        <div>
            {product.map((item, index) => (
                <CartItem item={item} key={index} Shiping></CartItem>
            ))}
        </div>
    );
};

Shiping.propTypes = {
    product: PropTypes.array,
};

export default Shiping;
