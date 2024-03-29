import React from 'react';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';
import NotificationItem from './NotificationItem';

import productData from '~/assets/fake-data/products';

const Notification = () => {
    return (
        <Helmet title="Thông báo">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser></InfoUser>
                </div>
                <div className="profile__right">
                    <div className="profile__right__notification">
                        <div className="profile__right__notification__title"> Thong Bao</div>
                        <div className="profile__right__notification__list">
                            {productData.getProducts(3).map((product, index) => (
                                <NotificationItem key={index} product={product}></NotificationItem>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Notification;
