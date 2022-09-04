import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../CartItem/CartItem';
import EmptyProductSlide from './EmptyProductSlide';
const Shiping = ({ product }) => {
    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => <CartItem item={item} key={index}></CartItem>)
            ) : (
                <EmptyProductSlide></EmptyProductSlide>
            )}
        </div>
    );
};

Shiping.propTypes = {
    product: PropTypes.array,
};

export default Shiping;
