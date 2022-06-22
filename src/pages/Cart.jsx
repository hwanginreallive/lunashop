import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import productData from '~/assets/fake-data/products';
import Button from '~/components/Button';
import Helmet from '~/components/Helmet';

import CartItem from '~/components/CartItem';

import numberWithCommas from '~/utils/numberWithCommas';

const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

    console.log(productData.getCartItemsInfo(cartItems));

    const [cartProducts, setCartProduct] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartProduct(productData.getCartItemsInfo(cartItems));
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
        setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
    }, [cartItems]);

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền</span>
                            <span>{numberWithCommas(totalPrice)}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Link to="/catalog">
                            <Button>Tiếp tục mua hàng</Button>
                        </Link>
                        <Button>Thanh toán</Button>
                    </div>
                </div>
                <div className="cart__list">
                    {cartProducts.map((item, index) => (
                        <CartItem item={item} key={index}></CartItem>
                    ))}
                </div>
            </div>
        </Helmet>
    );
};

export default Cart;
