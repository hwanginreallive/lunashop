import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@mui/material';

import CartItem from '../CartItem/CartItem';

const Shiped = ({ product }) => {
    const [value, setValue] = useState(5);

    return (
        <div>
            {product.map((item, index) => (
                <div key={index}>
                    <CartItem item={item} Shiped></CartItem>
                    <Rating
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

Shiped.propTypes = {
    product: PropTypes.array,
};

export default Shiped;
