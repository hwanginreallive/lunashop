import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../CartItem/CartItem';
import { Button } from '@mui/material';
const Shiping = ({ product }) => {
    return (
        <div>
            {product.map((item, index) => (
                <CartItem item={item} key={index} Shiping></CartItem>
            ))}
            <Button variant="contained">Contained</Button>
        </div>
    );
};

Shiping.propTypes = {};

export default Shiping;
