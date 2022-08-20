import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { AiOutlineCheck } from 'react-icons/ai';

const Checkbox = (props) => {
    const inputRef = useRef(null);

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current);
        }
    };

    return (
        <label className="custom-checkbox">
            <input type="checkbox" ref={inputRef} onChange={onChange} name="" id="" checked={props.checked} />
            <span className="custom-checkbox__checkmark">
                <i>
                    <AiOutlineCheck className="icon-check"></AiOutlineCheck>
                </i>
            </span>
            {props.label}
        </label>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};

export default Checkbox;
