import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux/es/hooks/useSelector';

import productData from '~/assets/fake-data/products';
import Button from '~/components/Button';
import Helmet from '~/components/Helmet';
import CartItem from '~/components/CartItem';
import Section, { SectionTitle, SectionBody } from '~/components/Section';
import Grid from '~/components/Grid';
import ProductCard from '~/components/ProductCard';

import numberWithCommas from '~/utils/numberWithCommas';

const Cart = () => {
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
                        <Button to="/catalog">Tiếp tục mua hàng</Button>
                        <div className="btn-pay">
                            <Button>Thanh toán</Button>
                        </div>
                    </div>
                </div>
                <div className="cart__list">
                    {cartProducts.map((item, index) => (
                        <CartItem item={item} key={index}></CartItem>
                    ))}
                </div>
            </div>
            <Section>
                <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(8).map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            ></ProductCard>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
};

export default Cart;
