import React from 'react';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';

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
