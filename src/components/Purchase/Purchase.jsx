import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Tabs, Tab } from '@mui/material';
import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';

import productData from '~/assets/fake-data/products';

import { products_shiping, products_shiped, products_deny } from '~/assets/fake-data/products';
import WaitToConfirm from './WaitToConfirm';
import Shiping from './Shiping';
import Shiped from './Shiped';
import Deny from './Deny';
const Purchase = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const [cartProducts, setCartProduct] = useState([]);

    useEffect(() => {
        setCartProduct(productData.getCartItemsInfo(cartItems));
    }, [cartItems]);

    return (
        <Helmet title="Đơn mua">
            <div className="profile">
                <div className="profile__left">
                    <InfoUser></InfoUser>
                </div>
                <div className="profile__right">
                    <div className="profile__right__purchase">
                        <Tabs value={selectedTab} onChange={handleChange}>
                            <Tab label="Chờ xác nhận" />
                            <Tab label="Đang Giao" />
                            <Tab label="Đã Giao" />
                            <Tab label="Đã Hủy" />
                        </Tabs>
                        {selectedTab === 0 && <WaitToConfirm product={cartProducts}></WaitToConfirm>}
                        {selectedTab === 1 && <Shiping product={products_shiping}></Shiping>}
                        {selectedTab === 2 && <Shiped product={products_shiped}></Shiped>}
                        {selectedTab === 3 && <Deny product={products_deny}></Deny>}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Purchase;
