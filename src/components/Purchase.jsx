import React, { useEffect, useState } from 'react';
import Helmet from './Helmet';
import InfoUser from './infoUser';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

import numberWithCommas from '~/utils/numberWithCommas';

import productData from '~/assets/fake-data/products';
const Purchase = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

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
                        {cartProducts.map((item, index) => (
                            <CartItem item={item} key={index}></CartItem>
                        ))}
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Purchase;
