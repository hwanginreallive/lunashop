import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@mui/material';

import CartItem from '../CartItem/CartItem';
import EmptyProductSlide from './EmptyProductSlide';

const Shiped = ({ product }) => {
    const [value, setValue] = useState(5);

    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => (
                    <div key={index}>
                        <CartItem item={item}></CartItem>
                        <Rating
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                ))
            ) : (
                <EmptyProductSlide></EmptyProductSlide>
            )}
        </div>
    );
};

Shiped.propTypes = {
    product: PropTypes.array,
};

export default Shiped;
