import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { addItem } from '~/redux/shopping-cart/cartItemsSlide';

import Button from './Button';
import numberWithCommas from '~/utils/numberWithCommas';
import { useHistory } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const ProductView = (props) => {
    const dispatch = useDispatch();

    const [previewImg, setPreviewImg] = useState(props.product.image01);

    const [descriptionExpand, setDescriptionExpand] = useState(false);

    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);

    const [quantity, setQuantity] = useState(1);

    const notifiColorRef = useRef(null);

    const notifiSizeRef = useRef(null);

    const history = useHistory();

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    useEffect(() => {
        setPreviewImg(props.product.image01);
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);
    }, [props.product]);

    const check = () => {
        if (color === undefined && size) {
            notifiColorRef.current.classList.add('active');
            return false;
        }
        if (size === undefined && color) {
            notifiSizeRef.current.classList.add('active');
            return false;
        }
        if (size === undefined && color === undefined) {
            notifiSizeRef.current.classList.add('active');
            notifiColorRef.current.classList.add('active');
            return false;
        } else {
            notifiSizeRef.current.classList.remove('active');
            notifiColorRef.current.classList.remove('active');
        }
        return true;
    };

    const addToCart = () => {
        if (check()) {
            dispatch(
                addItem({
                    slug: props.product.slug,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: props.product.price,
                }),
            );
        }
    };

    const goToCart = () => {
        if (check()) {
            dispatch(
                addItem({
                    slug: props.product.slug,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: props.product.price,
                }),
            );
            history.push('/cart');
        }
    };

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div onClick={() => setPreviewImg(props.product.image01)} className="product__images__list__item">
                        <img src={props.product.image01} alt="" />
                    </div>
                    <div onClick={() => setPreviewImg(props.product.image02)} className="product__images__list__item">
                        <img src={props.product.image02} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product__description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product__description__title">Chi tiết sản phẩm</div>
                    <div
                        className="product__description__content"
                        dangerouslySetInnerHTML={{ __html: props.product.description }}
                    ></div>
                    <div className="product__description__toggle">
                        <Button onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{props.product.title}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">{numberWithCommas(props.product.price)}</span>
                </div>
                <div className="product__info__item">
                    <span className="product__info__item__title">Màu sắc</span>
                    <div className="product__info__item__list">
                        {props.product.colors.map((item, index) => (
                            <div
                                className={`product__info__item__list__color ${color === item ? 'active' : ''}`}
                                key={index}
                                onClick={() => setColor(item)}
                            >
                                <div className={`circle bg-${item}`}></div>
                            </div>
                        ))}
                    </div>
                    <span ref={notifiColorRef} className="product__info__item__notifications">
                        {' '}
                        Vui lòng chọn màu sắc{' '}
                    </span>
                </div>
                <div className="product__info__item">
                    <span className="product__info__item__title">Kích thước</span>
                    <div className="product__info__item__list">
                        {props.product.size.map((item, index) => (
                            <div
                                className={`product__info__item__list__size ${size === item ? 'active' : ''}`}
                                onClick={() => setSize(item)}
                                key={index}
                            >
                                <div className={`circle bg-${item}`}>
                                    <span className="text">{item}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span ref={notifiSizeRef} className="product__info__item__notifications">
                        {' '}
                        Vui lòng chọn kích thươc{' '}
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title"> Số lượng </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('minus')}>
                            <AiOutlineMinus></AiOutlineMinus>
                        </div>
                        <div className="product__info__item__quantity-input">{quantity}</div>
                        <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('plus')}>
                            <AiOutlinePlus></AiOutlinePlus>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={goToCart}>mua ngay</Button>
                    <Button animate onClick={addToCart}>
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductView;
