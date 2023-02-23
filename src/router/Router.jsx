import { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Coin from '~/components/Coin/Coin';
import Notification from '~/components/Notification/Notification';
import Profile from '~/components/Profile/Profile';
import Purchase from '~/components/Purchase/Purchase';
import Voucher from '~/components/Voucher/Voucher';
import Login from '~/pages/auth/Login';
import Support from '~/pages/Support';
import { setLayout } from '~/redux/slices/layout/layoutConfigSlice';
import Cart from '../pages/Cart';
import Catalog from '../pages/Catalog';
import Home from '../pages/Home';
import Payment from '../pages/Payment';
import Product from '../pages/Product';
const Router = () => {
    const { pathname } = useLocation();
    const layoutConfig = useSelector((state) => state.setLayout.layout);
    const dispatch = useDispatch();

    useEffect(() => {
        if (pathname.includes('/login')) {
            dispatch(
                setLayout({
                    header: false,
                    footer: false,
                }),
            );
        } else if (layoutConfig?.header !== true) {
            dispatch(
                setLayout({
                    header: true,
                    footer: true,
                }),
            );
        }
        // eslint-disable-next-line
    }, [pathname]);

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
