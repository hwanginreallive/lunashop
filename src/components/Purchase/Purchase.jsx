import React, { useEffect, useState } from 'react';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';
import { Tabs, Tab } from '@mui/material';

import { useSelector } from 'react-redux';

import productData from '~/assets/fake-data/products';

const Purchase = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const [cartProducts, setCartProduct] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartProduct(productData.getCartItemsInfo(cartItems));
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
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
                        {}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Purchase;
