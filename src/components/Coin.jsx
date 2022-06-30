import React from 'react';
import Helmet from './Helmet';
import InfoUser from './infoUser';

const coin = () => {
    return (
        <Helmet title="Xu">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser></InfoUser>
                </div>
                <div className="profile__right">Coin</div>
            </div>
        </Helmet>
    );
};

export default coin;
