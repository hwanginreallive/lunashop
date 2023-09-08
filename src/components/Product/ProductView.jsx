import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Button, Fab } from '@mui/material';

import { AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAddCartMutation } from '~/redux/api/cartApi/cartApi';
import { addItem } from '~/redux/slices/shopping-cart/cartItemsSlide';
import numberWithCommas from '~/utils/numberWithCommas';
import { notifyError, notifySuccess, notifyWarning } from '../Toasts/Toast';
const ProductView = ({ product }) => {
    const dispatch = useDispatch();

    const [create, { isSuccess, isError }] = useAddCartMutation({
        refetchOnMountOrArgChange: true,
    });
    const user = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null;

    const [previewImg, setPreviewImg] = useState(product?.images[0]);
    const [descriptionExpand, setDescriptionExpand] = useState(false);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    const history = useNavigate();

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setPreviewImg(product?.images[0]);
    }, [product]);

    const check = () => {
        if (!color) {
            notifyWarning('Vui lòng chọn màu sắc');
            return false;
        }
        if (!size) {
            notifyWarning('Vui lòng chọn kích thước');
            return false;
        }
        return true;
    };

    const addToCart = async () => {
        if (check()) {
            const data = await create({
                product: product._id,
                user: user?.id,
                color: color.value,
                size: size.value,
                quantity: quantity,
                price: product.price,
            });

            if (data)
                dispatch(
                    addItem({
                        id: product._id,
                        user: user?.id,
                        color: color.value,
                        size: size.value,
                        quantity: quantity,
                        price: product.price,
                        _id: data.data._id,
                    }),
                );
        }
    };

    const goToCart = async () => {
        if (check()) {
            const result = await create({
                product: product._id,
                user: user?.id,
                color: color.value,
                size: size.value,
                quantity: quantity,
                price: product.price,
            });

            dispatch(
                addItem({
                    id: product._id,
                    user: user?.id,
                    color: color.value,
                    size: size.value,
                    quantity: quantity,
                    price: product.price,
                    _id: result.data._id,
                }),
            );
            if (result) history('/cart');
        }
    };

    useEffect(() => {
        if (isSuccess) notifySuccess('Thêm vào giỏ hàng thành công!');
    }, [isSuccess]);

    useEffect(() => {
        if (isError) notifyError('Thêm vào giỏ hàng thất bại!');
    }, [isError]);

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div onClick={() => setPreviewImg(product.images[0])} className="product__images__list__item">
                        <img src={product?.images[0]} alt="" />
                    </div>
                    <div onClick={() => setPreviewImg(product.images[1])} className="product__images__list__item">
                        <img src={product?.images && product?.images[1]} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product__description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product__description__title">Chi tiết sản phẩm</div>
                    <div
                        className="product__description__content"
                        dangerouslySetInnerHTML={{ __html: product?.description }}
                    />
                    <div className="product__description__toggle">
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={descriptionExpand ? <AiFillCaretUp /> : <AiFillCaretDown />}
                            onClick={() => setDescriptionExpand(!descriptionExpand)}
                        >
                            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product?.title}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">{numberWithCommas(product?.price || 0)}</span>
                </div>
                <div className="product__info__item">
                    <span className="product__info__item__title">Màu sắc</span>
                    <div className="product__info__item__list">
                        {product?.colors.map((item, index) => (
                            <div
                                className={`product__info__item__list__color ${color === item ? 'active' : ''}`}
                                key={index}
                                onClick={() => setColor(item)}
                            >
                                <div className={`circle bg-${item.key}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product__info__item">
                    <span className="product__info__item__title">Kích thước</span>
                    <div className="product__info__item__list">
                        {product?.sizes.map((item, index) => (
                            <div
                                className={`product__info__item__list__size ${size === item ? 'active' : ''}`}
                                onClick={() => setSize(item)}
                                key={index}
                            >
                                <div className={`circle bg-${item.value}`}>
                                    <span className="text">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title"> Số lượng </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <Fab color="primary" size="small" aria-label="add" variant="extended">
                                <AiOutlineMinus />
                            </Fab>
                        </div>
                        <div className="product__info__item__quantity-input">{quantity}</div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <Fab color="primary" size="small" aria-label="add" variant="extended">
                                <AiOutlinePlus />
                            </Fab>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__button">
                        <Button variant="contained" size="large" onClick={goToCart}>
                            {'mua ngay'}
                        </Button>
                        <Button variant="contained" size="large" onClick={addToCart}>
                            {'thêm vào giỏ hàng'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
