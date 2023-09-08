import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import CartItem from '~/components/CartItem/CartItem';
import Helmet from '~/components/Helmet/Helmet';
import numberWithCommas from '~/utils/numberWithCommas';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetCartByUserQuery } from '~/redux/api/cartApi/cartApi';
import { useGetListProductsQuery } from '~/redux/api/productApi/productApi';
const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.value);
    const userCart = JSON.parse(localStorage.getItem('cartItems'));

    const userCookies = JSON.parse(localStorage.getItem('token'));

    const { data, refetch } = useGetCartByUserQuery({ id: userCookies?.id }, { refetchOnMountOrArgChange: true }) || [];
    const { data: dataCart } = useGetListProductsQuery({ refetchOnMountOrArgChange: true }) || [];

    const [cartProducts, setCartProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        if (data) {
            const dataFilter = data.filter((item) => item.isOrder === false);
            setCartProduct(dataFilter && dataFilter);
            setTotalProducts(dataFilter.reduce((total, item) => total + Number(item.quantity), 0));
            setTotalPrice(
                dataFilter.reduce((total, item) => total + Number(item.quantity) * Number(item.product.price), 0),
            );
        } else if (dataCart) {
            const dataStore = userCart?.map((cart) => {
                const data = dataCart.find((item) => item._id === cart.id);
                return {
                    product: data,
                    ...cart,
                };
            });
            setCartProduct(dataStore);
            setTotalProducts(dataStore?.reduce((total, item) => total + Number(item.quantity), 0));
            setTotalPrice(dataStore?.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0));
        }
        // eslint-disable-next-line
    }, [data, cartItems, dataCart]);

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền</span>
                            <span>{totalPrice && numberWithCommas(totalPrice)}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Link to="/catalog">
                            <Button variant="contained" size="large">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                        <div className="btn-pay">
                            <Button variant="contained" disabled={!(cartProducts?.length > 0)} size="large">
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
