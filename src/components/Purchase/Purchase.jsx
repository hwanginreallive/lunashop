import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Tab, Tabs } from '@mui/material';

import Helmet from '../Helmet/Helmet';
import InfoUser from '../User/infoUser';

import productData from '~/assets/fake-data/products';

import Deny from './Deny';
import Shipped from './Shipped';
import Shipping from './Shipping';
import WaitToConfirm from './WaitToConfirm';

import { useGetOrderByUserQuery } from '~/redux/api/orderApi/orderApi';

import { Button } from '@mui/material';

import { MdErrorOutline, MdLocalShipping, MdOutlineMailOutline, MdTaskAlt } from 'react-icons/md';
const Purchase = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

    const [dataShipped, setDataShipped] = useState([]);
    const [dataShipping, setDataShipping] = useState([]);
    const [dataDeny, setDataDeny] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    const userCookies = JSON.parse(localStorage?.getItem('token'));
    const { data } = useGetOrderByUserQuery({
        id: userCookies,
    });

    useEffect(() => {
        if (data?.length > 0) {
        }
    }, [data]);

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
                                <Shipping product={dataShipping}>
                                    <Button variant="contained" size="medium" startIcon={<MdLocalShipping />}>
                                        Đơn hàng đang trên đường vận chuyển
                                    </Button>
                                </Shipping>
                            )}
                            {selectedTab === 2 && (
                                <Shipped product={dataShipped}>
                                    <Button variant="contained" size="medium" startIcon={<MdTaskAlt />}>
                                        Đơn hàng đã hoàn thành
                                    </Button>
                                </Shipped>
                            )}
                            {selectedTab === 3 && (
                                <Deny product={dataDeny}>
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
