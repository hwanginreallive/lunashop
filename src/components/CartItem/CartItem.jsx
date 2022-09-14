import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Button, Fab } from '@mui/material';

import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { updateItem } from '~/redux/shopping-cart/cartItemsSlide';
import { removeItem } from '~/redux/shopping-cart/cartItemsSlide';

import numberWithCommas from '~/utils/numberWithCommas';
import ViewDialog from '../ViewDialog/ViewDialog';
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { MdLocalShipping, MdTaskAlt, MdErrorOutline, MdOutlineMailOutline } from 'react-icons/md';

const CartItem = (props) => {
    const { stardust, Confirm, Shipping, Shipped, Deny } = props;

    const dispatch = useDispatch();

    const [item, setItem] = useState(props.item);
    const [quantity, setQuantity] = useState(props.item.quantity);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        setIsDialogOpen(false);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
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
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    Số tiền: {numberWithCommas(item.product.price * quantity)}
                </div>
                {stardust && <div>Danh gia {props.children}</div>}
                {props.delete && (
                    <>
                        <div className="cart__item__info__quantity">
                            <div className="product__info__item__quantity">
                                <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('-')}>
                                    <Fab color="primary" size="small" variant="extended">
                                        <AiOutlineMinus></AiOutlineMinus>
                                    </Fab>
                                </div>
                                <div className="product__info__item__quantity-input">{item.quantity}</div>
                                <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('+')}>
                                    <Fab color="primary" size="small" variant="extended">
                                        <AiOutlinePlus></AiOutlinePlus>
                                    </Fab>
                                </div>
                            </div>
                        </div>

                        <div className="cart__item__info__del" onClick={handleOpenDialog}>
                            <Button variant="contained" size="medium" startIcon={<AiFillDelete />}>
                                Xóa
                            </Button>
                        </div>
                    </>
                )}
                {Confirm && (
                    <Button
                        disableRipple
                        variant="contained"
                        size="medium"
                        color="secondary"
                        startIcon={<MdOutlineMailOutline />}
                    >
                        Liên hệ với shop
                    </Button>
                )}
                {Shipping && (
                    <Button
                        disableRipple
                        variant="contained"
                        size="medium"
                        color="primary"
                        startIcon={<MdLocalShipping />}
                    >
                        Đang vận chuyển
                    </Button>
                )}
                {Shipped && (
                    <Button disableRipple variant="contained" size="medium" color="success" startIcon={<MdTaskAlt />}>
                        Đã hoàn thành
                    </Button>
                )}
                {Deny && (
                    <Button
                        disableRipple
                        variant="contained"
                        size="medium"
                        color="error"
                        startIcon={<MdErrorOutline />}
                    >
                        Đơn hàng đã hủy
                    </Button>
                )}
            </div>
            <ViewDialog
                handleOpenDialog={handleOpenDialog}
                handleCloseDialog={handleCloseDialog}
                removeCartItem={removeCartItem}
                isDialogOpen={isDialogOpen}
            ></ViewDialog>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
};

export default CartItem;
