import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../CartItem/CartItem';
import EmptyProductSlide from './EmptyProductSlide';
const Shipping = ({ product }) => {
    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => <CartItem item={item} key={index} Shipping></CartItem>)
            ) : (
                <EmptyProductSlide></EmptyProductSlide>
            )}
        </div>
    );
};

Shipping.propTypes = {
    product: PropTypes.array,
};

export default Shipping;
