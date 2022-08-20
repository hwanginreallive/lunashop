import React from 'react';
import PropTypes from 'prop-types';

const PolicyCard = (props) => {
    return (
        <div className="policy-card">
            <div className="policy-card__icon">
                <i>{props.icon}</i>
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
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default PolicyCard;
