import React from 'react';
import PropTypes from 'prop-types';

import { BiCart } from 'react-icons/bi';
const ButtonCustom = (props) => {
    const bg = props.backGroundColor ? 'bg-' + props.backGroundColor : 'bg-main';

    const size = props.size ? 'btn-' + props.size : '';

    const animate = props.animate ? 'btn-animate' : '';

    return (
        <button className={`btn ${bg} ${size} ${animate} `} onClick={props.onClick ? () => props.onClick() : null}>
            <span className="btn__txt">{props.children}</span>

            <span className="btn__icon">
                <BiCart></BiCart>
            </span>
        </button>
    );
};

ButtonCustom.propTypes = {
    backGroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
};

export default ButtonCustom;
