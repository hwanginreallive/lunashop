import { useEffect, useState } from 'react';

import { Button, Fab } from '@mui/material';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { removeItem, updateItem } from '~/redux/slices/shopping-cart/cartItemsSlide';

import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import numberWithCommas from '~/utils/numberWithCommas';
import CartDialog from '../ViewDialog/CartDialog';

import { MdErrorOutline, MdLocalShipping, MdOutlineMailOutline, MdTaskAlt } from 'react-icons/md';

import { useDeleteCartMutation } from '~/redux/api/cartApi/cartApi';

const PurchaseItem = (props) => {
    const { stardust, Confirm, Shipping, Shipped, Deny, refetch } = props;

    const [deleteCart] = useDeleteCartMutation();

    const dispatch = useDispatch();

    const [item, setItem] = useState([]);
    const [quantity, setQuantity] = useState(props.item.quantity);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect(() => {
        setItem(props.item.cart);
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

    const removeCartItem = async (id) => {
        await deleteCart({ id: id });
        dispatch(
            removeItem({
                color: item.color,
                id: item.product._id,
                size: item.size,
                quantity: item.quantity,
                price: item.product.price,
            }),
        );
        refetch();
        setIsDialogOpen(false);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return item.map((order) => (
        <div className="cart__item">
            <div className="cart__item__img">
                <Link to={`/catalog/${order?.product?.slug}`}>
                    <img src={order.product.images[0]} alt="" />
                </Link>
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <span>{order.product?.title}</span>
                    <span>{order.color}</span>
                    <span>{order.size}</span>
                    <span>Số lượng: {order.quantity}</span>
                </div>

                <div className="cart__item__info__price">
                    Số tiền: {numberWithCommas(order.product?.price * order.quantity)}
                </div>
                {stardust && <div>Danh gia {props.children}</div>}
                {props.delete && (
                    <>
                        <div className="cart__item__info__quantity">
                            <div className="product__info__item__quantity">
                                <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('-')}>
                                    <Fab color="primary" size="small" variant="extended">
                                        <AiOutlineMinus />
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
            <CartDialog
                handleOpenDialog={handleOpenDialog}
                handleCloseDialog={handleCloseDialog}
                removeCartItem={removeCartItem}
                id={item._id}
                isDialogOpen={isDialogOpen}
            />
        </div>
    ));
};

export default PurchaseItem;
