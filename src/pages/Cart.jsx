import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import CartItem from '~/components/CartItem/CartItem';
import Helmet from '~/components/Helmet/Helmet';
import numberWithCommas from '~/utils/numberWithCommas';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import productData from '~/assets/fake-data/products';
import { useGetCartByUserQuery } from '~/redux/api/cartApi/cartApi';
const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.value);

    const userCookies = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null;

    const { data, refetch } = useGetCartByUserQuery({ id: userCookies?.id }, { refetchOnMountOrArgChange: true }) || [];

    const [cartProducts, setCartProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (data) {
            const dataFilter = data.filter((item) => item.isOrder === false);
            setCartProduct(dataFilter);
            setTotalProducts(dataFilter.reduce((total, item) => total + Number(item.quantity), 0));
            setTotalPrice(
                dataFilter.reduce((total, item) => total + Number(item.quantity) * Number(item.product.price), 0),
            );
        } else {
            setCartProduct(productData.getCartItemsInfo(cartItems));
            setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
            setTotalPrice(cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        }
    }, [data, cartItems]);

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
                            <Button variant="contained" size="large">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                        <div className="btn-pay">
                            <Button variant="contained" disabled={!(cartProducts.length > 0)} size="large">
                                <Link to="/payment">Thanh toán</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="cart__list">
                    {cartProducts?.map((item, index) => (
                        <CartItem item={item} key={index} delete refetch={refetch}></CartItem>
                    ))}
                </div>
            </div>
            {/* <Section>
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
            </Section> */}
        </Helmet>
    );
};

export default Cart;
