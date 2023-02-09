import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { addItem } from '~/redux/slices/shopping-cart/cartItemsSlide';

import { Button, Fab } from '@mui/material';

import numberWithCommas from '~/utils/numberWithCommas';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import { notifySuccess, notifyWarning } from '../Toasts/Toast';

const ProductView = (props) => {
    const dispatch = useDispatch();

    const [previewImg, setPreviewImg] = useState(props.product.image01);

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
        setPreviewImg(props.product.image01);
        setQuantity(1);
        setColor(undefined);
        setSize(undefined);
    }, [props.product]);

    const check = () => {
        if (color === undefined) {
            notifyWarning('Vui lòng chọn màu sắc');
            return false;
        } else if (size === undefined) {
            notifyWarning('Vui lòng chọn kích thước');
            return false;
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
            notifySuccess('Thêm vào giỏ hàng thành công!');
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
            history('/cart');
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
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title"> Số lượng </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <Fab color="primary" size="small" aria-label="add" variant="extended">
                                <AiOutlineMinus></AiOutlineMinus>
                            </Fab>
                        </div>
                        <div className="product__info__item__quantity-input">{quantity}</div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <Fab color="primary" size="small" aria-label="add" variant="extended">
                                <AiOutlinePlus></AiOutlinePlus>
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

ProductView.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductView;
