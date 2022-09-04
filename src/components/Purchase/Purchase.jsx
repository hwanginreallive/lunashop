import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Tabs, Tab } from '@mui/material';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';

import productData from '~/assets/fake-data/products';

import { products_shipping, products_shipped, products_deny } from '~/assets/fake-data/products';
import WaitToConfirm from './WaitToConfirm';
import Shipping from './Shipping';
import Shipped from './Shipped';
import Deny from './Deny';

import { Button } from '@mui/material';

import { MdLocalShipping, MdTaskAlt, MdErrorOutline, MdOutlineMailOutline } from 'react-icons/md';
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
                        <div className="profile__right__purchase__tab">
                            <Tabs value={selectedTab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                                <Tab label="Chờ xác nhận" />
                                <Tab label="Đang Giao" />
                                <Tab label="Đã Giao" />
                                <Tab label="Đã Hủy" />
                            </Tabs>
                        </div>
                        <div className="profile__right__purchase__content">
                            {selectedTab === 0 && (
                                <WaitToConfirm product={cartProducts}>
                                    <Button variant="contained" size="medium" startIcon={<MdOutlineMailOutline />}>
                                        Liên hệ với shop
                                    </Button>
                                </WaitToConfirm>
                            )}
                            {selectedTab === 1 && (
                                <Shipping product={products_shipping}>
                                    <Button variant="contained" size="medium" startIcon={<MdLocalShipping />}>
                                        Đơn hàng đang trên đường vận chuyển
                                    </Button>
                                </Shipping>
                            )}
                            {selectedTab === 2 && (
                                <Shipped product={products_shipped}>
                                    <Button variant="contained" size="medium" startIcon={<MdTaskAlt />}>
                                        Đơn hàng đã hoàn thành
                                    </Button>
                                </Shipped>
                            )}
                            {selectedTab === 3 && (
                                <Deny product={products_deny}>
                                    {' '}
                                    <Button variant="contained" size="medium" startIcon={<MdErrorOutline />}>
                                        Đơn hàng đã hủy
                                    </Button>
                                </Deny>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Purchase;
