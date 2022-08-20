import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { updateItem } from '~/redux/shopping-cart/cartItemsSlide';
import { removeItem } from '~/redux/shopping-cart/cartItemsSlide';

import numberWithCommas from '~/utils/numberWithCommas';

import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const CartItem = (props) => {
    const dispatch = useDispatch();

    const [item, setItem] = useState(props.item);
    const [quantity, setQuantity] = useState(props.item.quantity);

    useEffect(() => {
        setItem(props.item);
        setQuantity(props.item.quantity);
    }, [props.item]);

    const updateQuantity = (opt) => {
        if (opt === '+') {
            dispatch(updateItem({ ...item, quantity: quantity + 1 }));
        }
        if (opt === '-') {
            dispatch(updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
        }
    };

    const removeCartItem = () => {
        dispatch(removeItem(item));
    };

    return (
        <div className="cart__item">
            <div className="cart__item__img">
                <Link to={`/catalog/${item.slug}`}>
                    <img src={item.product.image01} alt="" />
                </Link>
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>
                        <span>{item.product.title}</span>
                        <span>{item.color}</span>
                        <span>{item.size}</span>
                        <span>{numberWithCommas(item.product.price)}</span>
                    </Link>
                </div>

                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('-')}>
                            <AiOutlineMinus></AiOutlineMinus>
                        </div>
                        <div className="product__info__item__quantity-input">{item.quantity}</div>
                        <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('+')}>
                            <AiOutlinePlus></AiOutlinePlus>
                        </div>
                    </div>
                </div>
                <div className="cart__item__info__del" onClick={removeCartItem}>
                    <span>Xóa</span>
                    <i>
                        <AiOutlineDelete></AiOutlineDelete>
                    </i>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;