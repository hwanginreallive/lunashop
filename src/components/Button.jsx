import React from 'react';
import PropTypes from 'prop-types';

import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Button = (props) => {
    const bg = props.backGroundColor ? 'bg-' + props.backGroundColor : 'bg-main';

    const size = props.size ? 'btn-' + props.size : '';

    const animate = props.animate ? 'btn-animate' : '';

    return (
        <Link to={props.to}>
            <button className={`btn ${bg} ${size} ${animate} `} onClick={props.onClick ? () => props.onClick() : null}>
                <span className="btn__txt">{props.children}</span>

                <span className="btn__icon">
                    <BiCart></BiCart>
                </span>
            </button>
        </Link>
    );
};

Button.propTypes = {
    backGroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
