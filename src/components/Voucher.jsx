import React from 'react';
import Helmet from './Helmet';
import InfoUser from './infoUser';
const Voucher = () => {
    return (
        <Helmet title="Mã giảm giá">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser></InfoUser>
                </div>
                <div className="profile__right">Voucher</div>
            </div>
        </Helmet>
    );
};

export default Voucher;
