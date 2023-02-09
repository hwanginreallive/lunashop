import React, { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import Support from '~/pages/Support';
import Profile from '~/components/Profile/Profile';
import Purchase from '~/components/Purchase/Purchase';
import Coin from '~/components/Coin/Coin';
import Voucher from '~/components/Voucher/Voucher';
import Notification from '~/components/Notification/Notification';
import Login from '~/pages/auth/Login';
import Payment from '../pages/Payment';
import { useDispatch } from 'react-redux';
import { setLayout } from '~/redux/slices/layout/layoutConfigSlice';
const Router = () => {
    const { pathname } = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (pathname.includes('/login')) {
            dispatch(
                setLayout({
                    header: false,
                    footer: false,
                }),
            );
        } else {
            dispatch(
                setLayout({
                    header: true,
                    footer: true,
                }),
            );
        }
    }, [pathname, dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog/:slug" element={<Product />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/support" element={<Support />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/purchase" element={<Purchase />} />
            <Route path="/user/coin" element={<Coin />} />
            <Route path="/user/voucher" element={<Voucher />} />
            <Route path="/user/notification" element={<Notification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
    );
};

export default Router;
