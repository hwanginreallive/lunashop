import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@mui/material';

import CartItem from '../CartItem/CartItem';

const Shiped = ({ product }) => {
    const [value, setValue] = useState(2);

    return (
        <div>
            {product.map((item, index) => (
                <>
                    <CartItem item={item} key={index} Shiped></CartItem>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </>
            ))}
        </div>
    );
};

Shiped.propTypes = {};

export default Shiped;
