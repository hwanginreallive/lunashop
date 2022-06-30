import React from 'react';
import PropTypes from 'prop-types';
import 'boxicons';
const PolicyCard = (props) => {
    const name = 'asd';
    return (
        <div className="policy-card">
            <div className="policy-card__icon">
                <box-icon type="regular  " name={props.icon}></box-icon>
            </div>
            <div className="policy-card__info">
                <div className="policy-card__info__name">
                    <p>{props.name}</p>
                </div>
                <div className="policy-card__info__description">
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
};

PolicyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default PolicyCard;
