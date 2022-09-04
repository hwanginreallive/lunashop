import React from 'react';
import PropTypes from 'prop-types';
import emptyImage from '~/assets/images/emptyproduct.png';
import { Typography } from '@mui/material';
const EmptyProductSlide = (props) => {
    return (
        <div className="empty-product-slide">
            <img src={emptyImage} alt="empty" />
            <Typography>Chưa có đơn hàng</Typography>
        </div>
    );
};

EmptyProductSlide.propTypes = {};

export default EmptyProductSlide;
