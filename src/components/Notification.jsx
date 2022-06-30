import React from 'react';
import Helmet from './Helmet';
import InfoUser from './infoUser';
import productData from '~/assets/fake-data/products';
import NotificationItem from './NotificationItem';
const Notification = () => {
    return (
        <Helmet title="Thông báo">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser></InfoUser>
                </div>
                <div className="profile__right">
                    <div className="profile__right__notification">
                        <div className="profile__right__notification__title">
                            <h4>Đánh dấu đã độc tất cả</h4>
                        </div>
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
