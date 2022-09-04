import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@mui/material';

import CartItem from '../CartItem/CartItem';
import EmptyProductSlide from './EmptyProductSlide';

const Shipped = ({ product }) => {
    const [value, setValue] = useState(5);

    return (
        <div>
            {product.length > 0 ? (
                product.map((item, index) => (
                    <div key={index}>
                        <CartItem item={item} Shipped stardust>
                            <Rating
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </CartItem>
                    </div>
                ))
            ) : (
                <EmptyProductSlide></EmptyProductSlide>
            )}
        </div>
    );
};

Shipped.propTypes = {
    product: PropTypes.array,
};

export default Shipped;
