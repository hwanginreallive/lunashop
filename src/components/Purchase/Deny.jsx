import React from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem/CartItem';
import EmptyProductSlide from './EmptyProductSlide';

const Deny = ({ product }) => {
    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => <CartItem item={item} key={index} Deny></CartItem>)
            ) : (
                <EmptyProductSlide></EmptyProductSlide>
            )}
        </div>
    );
};

Deny.propTypes = {
    product: PropTypes.array,
};

export default Deny;
