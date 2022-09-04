import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Tabs, Tab } from '@mui/material';
import { TabPanel } from '@mui/lab';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';

import productData from '~/assets/fake-data/products';

import { products_shipping, products_shipped, products_deny } from '~/assets/fake-data/products';
import WaitToConfirm from './WaitToConfirm';
import Shipping from './Shipping';
import Shipped from './Shipped';
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
                            <Tab label="Chờ xác nhận" value="1" />
                            <Tab label="Đang Giao" value="2" />
                            <Tab label="Đã Giao" value="3" />
                            <Tab label="Đã Hủy" value="4" />
                        </Tabs>
                        <TabPanel value="1">1</TabPanel>
                        <TabPanel value="2">2</TabPanel>
                        <TabPanel value="3">3</TabPanel>
                        <TabPanel value="4">4</TabPanel>
                        {/* {selectedTab === 0 && <WaitToConfirm product={cartProducts}></WaitToConfirm>}
                        {selectedTab === 1 && <Shipping product={products_shipping}></Shipping>}
                        {selectedTab === 2 && <Shipped product={products_shipped}></Shipped>}
                        {selectedTab === 3 && <Deny product={products_deny}></Deny>} */}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Purchase;
